#!/usr/bin/env bash
set -x

# Instalar dependências Python
pip install -r requirements_render.txt

# Instalar apenas os binários do Playwright (sem sudo)
python -m playwright install chromium
