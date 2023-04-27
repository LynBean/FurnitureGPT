@echo off

REM Install Back-end server requirements ...
pip install -r requirements.txt

REM Install http-server ...
npm install --global http-server

REM Start back-end server ...
start cmd /k python start-backend.py
timeout 5

REM Start front-end server ...
http-server -p 8085 ./src/frontend/
