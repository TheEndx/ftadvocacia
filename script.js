// Configurações
const WHATSAPP_NUMBER = '5551981077272';

// Função para abrir WhatsApp
function openWhatsApp(customMessage = '') {
    let message = customMessage;
    
    if (!message) {
        message = `Olá! Vim através do site e gostaria de saber mais sobre o BPC/LOAS.

Meus dados:
Nome: [PREENCHER]
Idade: [PREENCHER]
Benefício de interesse: [PREENCHER]

Aguardo retorno para uma consulta gratuita.`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// FAQ Toggle
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Abrir o item clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const idade = document.getElementById('idade').value;
            const beneficio = document.getElementById('beneficio').value;
            
            if (!nome || !idade || !beneficio) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            const message = `Olá! Vim através do site e gostaria de saber mais sobre benefícios previdenciários.

Meus dados:
Nome: ${nome}
Idade: ${idade}
Benefício de interesse: ${beneficio}

Aguardo retorno para uma consulta gratuita.`;
            
            openWhatsApp(message);
        });
    }
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Animações ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.bpc-card, .beneficio-card, .escolher-item, .faq-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Event listeners
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
});

// Adicionar estilos para menu mobile ativo
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Tracking de eventos (opcional)
function trackEvent(eventName, eventData = {}) {
    // Aqui você pode adicionar código para tracking com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
}

// Rastrear cliques no WhatsApp
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-whatsapp-header') || 
        e.target.closest('.whatsapp-float') || 
        e.target.closest('.btn-primary')) {
        trackEvent('whatsapp_click', {
            source: e.target.closest('.btn-whatsapp-header') ? 'header' : 
                   e.target.closest('.whatsapp-float') ? 'float' : 'form'
        });
    }
});

// Lazy loading para imagens (se necessário)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Função para copiar número do WhatsApp (funcionalidade extra)
function copyWhatsAppNumber() {
    const number = '(51) 98107-7272';
    navigator.clipboard.writeText(number).then(() => {
        alert('Número copiado para a área de transferência!');
    });
}

// Validação de formulário aprimorada
function validateForm(formData) {
    const { nome, idade, beneficio } = formData;
    
    if (nome.length < 2) {
        alert('Por favor, insira um nome válido.');
        return false;
    }
    
    if (idade < 18 || idade > 120) {
        alert('Por favor, insira uma idade válida.');
        return false;
    }
    
    if (!beneficio) {
        alert('Por favor, selecione um benefício de interesse.');
        return false;
    }
    
    return true;
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamento do WhatsApp float em mobile
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (isMobile() && whatsappFloat) {
        whatsappFloat.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        whatsappFloat.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Função para scroll suave até o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar botão "voltar ao topo" quando necessário
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (scrollTopBtn) {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }
});

