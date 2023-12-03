from flask import Flask, jsonify, make_response

from search import search

app = Flask(__name__)

@app.route('/search')
def route_search():
    query_param = request.args.get('q', '')  # Default to empty string if 'q' not provided
    result = search(query_param)

    response = make_response(jsonify(result))
    
    # Here we add the CORS headers manually
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all domains
    # To allow specific domains instead:
    # response.headers.add('Access-Control-Allow-Origin', 'https://example.com')
    
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

    return response

if __name__ == '__main__':
    app.run(debug=True)
