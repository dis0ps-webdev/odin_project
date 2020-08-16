const libraryDiv = document.querySelector(".library");

class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  render(cssClass) {
    let article = document.createElement("article");
    article.classList.add(cssClass);

    let articleTitle = document.createElement("header");
    articleTitle.innerHTML = `<span>${this.title}</span>`;
    article.appendChild(articleTitle);

    let authorSection = document.createElement("section");
    authorSection.innerHTML += `<span>${this.author}</span>`;

    let bookmark_type = "unread";
    if (this.read) {
      bookmark_type = "read";
    }

    authorSection.innerHTML += `<span><img id="bookmark" style="width:75px;object-fit:cover;object-position: 15px -20px;" alt=bookmark-unread" src=images/bookmark_${bookmark_type}.png /></span>`;
    article.appendChild(authorSection);

    let additionalSection = document.createElement("footer");
    additionalSection.innerHTML +=
      '<span><img id="delete" style="width:25px;margin:0px;padding;0px;" alt="delete" src=images/delete.png /></span>';
    additionalSection.innerHTML += `<span>Page Count: ${this.pages}</span>`;

    article.appendChild(additionalSection);
    return article;
  }
}

class Library {
  constructor(targetDiv) {
    this.bookShelf = [];
    this.currentView = [];
    this.targetDiv = targetDiv;
    this.addHandling(this.targetDiv);
  }

  addHandling(targetDiv) {
    targetDiv.addEventListener("click", (e) => {
      //Identify click event source and book
      let clickedBook = e.target.closest(".book");
      let clickedAction = e.target.getAttribute("id");

      //Match book clicked to the array
      let libraryArray = Array.from(targetDiv.querySelectorAll(".book"));
      let bookIndex = libraryArray.indexOf(clickedBook);

      if (clickedAction == "delete") {
        //Remove affected book from array and DOM
        this.bookShelf.splice(bookIndex, 1);
        targetDiv.removeChild(clickedBook);
      }

      //Replace affected book from array and DOM
      if (clickedAction == "bookmark") {
        this.bookShelf[bookIndex].read = !this.bookShelf[bookIndex].read;
        targetDiv.replaceChild(
          this.bookShelf[bookIndex].render("book"),
          clickedBook
        );
      }
    });
  }

  addBook(newBook) {
    this.bookShelf.push(newBook);
  }

  renderAll(cssClass) {
    this.targetDiv.innerText = "";
    this.bookShelf.forEach((currentBook) => {
      this.targetDiv.appendChild(currentBook.render(cssClass));
      this.targetDiv.lastChild.dataset.array-index=
    });
  }
}

let myLibrary = new Library(libraryDiv);

myLibrary.addBook(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
myLibrary.addBook(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, false));
myLibrary.addBook(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
myLibrary.addBook(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
myLibrary.addBook(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
myLibrary.addBook(new Book("Cryptonomicon", "Neal Stephenson", 918, false));
myLibrary.addBook(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));
myLibrary.addBook(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));
myLibrary.addBook(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, false));
myLibrary.addBook(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));

myLibrary.renderAll("book");
