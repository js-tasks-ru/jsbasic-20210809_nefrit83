import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.scrolling();
    this.selectCategory();
  }

  render() {
    let ribbonItem = createElement(`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
    ${this.getItem()}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);

    return ribbonItem;
  }

  getItem() {
    return this.categories
      .map((item) => {
        return `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`;
      })
      .join("");
  }

    scrolling() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const buttonArrowRight = this.elem.querySelector(".ribbon__arrow_right");
    const buttonArrowLeft = this.elem.querySelector(".ribbon__arrow_left");

    buttonArrowRight.addEventListener("click", function () {
      ribbonInner.scrollBy(350, 0);

      ribbonInner.addEventListener("scroll", function () {
        let scrollLeft = ribbonInner.scrollLeft; // ширина оставшейся невидимой области слева
        let scrollWidth = ribbonInner.scrollWidth; // общая ширина прокрутки
        let clientWidth = ribbonInner.clientWidth; // видимая ширина элемента
        let scrollRight = scrollWidth - scrollLeft - clientWidth; // ширина оставшейся невидимой области справа

        if (scrollRight !== 0) {
          buttonArrowLeft.classList.add("ribbon__arrow_visible");
        }

        if (scrollRight === 0) {
          buttonArrowRight.classList.remove("ribbon__arrow_visible");
        }
        
      });
    });

    buttonArrowLeft.addEventListener("click", function () {
      ribbonInner.scrollBy(-350, 0);

      ribbonInner.addEventListener("scroll", function () {
        let scrollLeft = ribbonInner.scrollLeft; // ширина оставшейся невидимой области слева

        if (scrollLeft !== 0) {
          buttonArrowRight.classList.add("ribbon__arrow_visible");
        }

        if (scrollLeft === 0) {
          buttonArrowLeft.classList.remove("ribbon__arrow_visible");
        }
      });
    });
  }

  selectCategory() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const ribbonItem = this.elem.querySelectorAll(".ribbon__item");

    ribbonInner.addEventListener("click", (event) => {
      ribbonItem.forEach((item) => {
        item.classList.remove("ribbon__item_active");
      });

      event.target.classList.add("ribbon__item_active");

      this.elem.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: event.target.dataset.id,
          bubbles: true,
        })
      );
    });
  }
}
