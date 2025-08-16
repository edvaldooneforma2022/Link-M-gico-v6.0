// Configurações globais
const CONFIG = {
    API_BASE: '/api/chatbot',
    SESSION_STORAGE_KEY: 'linkmagico_session_id',


// Elementos DOM
const elements = {
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    chatMessages: document.getElementById('chatMessages'),
    typingIndicator: document.getElementById('typingIndicator'),
    urlInput: document.getElementById('urlInput'),
    extractBtn: document.getElementById('extractBtn'),
    extractionStatus: document.getElementById('extractionStatus'),
    newSessionBtn: document.getElementById("newSessionBtn"),
    customInstructions: document.getElementById("customInstructions"),
    activateChatbotBtn: document.getElementById("activateChatbotBtn")


};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();

});

function initializeApp() {
    // Salva session ID
    localStorage.setItem(CONFIG.SESSION_STORAGE_KEY, currentSessionId);
    
    // Detecta se é dispositivo móvel
    window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log('LinkMágico Chatbot IA v6.0 inicializado');
    console.log('Session ID:', currentSessionId);
    console.log('Dispositivo móvel:', window.isMobile);
}

function setupEventListeners() {
    // Chat
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Controles do chat
    elements.clearChatBtn.addEventListener('click', clearChat);
    elements.newSessionBtn.addEventListener("click", startNewSession);
    
    // Ativar Chatbot Inteligente
    elements.activateChatbotBtn.addEventListener("click", activateChatbot);
    
    // Extração de URL
    elements.extractBtn.addEventListener('click', extractUrl);
    elements.urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            extractUrl();
        }
    });
    

}

// Funções de Chat
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    if (!message || isTyping) return;
    
    // Adiciona mensagem do usuário
    addMessage(message, 'user');
    elements.messageInput.value = '';
    
    // Mostra indicador de digitação
    showTyping();
    
    try {
        const response = await fetch(`${CONFIG.API_BASE}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                session_id: currentSessionId,
                url: elements.urlInput.value.trim() || null
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Atualiza session ID se necessário
            if (data.session_id) {
                currentSessionId = data.session_id;
                localStorage.setItem(CONFIG.SESSION_STORAGE_KEY, currentSessionId);
            }
            
            // Adiciona resposta do bot
            setTimeout(() => {
                hideTyping();
                addMessage(data.response, 'bot');
                
                // Mostra indicador se há contexto web
                if (data.has_web_context) {
                    showStatus('Resposta baseada em dados extraídos da web', 'info');
                }
            }, 1000 + Math.random() * 2000); // Simula tempo de digitação
            
        } else {
            hideTyping();
            addMessage(data.response || 'Desculpe, ocorreu um erro. Pode tentar novamente?', 'bot');
            console.error('Erro na API:', data.error);
        }
        
    } catch (error) {
        hideTyping();
        addMessage('Desculpe, não consegui processar sua mensagem. Verifique sua conexão e tente novamente.', 'bot');
        console.error('Erro na requisição:', error);
    }
}

function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Processa o conteúdo para suportar HTML básico
    const processedContent = content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    messageContent.innerHTML = processedContent;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    
    elements.chatMessages.appendChild(messageDiv);
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function showTyping() {
    isTyping = true;
    elements.typingIndicator.style.display = 'flex';
    elements.sendBtn.disabled = true;
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function hideTyping() {
    isTyping = false;
    elements.typingIndicator.style.display = 'none';
    elements.sendBtn.disabled = false;
}

function clearChat() {
    // Remove todas as mensagens exceto a primeira (mensagem de boas-vindas)
    const messages = elements.chatMessages.querySelectorAll('.message');
    for (let i = 1; i < messages.length; i++) {
        messages[i].remove();
    }
    
    showStatus('Chat limpo com sucesso', 'success');
}

function startNewSession() {
    currentSessionId = generateSessionId();
    localStorage.setItem(CONFIG.SESSION_STORAGE_KEY, currentSessionId);
    clearChat();
    showStatus('Nova sessão iniciada', 'success');
}

// Funções de Extração de URL
async function extractUrl() {
    const url = elements.urlInput.value.trim();
    if (!url) {
        showStatus('Por favor, insira uma URL válida', 'error');
        return;
    }
    
    if (!isValidUrl(url)) {
        showStatus('URL inválida. Certifique-se de incluir http:// ou https://', 'error');
        return;
    }
    
    elements.extractBtn.disabled = true;
    elements.extractBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Extraindo...';
    showStatus('Extraindo dados da página...', 'info');
    
    try {
        const response = await fetch(`${CONFIG.API_BASE}/extract-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                method: 'auto',
                force_refresh: false
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const extractedData = data.data;
            const cached = data.cached ? ' (cache)' : '';
            
            showStatus(`Dados extraídos com sucesso${cached}! Método: ${extractedData.method}`, 'success');
            
            // Mostra informações básicas
            if (extractedData.data && extractedData.data.title) {
                showStatus(`Página: ${extractedData.data.title}`, 'info');
            }
            
        } else {
            showStatus(`Erro na extração: ${data.error}`, 'error');
        }
        
    } catch (error) {
        showStatus('Erro na extração. Verifique a URL e tente novamente.', 'error');
        console.error('Erro na extração:', error);
    } finally {
        elements.extractBtn.disabled = false;
        elements.extractBtn.innerHTML = '<i class="fas fa-download"></i> Extrair';
    }
}





// Funções Utilitárias
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function showStatus(message, type) {
    // Remove status anterior
    const existingStatus = elements.extractionStatus.querySelector('.status-message');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-message ${type}`;
    statusDiv.textContent = message;
    
    elements.extractionStatus.appendChild(statusDiv);
    
    // Remove após 5 segundos
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.remove();
        }
    }, 5000);
}

// Detecção de dispositivo móvel aprimorada
function detectMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
        'android', 'webos', 'iphone', 'ipad', 'ipod', 
        'blackberry', 'iemobile', 'opera mini', 'mobile'
    ];
    
    return mobileKeywords.some(keyword => userAgent.includes(keyword)) ||
           (window.innerWidth <= 768) ||
           ('ontouchstart' in window);
}

// Atualiza detecção de mobile
window.isMobile = detectMobileDevice();



// Salva estado antes de sair da página
window.addEventListener('beforeunload', function() {
    localStorage.setItem(CONFIG.SESSION_STORAGE_KEY, currentSessionId);

});

// Log de inicialização
console.log('🚀 LinkMágico Chatbot IA v6.0 - Nova Geração');
console.log('✅ Sistema de IA conversacional ativo');
console.log('✅ Extração universal de dados web ativa');
console.log('✅ Deep linking multiplataforma ativo');
console.log('✅ Interface responsiva ativa');



async function activateChatbot() {
    const instructions = elements.customInstructions.value.trim();
    if (!instructions) {
        showStatus('Por favor, insira as instruções personalizadas.', 'error');
        return;
    }

    showStatus('Ativando Chatbot Inteligente...', 'info');
    elements.activateChatbotBtn.disabled = true;
    elements.activateChatbotBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ativando...';

    try {
        const response = await fetch(`${CONFIG.API_BASE}/activate-chatbot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                instructions: instructions,
                session_id: currentSessionId
            })
        });

        const data = await response.json();

        if (data.success) {
            showStatus('Chatbot ativado com sucesso!', 'success');
            addMessage('Olá! Chatbot ativado com suas instruções personalizadas. Como posso ajudar?', 'bot');
        } else {
            showStatus(`Erro ao ativar chatbot: ${data.error}`, 'error');
        }
    } catch (error) {
        showStatus('Erro na requisição de ativação do chatbot. Tente novamente.', 'error');
        console.error('Erro na requisição de ativação:', error);
    } finally {
        elements.activateChatbotBtn.disabled = false;
        elements.activateChatbotBtn.innerHTML = '<i class="fas fa-rocket"></i> Ativar Chatbot Inteligente';
    }
}


