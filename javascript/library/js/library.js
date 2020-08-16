const libraryDiv = document.querySelector(".library");

//TODO: firebase login via google or other external auth
//TODO: Toggle flip of currentView and render accordingly
//TODO: firebase storage by JSON.stringify of book objects
//TODO: Modal dialog for adding new book using book constructor

class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = this.generateId(`${this.title}${this.author}`.replace(" ", ""));
  }

  generateId(inputString) {
    //https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
      let chr = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }

  render(cssClass) {
    let article = document.createElement("article");
    article.classList.add(cssClass);
    article.dataset.id = this.id;

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
  constructor(targetDiv, bookClass) {
    this.bookShelf = [];
    this.targetDiv = targetDiv;
    this.bookClass = bookClass;
    this.currentView = "all";
    this.addHandling(this.targetDiv);
  }

  addHandling(targetDiv) {
    targetDiv.addEventListener("click", (e) => {
      //Identify click event source and book
      let clickedBook = e.target.closest(".book");
      let bookId = clickedBook.dataset.id;

      let clickedAction = e.target.getAttribute("id");

      if (clickedAction == "delete") {
        this.removeBook(bookId);
      }

      if (clickedAction == "bookmark") {
        this.toggleBookmark(bookId);
      }
    });
  }

  addBook(newBook) {
    this.bookShelf.push(newBook);
  }

  removeBook(bookId) {
    let filteredBooks = this.bookShelf.filter((book) => book.id != bookId);
    this.bookShelf = filteredBooks;
    this.renderView();
  }

  toggleBookmark(bookId) {
    let bookIndex = this.bookShelf.findIndex((book) => book.id == bookId);
    console.log(bookIndex);
    if (bookIndex != -1) {
      this.bookShelf[bookIndex].read = !this.bookShelf[bookIndex].read;
      this.renderView();
    }
  }

  renderView() {
    //Clear div
    this.targetDiv.innerText = "";
    let viewFunction = (book) => {
      return true;
    };

    switch (this.currentView) {
      case "read":
        viewFunction = (book) => book.read == true;
        break;
      case "unread":
        viewFunction = (book) => book.read == false;
        break;
    }
    let s = (book) => (book = true);

    this.bookShelf.filter(viewFunction).forEach((currentBook) => {
      this.targetDiv.appendChild(currentBook.render(this.bookClass));
    });
  }
}

let myLibrary = new Library(libraryDiv, "book");

myLibrary.addBook(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
myLibrary.addBook(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, false));
myLibrary.addBook(new Book("The Dip", "Some Guy", 70, true));

myLibrary.currentView = "all";
myLibrary.renderView();
