let slideIndex = 0;

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  
  // Remove classe active de todas
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  // Avança índice
  slideIndex = (slideIndex + 1) > slides.length ? 1 : slideIndex + 1;

  // Adiciona classe active
  slides[slideIndex - 1].classList.add("active");

  // Próxima imagem após 5s
  setTimeout(showSlides, 5000);
}

document.addEventListener("DOMContentLoaded", showSlides);
