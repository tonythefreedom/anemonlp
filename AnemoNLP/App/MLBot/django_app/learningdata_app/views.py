# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
import re


def index(request):
    return render(request, 'learningdata_app/learning_index.html')


def learning_data(request):

    #데이터 받아옴
    file_name = request.POST.get('name')
    input_category = request.POST.get('category')
    input_qna = request.POST.get('QnA')

    #파일생성
    #f = open('/home/dss/chatterbot/django_app/example_app/corpus/' + file_name + '.yml', 'w+')
    f = open('/Users/siin/Desktop/learning_test/' + file_name + '.yml', 'w+')

    #카테고리 삽입
    f.write('categories:\n')
    category = re.sub('[,]', ' ', input_category)
    category = category.encode('cp949')
    category = str(category.decode('cp949').encode('utf-8'))
    f.write(category)

    #질문, 답 삽입
    f.write('\nconversations:\n')
    qna = re.sub('[,]', ' ', input_qna)
    qna = qna.encode('cp949')
    qna = str(qna.decode('cp949').encode('utf-8'))
    f.write(qna)

    f.close()

    return render(request, 'learningdata_app/learning_result.html')