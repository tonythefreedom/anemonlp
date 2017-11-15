#-*- coding: utf-8 -*-

import logging
import os
from chatterbot import ChatBot

'''
This is an example showing how to train a chat bot using the
ChatterBot Corpus of conversation dialog.
'''

# Enable info level logging
logging.basicConfig(level=logging.INFO)
if os._exists("/Users/kimtony/workspace/MLbot/django_app/tests/db.sqlite3"):
    os.remove("/Users/kimtony/workspace/MLbot/django_app/tests/db.sqlite3-shm")
    os.remove("/Users/kimtony/workspace/MLbot/django_app/tests/db.sqlite3-wal")
    os.remove("/Users/kimtony/workspace/MLbot/django_app/tests/db.sqlite3")

chatbot = ChatBot(
    'Example Bot',
    trainer='chatterbot.trainers.ChatterBotCorpusTrainer'
)

# Start by training our bot with the ChatterBot corpus data
chatbot.train("/Users/kimtony/workspace/MLbot/django_app/example_app/corpus")
#chatbot.train("/usr/local/mlbot/examples/django_app/example_app/corpus")

# Now let's get a response to a greeting
response = chatbot.get_response(u"토니가 누구지?")
print unicode(response).encode("utf8")

##response = chatbot.get_response("how are you?")
##print(response)
