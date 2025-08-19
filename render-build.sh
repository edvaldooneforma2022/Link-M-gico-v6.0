#!/usr/bin/env bash
set -o errexit  # Para se der erro, parar imediatamente

pip install --upgrade pip
pip install -r requirements_render.txt

# Instala navegadores do Playwright
playwright install --with-deps