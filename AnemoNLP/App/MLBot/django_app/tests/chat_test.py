#-*- coding: utf-8 -*-

import logging
import os
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

# Now let's get a response to a greeting
response = chatbot.get_response(u"토니가 누구지?")
print unicode(response).encode("utf8")

##response = chatbot.get_response("how are you?")
##print(response)
