document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.createElement('button');
  const prevBtn = document.createElement('button');
  const indicatorsContainer = document.createElement('div');
  let currentIndex = 0;
  let intervalId = null;
  const intervalTime = 5000; // 5 segundos

  // Setup botões de navegação
  nextBtn.className = 'slide-btn next-btn';
  nextBtn.textContent = '›';
  prevBtn.className = 'slide-btn prev-btn';
  prevBtn.textContent = '‹';

  // Setup container dos indicadores (bullets)
  indicatorsContainer.className = 'slide-indicators';

  // Adiciona botões e indicadores no container principal do slideshow
  const slideshow = document.querySelector('.slideshow-container');
  //slideshow.appendChild(prevBtn);
 // slideshow.appendChild(nextBtn);
  slideshow.appendChild(indicatorsContainer);

  // Cria indicadores de acordo com o número de slides
  slides.forEach((_, idx) => {
    const indicator = document.createElement('button');
    indicator.className = 'indicator';
    indicator.setAttribute('aria-label', `Slide ${idx + 1}`);
    indicator.addEventListener('click', () => goToSlide(idx));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = indicatorsContainer.querySelectorAll('.indicator');

  // Função para mostrar slide atual e atualizar indicadores
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  // Função para ir para um slide específico
  function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
    resetInterval();
  }

  // Próximo slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  // Resetar intervalo automático
  function resetInterval() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextSlide, intervalTime);
  }

  // Eventos dos botões
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  // Pausar o slideshow ao passar o mouse e retomar ao sair
  slideshow.addEventListener('mouseenter', () => clearInterval(intervalId));
  slideshow.addEventListener('mouseleave', () => resetInterval());

  // Inicializa o slideshow
  showSlide(currentIndex);
  resetInterval();
});

// Animação ao rolar a página (efeito fade-up)
const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3
});

faders.forEach(el => observer.observe(el));

