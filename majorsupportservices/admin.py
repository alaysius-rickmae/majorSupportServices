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
   
    username = session['user']
    fullname = session['fullname']
    user_type = session['user_type']
    userLogged = session['fullname']

    return render_template('admin.html', 
            fullname=fullname,user_type=user_type,
            userLogged=userLogged,username=username)