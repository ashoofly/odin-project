const shelf = document.querySelector('#shelf');


let myLibrary = [];


function renderCardActions(read) {
  let cardIcons = document.createElement('div');
  cardIcons.classList.add("card-icons");
  
  let readIcon = document.createElement("img");
  readIcon.classList.add("card-icon", "hvr-grow");
  if (read) {
    readIcon.classList.add("read");
    readIcon.setAttribute('src', "images/read.svg");
  } else {
    readIcon.setAttribute('src', "images/unread.svg");
  }
  
  let removeIcon = document.createElement("img");
  removeIcon.classList.add("card-icon", "hvr-grow");
  removeIcon.setAttribute('src', "images/remove.svg");

  cardIcons.appendChild(readIcon);
  cardIcons.appendChild(removeIcon);
  return cardIcons;
}

function renderBookCard(book) {
  let bookCard = document.createElement('div');
  bookCard.classList.add("book-card", "hvr-subtle-grow");
  let bookTitle = document.createElement('h3');
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;
  let bookAuthor = document.createElement('h4');
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = book.author;
  let bookBlurb = document.createElement("p");
  bookBlurb.classList.add("blurb");
  bookBlurb.textContent = book.blurb;
  let bookTags = document.createElement("p");
  bookTags.classList.add("tags");
  bookTags.textContent = `Tags: ${book.tags}`;
  let bookCardIcons = renderCardActions(book.read);

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookBlurb);
  bookCard.appendChild(bookTags);
  bookCard.appendChild(bookCardIcons);
  return bookCard;
}



function Book(title, author, blurb, tags, read) {
  this.title = title;
  this.author = author;
  this.blurb = blurb;
  this.tags = tags;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  for (let book of myLibrary) {
    let bookCard = renderBookCard(book);
    shelf.appendChild(bookCard);
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', "This book is about a hobbit.", ["fantasy", "fiction"], false);
const lotr = new Book('Lord of the Rings', 'J.R.R. Tolkien', "This book is about elves, dwarves, hobbits, wizards, etc.", ["fantasy", "fiction"], true);

addBookToLibrary(theHobbit);
addBookToLibrary(lotr);

displayLibrary();