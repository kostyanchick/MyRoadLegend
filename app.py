from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/about')
def about_page():
    return render_template('about.html')

@app.route('/registration')
def registration_page():
    return render_template('registration.html')

@app.route('/carousel')
def carousel_page():
    return render_template('slider.html')


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
