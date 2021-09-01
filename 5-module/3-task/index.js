function initCarousel() {
  // ваш код...
  let carouselArrow = document.querySelector(".carousel");
  let rightButton = document.querySelector(".carousel__arrow_right");
  let leftButton = document.querySelector(".carousel__arrow_left");
  let carousel = document.querySelector(".carousel__inner");
  let slideWidth = carousel.offsetWidth;
  let index = 0;

  function indexCounter(n) {
    if (n === 0) {
      leftButton.style.display = "none";
    } else {
      leftButton.style.display = "";
    }
    if (n === 3) {
      rightButton.style.display = "none";
    } else {
      rightButton.style.display = "";
    }
  }

  indexCounter(index);
  
  carouselArrow.addEventListener("click", function (event) {
    let target = event.target;
    if (target.closest(".carousel__arrow_right")) {
      index++;
      carousel.style.transform = `translateX(${-slideWidth * index}px)`;
      indexCounter(index);
    }
    if (target.closest(".carousel__arrow_left")) {
      index--;
      carousel.style.transform = `translateX(${-slideWidth * index}px)`;
      indexCounter(index);
    }
  });
}
