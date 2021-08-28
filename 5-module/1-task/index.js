
function hideSelf() {
  // ваш код...
  let button = document.querySelector('button');
  button.addEventListener("click", (event) => {
    button.setAttribute("hidden", true);
  });
}
