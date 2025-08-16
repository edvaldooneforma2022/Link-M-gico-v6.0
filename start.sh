#!/usr/bin/env bash

pip install -r requirements.txt

python -m gunicorn --bind 0.0.0.0:$PORT src.main:app

