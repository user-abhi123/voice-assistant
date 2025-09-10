from flask import Flask, request, jsonify, render_template
from assistant_logic import process_command

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    command = data.get('command', '')
    response = process_command(command)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)