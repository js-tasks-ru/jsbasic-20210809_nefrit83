function toggleText() {
  // ваш код...
  let button = document.querySelector("button");
  let text = document.getElementById("text");
  button.onclick = () => {
    text.hidden = !text.hidden;
  };
}
