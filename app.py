from flask import Flask, render_template, request, redirect, url_for, session
from supabase import create_client
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Change this!

# Supabase setup
supabase_url = 'https://rsficxyvgjszmhbjcglb.supabase.co'
supabase_key = 'your_supabase_key_here'
supabase = create_client(supabase_url, supabase_key)

@app.route('/')
def home():
    if 'user' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('home'))
    return render_template('home.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    # Add Supabase auth logic here
    session['user'] = email
    return redirect(url_for('dashboard'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)