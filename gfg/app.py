from flask import Flask, jsonify, request
from flask_cors import CORS
from scraper import scrape_gfg

app = Flask(__name__)
CORS(app)

@app.route("/api/gfg/<username>", methods=["GET"])
def get_gfg_data(username):
    try:
        data = scrape_gfg(username)
        return jsonify({
            "username": username,
            "data": data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
