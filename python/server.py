from flask import Flask, request

from search import search

app = Flask(__name__)

@app.route('/search')
def route_search():
    query_param = request.args.get('q', '')  # Default to empty string if 'q' not provided
    return search(query_param)

if __name__ == '__main__':
    app.run(debug=True)
