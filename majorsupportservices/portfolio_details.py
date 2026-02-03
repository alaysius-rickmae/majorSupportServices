from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

portfolio_details = Blueprint('portfolio_details', __name__)

@portfolio_details.route('/portfolio-details', methods=['GET', 'POST'])
def index():
        
    return render_template('portfolio_details.html')