from flask import (
    Blueprint, render_template, request, redirect, url_for, session, flash
)


# from .models import *

from datetime import timedelta
auth = Blueprint('auth', __name__)

# from .authentication import Auth
# mdl_auth = Auth()

from .models import Auth
mdl_auth = Auth()


@auth.route('/login', methods =['GET', 'POST'])
def login():
    mess = request.args.get('msg')
    if request.method == 'POST':
        input_user = request.form['username']
        input_pass = request.form['password']

        try:
            login = mdl_auth.login_user(input_user,input_pass)
            if login:
                session['loggedin'] = True
                session['user'] = input_user
                session['firstname'] = login.get('firstname')
                session['lastname'] = login.get('lastname')
                session['fullname'] = login.get('firstname') + ' ' + login.get('lastname')
                session['email_address'] = login.get('email_address')
                session['user_type'] = login.get('user_type')

                flash('You were successfully logged in')

                print(session['user_type'])
                return redirect(url_for('admin.index'))
            else:
                result = 2
                return redirect(url_for('auth.login', msg= result))
        except Exception as e:
            flash(f"An error occurred during login: {str(e)}")
            return redirect(url_for('auth.login', msg="error"))
    
        

    return render_template('login.html', msg = mess )




# @auth.before_request
# def make_session_permanent():
#     session.permanent = True
#     app.permanent_session_lifetime = timedelta(minutes=5)

@auth.route('/logout')
def logout():
    session.pop('user', None)

    # RECENT ACTIVITY QUERY
    # mdl_auth.insert_recent_act(session.get('user'), 'Logout', 'User logged out', 'Logout page')

    return redirect(url_for('auth.login'))

