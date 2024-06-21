const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {logger} = functions;

exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received message request data: ", data);

    // Validate fields
    if (!data.text || !data.userId) {
      logger.log("Required fields (text, userId) are missing");
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields (text, userId) are missing",
      );
    }

    const {text, userId} = data;

    // Construct message data
    const messageData = {
      text,
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    const messageRef = await admin
        .firestore()
        .collection("chats")
        .doc(userId)
        .collection("messages")
        .add(messageData);

    logger.log("Message added with ID: ", messageRef.id);

    // Return Success status and message ID to terminal. As we see from POST from postman
    return {
      status: "success",
      messageId: messageRef.id,
    };
  } catch (error) {
    logger.error("Error adding message: ", error);
    // Throw error
    throw new functions.https.HttpsError(
        "internal",
        "Error adding message",
        error.message,
    );
  }
});
