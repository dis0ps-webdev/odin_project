const navElement = document.querySelector("nav#main");
const navOriginalPosition = navElement.offsetTop;

const filterOptions = ["all", "read", "unread"];
let currentFilterIndex = 0;

function makeSticky() {
  if (navElement.offsetTop < window.pageYOffset) {
    navElement.classList.add("sticky");
  }
  if (window.pageYOffset < navOriginalPosition) {
    navElement.classList.remove("sticky");
  }
}

function handleClick(e) {
  let clickedItem = e.target.id;
}

window.addEventListener("scroll", makeSticky);
navElement.addEventListener("click", handleClick);
