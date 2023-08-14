# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from apps.home import blueprint
from flask import render_template, request, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound

from openAIbot import generateResponse


@blueprint.route('/index')
@login_required
def index():
    generateResponse('What is Mahawamsa')

    return render_template('home/index.html', segment='index')

@blueprint.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_input']
    print("USER INPUT from routespy:", user_input)

    response = generateResponse(user_input)
    print(response)
    return jsonify(response=response)

@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith('.html'):
            template += '.html'

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
