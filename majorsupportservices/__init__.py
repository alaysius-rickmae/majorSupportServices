
from flask import Flask

def create_app():
    app = Flask(__name__)
    from .index import index
    from .contact import contact
    from .about import about
    from .service import service
    from .blog import blog
    from .service_details import service_details
    from .team import team
    from .team_details import team_details
    from .portfolio import portfolio
    from .portfolio_details import portfolio_details    

    app.register_blueprint(index, url_prefix='/')
    app.register_blueprint(contact, url_prefix='/')
    app.register_blueprint(about, url_prefix='/')
    app.register_blueprint(service, url_prefix='/')
    app.register_blueprint(blog, url_prefix='/')
    app.register_blueprint(service_details, url_prefix='/')
    app.register_blueprint(team, url_prefix='/')
    app.register_blueprint(team_details, url_prefix='/')
    app.register_blueprint(portfolio, url_prefix='/')
    app.register_blueprint(portfolio_details, url_prefix='/')
  
    return app