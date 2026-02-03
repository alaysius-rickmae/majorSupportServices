from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

team = Blueprint('team', __name__)

@team.route('/team', methods=['GET', 'POST'])
def index():
        
    return render_template('team.html')