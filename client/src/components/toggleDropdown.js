
const toggle = () => {
  var element = document.getElementById("menu-row");
  element.classList.toggle("toggle");
  var button = document.getElementById("toggleDropdown");
  button.classList.toggle("toggleButton");
  if (button.innerHTML === '<i class="fas fa-chevron-circle-right"></i>') {
    button.innerHTML = '<i class="fas fa-chevron-circle-left"></i>';
  } else {
    button.innerHTML = '<i class="fas fa-chevron-circle-right"></i>';
  }
}

export default toggle;
