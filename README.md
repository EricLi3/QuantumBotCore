﻿# QuantumBotCore
We developed this backend using Firebase, Google Cloud, and JS and tested it with Postman. One endpoint is adding a message, in which you would send data in json form like this


{
    "data": {
        "text": "Hello this is a test message",
        "userId": "dsds"
    }
}


to our endpoint hosted on Google Cloud. 

if all goes right, we'll receive the status "success" along with the messageId as a form of communication and authentication. 
