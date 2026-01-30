from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

index = Blueprint('index', __name__)


@index.route('/')
def dashboard():
    
    return render_template('index.html')



        



@index.errorhandler(404)
def invalid_route(e):

    return render_template('404.html')