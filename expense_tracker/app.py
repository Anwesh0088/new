from flask import Flask, request, render_template, jsonify
import json
from datetime import datetime

app = Flask(__name__)

JSON_FILE = 'expenses.json'

def read_expenses():
    try:
        with open(JSON_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def write_expenses(expenses):
    with open(JSON_FILE, 'w') as f:
        json.dump(expenses, f, indent=4)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_expense():
    data = request.get_json()
    data['date'] = datetime.now().strftime('%Y-%m-%d')
    expenses = read_expenses()
    expenses.append(data)
    write_expenses(expenses)
    return jsonify({"status": "success"})

@app.route('/data')
def get_data():
    return jsonify(read_expenses())

if __name__ == '__main__':
    app.run(debug=True)
