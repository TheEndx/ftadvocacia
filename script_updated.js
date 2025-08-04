// Configurações
const WHATSAPP_NUMBER = '5551981077272';

// Função para abrir WhatsApp com mensagem padrão
function openWhatsApp() {
    const message = `Olá! Vim através do site e gostaria de saber mais sobre o BPC/LOAS.

Meus dados:
Nome: [PREENCHER]
Idade: [PREENCHER]
Benefício de interesse: [PREENCHER]

Aguardo retorno para uma consulta.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(whatsappURL, '_blank');
}

// Função para enviar formulário via WhatsApp
function sendFormToWhatsApp() {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const beneficio = document.getElementById('beneficio').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !idade || !telefone || !beneficio) {
        alert('Por favor, preencha todos os campos obrigatórios (Nome, Idade, Telefone e Benefício).');
        return;
    }

    // Validação de idade
    if (isNaN(idade) || idade < 1 || idade > 120) {
        alert('Por favor, insira uma idade válida.');
        return;
    }

    // Construir mensagem personalizada
    let whatsappMessage = `Olá! Vim através do site e gostaria de saber mais sobre benefícios previdenciários.

Meus dados:
Nome: ${nome}
Idade: ${idade} anos
Telefone: ${telefone}`;

    if (email) {
        whatsappMessage += `
E-mail: ${email}`;
    }

    whatsappMessage += `
Benefício de interesse: ${beneficio}`;

    if (mensagem) {
        whatsappMessage += `

Informações adicionais:
${mensagem}`;
    }

    whatsappMessage += `

Aguardo retorno para uma consulta.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(whatsappURL, '_blank');
}

// FAQ Toggle
function toggleFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros itens
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active', !isActive);
        });
    });
}

// Navegação suave
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu Mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animações ao scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.bpc-card, .beneficio-card, .escolher-item, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Máscara para telefone
function initPhoneMask() {
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
}

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Feedback visual para formulário
function initFormFeedback() {
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e74c3c';
                } else if (this.type === 'email' && this.value && !validateEmail(this.value)) {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '#27ae60';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#d4af37';
            });
        });
    }
}

// Contador de caracteres para textarea
function initCharacterCounter() {
    const textarea = document.getElementById('mensagem');
    if (textarea) {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #666; margin-top: 5px;';
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} caracteres restantes`;
            counter.style.color = remaining < 50 ? '#e74c3c' : '#666';
        }
        
        textarea.addEventListener('input', updateCounter);
        textarea.setAttribute('maxlength', maxLength);
        updateCounter();
    }
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preloader
function initPreloader() {
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
}

// Analytics e tracking
function trackEvent(eventName, eventData = {}) {
    // Implementar tracking de eventos aqui
    console.log('Event tracked:', eventName, eventData);
    
    // Exemplo para Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    toggleFAQ();
    smoothScroll();
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    initPhoneMask();
    initFormFeedback();
    initCharacterCounter();
    initLazyLoading();
    initPreloader();
    
    // Event listeners para o formulário
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendFormToWhatsApp();
            
            // Track form submission
            trackEvent('form_submit', {
                form_name: 'contact_form',
                page_url: window.location.href
            });
        });
    }
    
    // Track WhatsApp clicks
    document.querySelectorAll('[onclick*="openWhatsApp"]').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('whatsapp_click', {
                button_location: btn.className,
                page_url: window.location.href
            });
        });
    });
    
    // Adicionar efeito de typing no hero
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Funções utilitárias
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para copiar texto
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Texto copiado!', 'success');
    }).catch(() => {
        showNotification('Erro ao copiar texto', 'error');
    });
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar botão scroll to top
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-navy);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
        }
    });
}

// Inicializar botão scroll to top após carregamento
window.addEventListener('load', addScrollToTopButton);

