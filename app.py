import os

from flask import Flask, request, jsonify, render_template, redirect, url_for,send_file
from faker import Faker
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant
from werkzeug.utils import secure_filename

app = Flask(__name__)
fake = Faker()


@app.route('/')
def index():
    return render_template('index.html')

# Add your Twilio credentials
@app.route('/token')
def generate_token():
    TWILIO_ACCOUNT_SID = 'AC69612d0ab71e53c0b9690bdb981577c7'
    TWILIO_SYNC_SERVICE_SID = 'ISa73a1a4b7f650e4d8af97f41930833bb'
    TWILIO_API_KEY = 'SK83b10f576df938c2239969a12ce7f9ed'
    TWILIO_API_SECRET = 'm4kPJydNjv3C1tosOBb16IG0Fshy3zWB'

    username = request.args.get('username', fake.user_name())

    # create access token with credentials
    token = AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, identity=username)
    # create a Sync grant and add to token
    sync_grant_access = SyncGrant(TWILIO_SYNC_SERVICE_SID)
    token.add_grant(sync_grant_access)
    return jsonify(identity=username, token=token.to_jwt().decode())

# Write the code here
@app.route('/', methods=['POST'])
def download_text():
    text_recieved = request.form["text"]
    with open("workfile.txt", "w") as f:
        f.write(text_recieved)
    file = "workfile.txt"
    return send_file(file, as_attachment=True)    

    

    


if __name__ == "__main__":
    app.run(host='localhost', port='5001', debug=True)
