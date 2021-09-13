export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render(steps, value);
    this.elem.addEventListener("click", (event) => this.changeSpicy(event));
  }

  render(steps, value) {
    let slider = document.createElement("div");
    slider.classList.add("slider");
    slider.innerHTML = `
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
  
    <div class="slider__progress"></div>
  
    <div class="slider__steps">
           
    </div>`;
    for (let i = 0; i < steps; i++) {
      let span = document.createElement("span");
      if (i === value) {
        span.classList.add("slider__step-active");
      }
      slider.querySelector(".slider__steps").append(span);
    }
    return slider;
  }

  changeSpicy(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let steps = this.elem.querySelectorAll(".slider__steps span");
    let segments = steps.length - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector('.slider__value');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    sliderValue.textContent = value;
    for (let step of steps) {
      step.classList.remove('slider__step-active');
    }
    steps[value].classList.add('slider__step-active');

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
    );

    }
}