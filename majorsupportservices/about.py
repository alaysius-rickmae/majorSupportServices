from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

about = Blueprint('about', __name__)

@about.route('/about', methods=['GET', 'POST'])
def index():
        
    return render_template('about.html')