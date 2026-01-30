from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

index = Blueprint('about', __name__)


@index.route('/')
def dashboard():
    
    return render_template('about.html')
