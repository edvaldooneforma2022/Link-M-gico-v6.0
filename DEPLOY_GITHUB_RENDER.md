# Guia Completo de Deploy - LinkMágico Chatbot v6.0.1
## GitHub + Render.com

Este guia fornece instruções passo a passo para fazer o deploy do LinkMágico Chatbot v6.0.1 no GitHub e posteriormente no Render.com.

---

## 📋 Pré-requisitos

- Conta no GitHub (https://github.com)
- Conta no Render.com (https://render.com)
- Git instalado no seu computador
- Arquivo `linkmagico_chatbot_v6_final.zip` descompactado

---

## 🚀 Parte 1: Subindo o Projeto para o GitHub

### Passo 1: Preparar o Projeto Localmente

1. **Descompacte o arquivo:**
   ```bash
   unzip linkmagico_chatbot_v6_final.zip
   cd linkmagico_chatbot_v6_completo/linkmagico_chatbot_v6
   ```

2. **Verifique a estrutura do projeto:**
   ```
   linkmagico_chatbot_v6/
   ├── src/
   │   ├── database/
   │   ├── models/
   │   ├── routes/
   │   ├── services/
   │   ├── static/
   │   └── main.py
   ├── requirements.txt
   ├── README.md
   └── DEPLOY_GITHUB_RENDER.md
   ```

### Passo 2: Criar Repositório no GitHub

1. **Acesse o GitHub:**
   - Vá para https://github.com
   - Faça login na sua conta

2. **Criar novo repositório:**
   - Clique no botão "+" no canto superior direito
   - Selecione "New repository"
   - Nome do repositório: `linkmagico-chatbot-v6`
   - Descrição: `LinkMágico Chatbot v6.0.1 - IA Conversacional para Vendas Online`
   - Marque como "Public" ou "Private" (sua escolha)
   - **NÃO** marque "Add a README file" (já temos um)
   - Clique em "Create repository"

### Passo 3: Configurar Git Local

1. **Inicializar repositório Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - LinkMágico Chatbot v6.0.1"
   ```

2. **Conectar com o GitHub:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/linkmagico-chatbot-v6.git
   git push -u origin main
   ```

   **Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub**

### Passo 4: Verificar Upload

1. Acesse seu repositório no GitHub
2. Verifique se todos os arquivos foram enviados corretamente
3. Confirme que a estrutura está completa

---

## 🌐 Parte 2: Deploy no Render.com

### Passo 1: Preparar Arquivos para Render

1. **Criar arquivo `render.yaml` (opcional, mas recomendado):**
   
   Crie um arquivo chamado `render.yaml` na raiz do projeto:
   ```yaml
   services:
     - type: web
       name: linkmagico-chatbot
       env: python
       buildCommand: pip install -r requirements.txt
       startCommand: python src/main.py
       envVars:
         - key: PYTHON_VERSION
           value: 3.11.0
         - key: FLASK_ENV
           value: production
   ```

2. **Atualizar o arquivo `src/main.py` para Render:**
   
   Adicione estas linhas no final do arquivo `src/main.py`:
   ```python
   if __name__ == '__main__':
       import os
       port = int(os.environ.get('PORT', 5000))
       app.run(host='0.0.0.0', port=port, debug=False)
   ```

3. **Fazer commit das alterações:**
   ```bash
   git add .
   git commit -m "Add Render.com configuration"
   git push origin main
   ```

### Passo 2: Criar Conta no Render

1. **Acesse o Render.com:**
   - Vá para https://render.com
   - Clique em "Get Started for Free"
   - Faça login com sua conta do GitHub

2. **Conectar com GitHub:**
   - Autorize o Render a acessar seus repositórios
   - Selecione o repositório `linkmagico-chatbot-v6`

### Passo 3: Configurar o Web Service

1. **Criar novo Web Service:**
   - No dashboard do Render, clique em "New +"
   - Selecione "Web Service"
   - Conecte seu repositório GitHub `linkmagico-chatbot-v6`

2. **Configurações do Service:**
   ```
   Name: linkmagico-chatbot-v6
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python src/main.py
   ```

3. **Configurações Avançadas:**
   ```
   Instance Type: Free (para teste) ou Starter (para produção)
   Auto-Deploy: Yes (recomendado)
   ```

### Passo 4: Variáveis de Ambiente (se necessário)

1. **Adicionar Environment Variables:**
   - Na seção "Environment", adicione:
   ```
   FLASK_ENV=production
   PYTHON_VERSION=3.11.0
   ```

2. **Se usar APIs externas (OpenAI, etc.):**
   ```
   OPENAI_API_KEY=sua_chave_aqui
   OPENAI_API_BASE=https://api.openai.com/v1
   ```

### Passo 5: Deploy

1. **Iniciar Deploy:**
   - Clique em "Create Web Service"
   - O Render começará automaticamente o processo de build e deploy

2. **Monitorar o Deploy:**
   - Acompanhe os logs na aba "Logs"
   - O processo pode levar 5-10 minutos

3. **Verificar Status:**
   - Quando concluído, o status mudará para "Live"
   - Você receberá uma URL pública (ex: `https://linkmagico-chatbot-v6.onrender.com`)

---

## ✅ Parte 3: Verificação e Testes

### Passo 1: Testar a Aplicação

1. **Acesse a URL fornecida pelo Render**
2. **Teste as funcionalidades:**
   - Extração de dados web
   - Chat com o assistente virtual
   - Interface responsiva

### Passo 2: Configurar Domínio Personalizado (Opcional)

1. **No Render Dashboard:**
   - Vá para "Settings" > "Custom Domains"
   - Adicione seu domínio personalizado
   - Configure os registros DNS conforme instruído

---

## 🔧 Parte 4: Manutenção e Atualizações

### Atualizações Automáticas

O Render está configurado para fazer deploy automático sempre que você fizer push para o branch `main` do GitHub.

### Para fazer atualizações:

1. **Faça as alterações localmente**
2. **Commit e push:**
   ```bash
   git add .
   git commit -m "Descrição da atualização"
   git push origin main
   ```
3. **O Render fará o deploy automaticamente**

### Monitoramento

1. **Logs em tempo real:**
   - Acesse o dashboard do Render
   - Vá para a aba "Logs" para ver logs em tempo real

2. **Métricas:**
   - Monitore CPU, memória e tráfego na aba "Metrics"

---

## 🚨 Solução de Problemas

### Problemas Comuns:

1. **Build falha:**
   - Verifique se o `requirements.txt` está correto
   - Confirme que todas as dependências são compatíveis

2. **Aplicação não inicia:**
   - Verifique se o comando de start está correto
   - Confirme que a porta está configurada corretamente

3. **Erro 503:**
   - Verifique os logs para identificar o problema
   - Confirme que a aplicação está rodando na porta correta

### Comandos de Debug:

```bash
# Testar localmente antes do deploy
python src/main.py

# Verificar dependências
pip install -r requirements.txt

# Verificar estrutura do projeto
ls -la src/
```

---

## 📞 Suporte

### URLs Importantes:
- **Repositório GitHub:** `https://github.com/SEU_USUARIO/linkmagico-chatbot-v6`
- **Aplicação Live:** `https://linkmagico-chatbot-v6.onrender.com`
- **Dashboard Render:** `https://dashboard.render.com`

### Documentação:
- [Render.com Docs](https://render.com/docs)
- [GitHub Docs](https://docs.github.com)

---

## 🎉 Conclusão

Parabéns! Seu LinkMágico Chatbot v6.0.1 está agora:
- ✅ Versionado no GitHub
- ✅ Deployado no Render.com
- ✅ Acessível publicamente
- ✅ Configurado para atualizações automáticas

Sua aplicação está pronta para uso em produção!

---

**Nota:** Este guia assume que você está usando o plano gratuito do Render. Para aplicações em produção com maior tráfego, considere upgradar para um plano pago para melhor performance e recursos adicionais.

