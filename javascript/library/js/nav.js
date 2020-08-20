const navElement = document.querySelector("nav#main");
const spanCurrentFilter = document.querySelector("#current-filter");
const addBookButton = document.querySelector("#add-book");
const addBookModal = document.querySelector(".modal.add-book");
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
function updateFilterOption() {
  spanCurrentFilter.textContent = filterOptions[currentFilterIndex];
  if (currentFilterIndex == 1) {
    spanCurrentFilter.classList.add("red");
  } else {
    spanCurrentFilter.classList.remove("red");
  }
}

function handleClick(e) {
  let clickedItem = e.target.id;

  if (e.target.id == "filter") {
    if (currentFilterIndex == 2) {
      currentFilterIndex = 0;
    } else {
      currentFilterIndex += 1;
    }
    updateFilterOption();
  }
}

function openAddBookModal() {
  addBookModal.style.display = "block";
}

window.addEventListener("scroll", makeSticky);
navElement.addEventListener("click", handleClick);

addBookButton.addEventListener("click", openAddBookModal);

updateFilterOption();
