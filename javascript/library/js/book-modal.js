const addBookButton = document.querySelector("#add-book");
const addBookModal = document.querySelector(".modal.add-book");
const btnCancelBook = document.querySelector("#book-cancel");
const btnSubmitBook = document.querySelector("#book-submit");
const bookFieldElements = document.querySelectorAll("input");

function openAddBookModal() {
  addBookModal.style.display = "block";
}

function closeBookModal() {
  addBookModal.style.display = "none";
  bookFieldElements.forEach((field) => (field.value = ""));
}

function submitBook() {
  //myLibrary.addBook(new Book(bookFieldElements[0].value));
  let newBook = new Book(
    ...Array.from(bookFieldElements).map((field) => field.value)
  );
  myLibrary.addBook(newBook);
  myLibrary.renderView();
  closeBookModal();
}

btnCancelBook.addEventListener("click", closeBookModal);
btnSubmitBook.addEventListener("click", submitBook);
addBookButton.addEventListener("click", openAddBookModal);
