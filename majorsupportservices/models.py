import csv
from decimal import Decimal
import mysql.connector
import math
import random
import pymysql
import hashlib
from fractions import Fraction
from werkzeug.security import check_password_hash, generate_password_hash
import requests
from flask import jsonify, session
from functools import wraps
from django.urls import reverse
import os
from datetime import date, datetime
import json

import numpy as np

import itertools
from scipy.optimize import minimize, linprog, milp
from scipy.optimize import LinearConstraint
import pandas as pd
from gekko import GEKKO
import pickle
from itertools import zip_longest


# Define reusable variables
api_key = 'justin123'
username = 'admin'

password = '1234'


# from flask import session
db = pymysql.connect(
    host="127.0.0.1",
    user="root",
    password="",
    database="majorsupportservices",
    port=3306,
    connect_timeout=60,  # Increase the timeout
    read_timeout=30,     # Increase read timeout
    write_timeout=30
)
mycursor = db.cursor(pymysql.cursors.DictCursor)


class Auth:

    def make_hashes(self, password):
        return hashlib.md5(str.encode(password)).hexdigest()
        # return hashlib.sha256(str.encode(password)).hexdigest()

    def login_user(self, username,password):
        password = self.make_hashes(password)
        # Login using menu eval acc
        sql_log = "SELECT * from ict_users where username = %s and password = %s"
        val = (username, password)
        mycursor.execute(sql_log, val)

        menu_eval_result = mycursor.fetchone()

        print(menu_eval_result, 'test')

        if menu_eval_result:
            menu_eval_result['user_type'] = menu_eval_result.get('role_permission')
            data = menu_eval_result 
        else:
            print('failed')

        return data