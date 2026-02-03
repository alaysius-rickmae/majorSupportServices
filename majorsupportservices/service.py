from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

service = Blueprint('service', __name__)

@service.route('/service', methods=['GET', 'POST'])
def index():
        
    return render_template('service.html')