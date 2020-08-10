const navElement = document.querySelector("nav#main");
const navOriginalPosition = navElement.offsetTop;

function makeSticky() {
  if (navElement.offsetTop < window.pageYOffset) {
    navElement.classList.add("sticky");
  }
  if (window.pageYOffset < navOriginalPosition) {
    navElement.classList.remove("sticky");
  }
}

window.addEventListener("scroll", makeSticky);
