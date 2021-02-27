const addBookButton = document.querySelector("#add-book");
const addBookModal = document.querySelector(".modal.add-book");
const btnCancelBook = document.querySelector("#book-cancel");
const btnSubmitBook = document.querySelector("#book-submit");
const bookFieldElements = document.querySelectorAll("input");
const bookAdditionForm = document.querySelector("#form-add-book");

const errorMessages = {
  badInput: "Enter a valid number of pages",
  valueMissing: "This field is required",
};

function openAddBookModal() {
  addBookModal.style.display = "block";
}

function closeBookModal() {
  addBookModal.style.display = "none";
  bookFieldElements.forEach((field) => {
    clearErrorMessage(field);
    field.value = "";
  });
}

function submitBook() {
  let newBook = new Book(
    ...Array.from(bookFieldElements).map((field) => field.value)
  );

  const isValid = isValidForm();

  if (isValid) {
    myLibrary.addBook(newBook);
    myLibrary.renderView();
    closeBookModal();
  }
}

function setErrorMessage(field) {
  const invalidityState = field.validity;
  const errorElement = document.getElementById(`${field.name}-error`);

  for (validityType in invalidityState) {
    if (invalidityState[validityType] == true) {
      errorElement.innerHTML = errorMessages[validityType];
      errorElement.classList.add("visibile");
    }
  }
}

function clearErrorMessage(field) {
  const errorElement = document.getElementById(`${field.name}-error`);
  errorElement.classList.remove("visibile");
}

function isValidForm() {
  return Array.from(bookFieldElements).every((field) => {
    const valid = field.checkValidity();

    if (!valid) {
      setErrorMessage(field);
      return false;
    } else {
      clearErrorMessage(field);
      return true;
    }
  });
}

btnCancelBook.addEventListener("click", (e) => {
  e.preventDefault();
  closeBookModal();
});
btnSubmitBook.addEventListener("click", (e) => {
  e.preventDefault();
  submitBook();
});
addBookButton.addEventListener("click", openAddBookModal);
