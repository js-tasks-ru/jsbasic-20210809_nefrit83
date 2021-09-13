import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.elem.addEventListener("click", (event) => this.modalClose(event));
    document.addEventListener("keydown", (event) => this.modalClose(event));
    document.removeEventListener("keydown", (event) => this.modalClose(event));
  }

  render() {
    let modalWindow = createElement(`
    <div class="modal">
   
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title"></h3>
      </div>

      <div class="modal__body"> A сюда нужно добавлять содержимое тела модального окна</div>
    </div>

  </div>
    `);
    return modalWindow;
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  }

  setTitle(title) {
    this.elem.querySelector(".modal__title").textContent = title;
  }

  setBody(node) {
    this.elem.querySelector(".modal__body").innerHTML = "";
    this.elem.querySelector(".modal__body").append(node);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
  }

  modalClose(event) {
    if (event.target.closest(".modal__close") || event.code === "Escape") {
      this.close();
    }
  }
}
