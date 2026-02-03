from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

service_details = Blueprint('service_details', __name__)

@service_details.route('/service_details', methods=['GET', 'POST'])
def index():
        
    return render_template('service_details.html')