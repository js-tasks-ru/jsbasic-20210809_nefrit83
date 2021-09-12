export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render(steps, value);
    this.value = value;
    this.elem.addEventListener("click", (event) =>
      this.changeSpicyOnClick(event)
    );
    this.dragAndDrop();
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

  changeSpicyOnClick(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let steps = this.elem.querySelectorAll(".slider__steps span");
    let segments = steps.length - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector(".slider__value");

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    sliderValue.textContent = value;
    for (let step of steps) {
      step.classList.remove("slider__step-active");
    }
    steps[value].classList.add("slider__step-active");

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true, // событие всплывает - это понадобится в дальнейшем
      })
    );
  }

  activeStep(elements) {
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].classList.contains('slider__step-active')) {
        elements[i].classList.remove('slider__step-active');
      }
      if (i === this.value) {
        elements[i].classList.add('slider__step-active');
      }
    }
  }

  dragAndDrop() {
    
    this.elem.addEventListener("pointerdown", (event) => {
      let elements = this.elem.querySelectorAll(".slider__steps span");
      let thumb = this.elem.querySelector(".slider__thumb");
      let progress = this.elem.querySelector(".slider__progress");
      let steps = elements.length - 1;
      let sliderValue = document.querySelector(".slider__value");
      event.preventDefault();

      const move = (e) => {
        e.preventDefault();
        let leftRelative =
          (e.clientX - this.elem.getBoundingClientRect().left) /
          this.elem.getBoundingClientRect().width;
        this.value = Math.round(leftRelative * steps);
        if (
          leftRelative < 0 ||
          e.clientX < this.elem.getBoundingClientRect().left
        ) {
          thumb.style.left = "0%";
          progress.style.width = "0%";
          this.value = 0;
        } else if (
          leftRelative > 1 ||
          e.clientX > this.elem.getBoundingClientRect().right
        ) {
          thumb.style.left = "100%";
          progress.style.width = "100%";
          this.value = steps;
        } else {
          thumb.style.left = `${leftRelative * 100}%`;
          progress.style.width = `${leftRelative * 100}%`;
        }
        this.elem.classList.add("slider_dragging");
        sliderValue.textContent = this.value;
      };
      
      document.documentElement.addEventListener("pointermove", move);

      document.documentElement.onpointerup = (e) => {
        let sliderChange = new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        });
        if (!e.target.closest(".slider")) {
          let steps = elements.length - 1;
          let sliderThumb = document.querySelector(".slider__thumb");
          let sliderProgress = document.querySelector(".slider__progress");
          sliderThumb.style.left = `${(this.value / steps) * 100}%`;
          sliderProgress.style.width = `${(this.value / steps) * 100}%`;
          this.elem.dispatchEvent(sliderChange);
          this.elem.classList.remove("slider_dragging");
          document.documentElement.removeEventListener("pointermove", move);
          thumb.onpointerup = null;
        } else {
          this.elem.dispatchEvent(sliderChange);
          this.elem.classList.remove("slider_dragging");
          document.documentElement.removeEventListener("pointermove", move);
          thumb.onpointerup = null;
        }
        this.activeStep(elements);
      };
    });

    this.elem.ondragstart = () => false;
  }
}
