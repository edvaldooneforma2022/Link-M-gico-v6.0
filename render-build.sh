#!/usr/bin/env bash
set -o errexit  # Para se der erro, parar imediatamente

pip install --upgrade pip
pip install -r requirements_render.txt

# Instala somente o Chromium para evitar erro de permissão no Render
python -m playwright install --with-deps chromium
