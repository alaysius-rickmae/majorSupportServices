from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

team_details = Blueprint('team_details', __name__)

@team_details.route('/team-details', methods=['GET', 'POST'])
def index():
        
    return render_template('team_details.html')