## Guia de Deploy do LinkMágico Chatbot v6.0.1

Este guia detalha os passos para fazer o deploy do LinkMágico Chatbot v6.0.1, que integra o layout da versão 5.0.1 com as funcionalidades avançadas da versão 6.0.1.

### Pré-requisitos

*   Python 3.11 ou superior
*   pip (gerenciador de pacotes do Python)
*   git (opcional, para controle de versão)

### Passos para o Deploy

1.  **Clone ou descompacte o projeto:**

    Se você clonou o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd linkmagico_chatbot_v6
    ```
    Se você descompactou o arquivo `linkmagico_chatbot_v6_final.zip`:
    ```bash
    unzip linkmagico_chatbot_v6_final.zip
    cd linkmagico_chatbot_v6_completo/linkmagico_chatbot_v6
    ```

2.  **Instale as dependências:**

    Navegue até o diretório raiz do projeto (`linkmagico_chatbot_v6`) e instale as bibliotecas Python necessárias:
    ```bash
    pip install -r requirements.txt
    ```
    Caso o arquivo `requirements.txt` não exista, você pode instalar as dependências manualmente:
    ```bash
    pip install Flask Flask-CORS Flask-SQLAlchemy openai cloudscraper selenium
    ```

3.  **Configuração do Ambiente (Opcional):**

    Se você precisar de configurações específicas (por exemplo, chaves de API para serviços de IA), edite o arquivo `src/services/ai_engine.py` ou adicione variáveis de ambiente conforme necessário.

4.  **Execute o aplicativo Flask:**

    Para iniciar o servidor Flask, execute o seguinte comando no diretório raiz do projeto:
    ```bash
    python3.11 src/main.py
    ```
    O servidor será iniciado na porta 5000 por padrão (`http://0.0.0.0:5000`).

5.  **Acesse o Chatbot:**

    Abra seu navegador e acesse a URL onde o servidor está rodando (por exemplo, `http://localhost:5000`).

### Estrutura do Projeto

```
linkmagico_chatbot_v6/
├── src/
│   ├── database/
│   │   └── app.db
│   ├── models/
│   │   ├── chatbot.py
│   │   └── user.py
│   ├── routes/
│   │   ├── chatbot.py
│   │   └── user.py
│   ├── services/
│   │   ├── ai_engine.py
│   │   └── web_extractor.py
│   ├── static/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── styles.css
│   └── main.py
├── DEPLOYMENT_GUIDE.md
├── flask_server.log
└── README.md
```

### Observações

*   O banco de dados SQLite (`app.db`) será criado automaticamente na primeira execução, se não existir.
*   Para deploy em produção, é altamente recomendável usar um servidor WSGI como Gunicorn ou uWSGI e um servidor web como Nginx ou Apache.
*   Certifique-se de que as variáveis de ambiente para chaves de API (se aplicável) estejam configuradas corretamente no ambiente de produção.


