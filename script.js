/* ============================================
   CV PROFESIONAL - FUNCIONALIDADES
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // NAVEGACIÓN MÓVIL
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del botón hamburguesa
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ============================================
    // NAVEGACIÓN SUAVE
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Altura del navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // NAVBAR CON SCROLL
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Agregar sombra al navbar al hacer scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Ocultar/mostrar navbar al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // TABS DE HABILIDADES
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remover clase active de todos los botones y paneles
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar el panel correspondiente
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
    // ============================================
    // ANIMACIÓN DE BARRAS DE PROGRESO
    // ============================================
    const skillBars = document.querySelectorAll('.skill-progress, .language-progress');
    
    const animateProgressBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    // Animar al cargar la página
    setTimeout(animateProgressBars, 500);
    
    // Animar al hacer scroll
    let progressAnimated = false;
    window.addEventListener('scroll', () => {
        if (!progressAnimated) {
            animateProgressBars();
            progressAnimated = true;
        }
    });
    
    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando fetch() para enviar a un servidor
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Te contactaré pronto.');
            
            // Limpiar formulario
            this.reset();
        });
    }
    
    // ============================================
    // ANIMACIÓN DE ENTRADA (SCROLL REVEAL)
    // ============================================
    const revealElements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .cert-card');
    
    const revealOnScroll = () => {
        revealElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.85;
            
            if (isVisible) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Configurar elementos para animación
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar al cargar y al hacer scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // ============================================
    // RESALTAR SECCIÓN ACTIVA EN NAVBAR
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    const highlightActiveSection = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // ============================================
    // BOTÓN DESCARGAR CV
    // ============================================
    const downloadBtn = document.querySelector('a[href="#"].btn-primary');
    
    if (downloadBtn && downloadBtn.textContent.includes('Descargar CV')) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para descargar el CV
            // Por ejemplo:
            // window.open('ruta-a-tu-cv.pdf', '_blank');
            
            alert('Funcionalidad de descarga: Agrega tu archivo PDF y actualiza el enlace.');
        });
    }
    
    // ============================================
    // EFECTO TYPING EN HERO (OPCIONAL)
    // ============================================
    // Descomenta este código si quieres un efecto de typing en el título
    /*
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    */
    
    // ============================================
    // MODO OSCURO (OPCIONAL)
    // ============================================
    // Descomenta este código si quieres agregar modo oscuro
    /*
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--color-primary);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    */
    
    console.log('✅ CV Profesional cargado correctamente');
});

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('¡Copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

/**
 * Formatea una fecha
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Calcula años de experiencia
 * @param {number} startYear - Año de inicio
 * @returns {number} Años de experiencia
 */
function calculateExperience(startYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
}
