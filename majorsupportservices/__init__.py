
from flask import Flask

def create_app():
    app = Flask(__name__)
    from .index import index

    app.register_blueprint(index, url_prefix='/')
  
    return app