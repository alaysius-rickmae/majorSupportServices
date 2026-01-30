from datetime import date, timedelta
from flask import Blueprint, json, render_template, request, session, jsonify, redirect, url_for

contact = Blueprint('contact', __name__)

@contact.route('/contact', methods=['GET', 'POST'])
def index():

    return render_template('contact.html')