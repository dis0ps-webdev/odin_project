const libraryDiv = document.querySelector(".library");
let bookShelf = [];

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

function renderAll(bookArray) {
  libraryDiv.innerText = "";
  bookArray.forEach((currentBook) => {
    libraryDiv.appendChild(currentBook.render("book"));
  });
}

bookShelf.push(
  new Book(
    "The Dip",
    "Seth Godin, Elon Musk, Steve Jobs, Seth Godin, Elon Musk, Steve Jobs, Mickey Mouse",
    70
  )
);
bookShelf.push(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
bookShelf.push(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));
bookShelf.push(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
bookShelf.push(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
bookShelf.push(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
bookShelf.push(new Book("Cryptonomicon", "Neal Stephenson", 918, true));
bookShelf.push(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));
bookShelf.push(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));
bookShelf.push(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));
bookShelf.push(new Book("The Cuckoo's Egg", "Clifford Stoll", 326, true));

let currentView = bookShelf.filter((book) => {
  return book.read == true;
});

renderAll(bookShelf);

libraryDiv.addEventListener("click", (e) => {
  //Identify click event source and book
  let clickedBook = e.target.closest(".book");
  let clickedId = e.target.getAttribute("id");

  //Match book clicked to the array
  let libraryArray = Array.from(libraryDiv.querySelectorAll(".book"));
  let bookIndex = libraryArray.indexOf(clickedBook);

  if (clickedId == "delete") {
    //Remove affected book from array and DOM
    console.log(bookShelf.indexOf(bookShelf[bookIndex]));
    bookShelf.splice(bookIndex, 1);
    libraryDiv.removeChild(clickedBook);
  }

  //Replace affected book from array and DOM
  if (clickedId == "bookmark") {
    bookShelf[bookIndex].read = !bookShelf[bookIndex].read;
    libraryDiv.replaceChild(bookShelf[bookIndex].render("book"), clickedBook);
  }
});
