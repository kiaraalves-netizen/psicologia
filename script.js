document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Menu Responsivo (Mobile)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('active');
    });

    // Fecha o menu automaticamente ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Animação das Barras de Gráfico ao Rolar a Página
  const marketSection = document.getElementById('mercado');
  const barFills = document.querySelectorAll('.bar-fill');

  if (marketSection && barFills.length > 0) {
    const animateBars = () => {
      barFills.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
          bar.style.width = targetWidth;
        }
      });
    };

    // Usa IntersectionObserver para disparar a animação apenas quando os gráficos ficarem visíveis
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateBars();
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(marketSection);
    } else {
      // Fallback para navegadores muito antigos
      animateBars();
    }
  }
});
