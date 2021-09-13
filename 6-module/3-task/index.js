import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.index = 0;
    this.slides = slides;
    this.elem = this.render(slides);
  }

   render(slides) {
    let slider = createElement(`
<div class="carousel">
<div class="carousel__arrow carousel__arrow_right">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</div>
<div class="carousel__arrow carousel__arrow_left" >
  <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
</div>
<div class="carousel__inner">
${this.getSlide(slides)}
  </div>
  </div>

`);

    let moveRight = slider.querySelector(".carousel__arrow_right");
    let moveLeft = slider.querySelector(".carousel__arrow_left");
    

    this.indexCounter(this.index, moveRight, moveLeft, this.slides.length);

    moveRight.addEventListener("click", () => {
      let carouselWidth = slider.querySelector(".carousel__inner").offsetWidth;
      this.index++;
      document.querySelector(
        ".carousel__inner"
      ).style.transform = `translateX(-${carouselWidth * this.index}px)`;
      this.indexCounter(this.index, moveRight, moveLeft, this.slides.length);
    });

    moveLeft.addEventListener("click", () => {
      let carouselWidth = slider.querySelector(".carousel__inner").offsetWidth;
      this.index--;
      document.querySelector(
        ".carousel__inner"
      ).style.transform = `translateX(-${carouselWidth * this.index}px)`;
      this.indexCounter(this.index, moveRight, moveLeft, this.slides.length);
    });

    let buttons = slider.querySelectorAll(".carousel__button");
    for (let btn of buttons) {
      btn.addEventListener("click", () => {
        btn.dispatchEvent(
          new CustomEvent("product-add", {
            detail: btn.closest(".carousel__slide").dataset.id,
            bubbles: true,
          })
        );
      });
    }

    return slider;
  }

  getSlide(slides) {
    return this.slides
      .map((item) => {
        return `
  <div class="carousel__slide" data-id=${item.id}>
  <img src="/assets/images/carousel/${
    item.image
  }" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${item.price.toFixed(2)}</span>
    <div class="carousel__title">${item.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
  </div>
  `;
      })
      .join("");
  }

  indexCounter(index, right, left, n) {
    if (index === 0) {
      left.style.display = "none";
    } else {
      left.style.display = "";
    }

    if (index >= n - 1) {
      right.style.display = "none";
    } else {
      right.style.display = "";
    }
  }
}
