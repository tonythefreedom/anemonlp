#-*- coding: utf-8 -*-

from chatterbot import ChatBot
import logging


'''
This is an example showing how to train a chat bot using the
ChatterBot Corpus of conversation dialog.
'''

# Enable info level logging
logging.basicConfig(level=logging.INFO)

chatbot = ChatBot(
    'Example Bot',
    trainer='chatterbot.trainers.ChatterBotCorpusTrainer'
)

# Start by training our bot with the ChatterBot corpus data
chatbot.train("/Users/kimtony/Desktop/corpus/")

# Now let's get a response to a greeting
response = chatbot.get_response(u"그와 오랫동안 무슨일을 했데?")
print unicode(response).encode("utf8")

##response = chatbot.get_response("how are you?")
##print(response)
