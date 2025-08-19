#!/usr/bin/env bash
set -o errexit  # Para se der erro, parar imediatamente

# Atualiza o pip
pip install --upgrade pip

# Instala as dependências do requirements_render.txt
pip install -r requirements_render.txt

# Instala somente o Chromium (evita erro de permissão no Render)
python -m playwright install chromium
