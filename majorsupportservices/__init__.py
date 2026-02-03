
from flask import Flask

def create_app():
    app = Flask(__name__)
    from .index import index
    from .contact import contact

    app.register_blueprint(index, url_prefix='/')
    app.register_blueprint(contact, url_prefix='/')
  
    return app