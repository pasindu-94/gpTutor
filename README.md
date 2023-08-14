# [GPTutor - GPT Based Education Assistant]

 ![version](https://img.shields.io/badge/version-1.0-blue.svg) 

## Table of Contents

* [Application Demo](#demo)
* [Application Scope](#application-scope)
* [Quick Start](#quick-start)
* [OpenAI Key](#openAI-key)
* [Browser Support](#browser-support)

<br />

## Application Demo


https://github.com/pasindu-94/gpTutor/assets/62370505/d5b85fa7-e0d7-4181-92a6-119a0c3c037a





<br />

## Application Scope
The main scope of this project is leverage on advanced capabilities of AI and GPT framework to create a tool that could assist students anytime anywhere in providing information and answers to their questions based on the exact curriculum data and notes provided by the relevant authorities and educators. 


## Quick start

```bash
$ # Get the code
$ git clone https://github.com/pasindu-94/gpTutor.git
$ cd gpTutor
$
$ # Virtualenv modules installation (Unix based systems)
$ virtualenv env
$ source env/bin/activate
$
$ # Virtualenv modules installation (Windows based systems)
$ # virtualenv env
$ # .\env\Scripts\activate
$
$ pip3 install -r requirements.txt
$
$ # Set the FLASK_APP environment variable
$ (Unix/Mac) export FLASK_APP=run.py
$ (Windows) set FLASK_APP=run.py
$ (Powershell) $env:FLASK_APP = ".\run.py"
$
$ # Set up the DEBUG environment
$ # (Unix/Mac) export FLASK_ENV=development
$ # (Windows) set FLASK_ENV=development
$ # (Powershell) $env:FLASK_ENV = "development"
$
$ # Start the application (development mode)
$ # --host=0.0.0.0 - expose the app on all network interfaces (default 127.0.0.1)
$ # --port=5000    - specify the app port (default 5000)  
$ flask run --host=0.0.0.0 --port=5000
$
$ # Access the dashboard in browser: http://127.0.0.1:5000/
```

> Note: To use the app, please access the registration page and create a new user. After authentication, the app will unlock the private pages.

<br />

## OpenAI Key
To access Open AI APIs, add your *Open AI Key* to config.ini file.

<br />


## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

<br />


---
[GPTutor] - Prototype By Pasindu
