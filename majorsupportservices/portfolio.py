from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

portfolio = Blueprint('portfolio', __name__)

@portfolio.route('/portfolio', methods=['GET', 'POST'])
def index():
        
    return render_template('portfolio.html')