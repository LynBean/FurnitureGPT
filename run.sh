#!/bin/bash

echo Install requirements dependencies ...
sudo apt install ffmpeg libsm6 libxext6 -y

echo Install http-server ...
npm install --global http-server

echo Install Back-end server requirements ...
pip install -r requirements.txt

echo Start server ...
python start-backend.py &
http-server -p 8085 ./src/frontend/
