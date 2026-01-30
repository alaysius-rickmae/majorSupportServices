from datetime import timedelta
from flask import Flask, render_template
import os
import secrets

from requests import Session
from majorsupportservices import create_app

# Create Flask app first
app = create_app()

# ---------------------------------------------------
# Permissions-Policy (Correct Syntax + Correct Indent)
# ---------------------------------------------------
@app.after_request
def set_permissions_policy(response):
    response.headers['Permissions-Policy'] = (
        "accelerometer=(), "
        "camera=(), "
        "microphone=(), "
        "autoplay=(), "
        "geolocation=()"
    )
    return response

# ---------------------------------------------------
# Configuration
# ---------------------------------------------------
app.config['SECRET_KEY'] = 'e9b02920e96a0cc83c122f3ee01db6e019b76aa80457bad2'
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = "/var/www/html/ADDReSS/session"
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=16)



# ---------------------------------------------------
# Custom Jinja filter
# ---------------------------------------------------
def to_pascal_case(s):
    return ''.join(word.capitalize() for word in s.split('_'))

app.jinja_env.filters['pascal_case'] = to_pascal_case



# Main entry point
if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1")
    # app.run(debug=True, host="10.18.10.5")
    # app.run(debug=True, host="address.fnri.dost.gov.ph")
    # app.run(debug=True, host="10.16.10.146")
    # app.run(debug=True, host="10.16.11.65")
    # app.run(debug=True, host="192.168.100.1")
    # app.run(debug=True, host="192.168.100.113") 
    

