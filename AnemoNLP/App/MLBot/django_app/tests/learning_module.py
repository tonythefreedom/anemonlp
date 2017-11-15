# -*- coding: utf-8 -*-

import os
import time

from chatterbot import ChatBot

#sys.path("/home/dss/lib/python2.7")

#os.remove("/home/dss/chatterbot/django_app/db.sqlite3")

#os.remove("/home/dss/chatterbot/django_app/db.sqlite3-shm")

#os.remove("/home/dss/chatterbot/django_app/db.sqlite3-wal")

chatbot = ChatBot(
    'tony bot 01',
    trainer='chatterbot.trainers.ChatterBotCorpusTrainer'

)

chatbot.train("/home/dss/chatterbot/django_app/example_app/corpus/")

#chatbot.train("/home/dss/corpus/")

#chatbot.train("/Users/siin/Desktop/learning_test")





t = time.time()
now = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(t))
#with open('/home/dss/chatterbot/django_app/log.txt', 'a+') as f:
#    f.write(now+"\n")

