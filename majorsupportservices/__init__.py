
from flask import Flask

def create_app():
    app = Flask(__name__)
    from .index import index
    from .about import about

    app.register_blueprint(index, url_prefix='/')
    app.register_blueprint(about, url_prefix='/about')
  
    return app