# -*- coding: utf-8 -*-

import os
import time

from chatterbot import ChatBot
chatbot = ChatBot(
            'tony bot 01',
            logic_adapters=[
                {
                    'import_path': 'chatterbot.logic.BestMatch'
                },
                {
                    'import_path': 'chatterbot.logic.LowConfidenceAdapter',
                    'threshold': 0.33,
                    'default_response': u'그 질문에 대해서는 내가 대답해 줄 수 있는 게 없어. || 해당 질문에 대답하기를 원한다면 다음 링크를 통해서 너의 의견을 제안해 주면 고맙겠어. || <a href="http://35.189.163.55:8080/anemo/trainingUI/chatterbot_UI.html">임시 학습 페이지 링크</a>'
                }
            ],
            trainer='chatterbot.trainers.ChatterBotCorpusTrainer'
        )

# Start by training our bot with the ChatterBot corpus data
chatbot.train("/Users/kimtony/workspace/MLbot/django_app/example_app/corpus")

t = time.time()
now = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime(t))
#with open('/home/dss/chatterbot/django_app/log.txt', 'a+') as f:
#    f.write(now+"\n")

