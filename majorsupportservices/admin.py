from flask import jsonify, Flask, Blueprint, render_template, session, url_for, redirect, request
from datetime import date
import requests
import os
import math

import pandas as pd
import pickle
import numpy as np

admin = Blueprint('admin', __name__)

@admin.route('/admin', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get the form data
        name = request.form['name']
        # Add your processing logic here
        print(name)

    return render_template('admin.html')