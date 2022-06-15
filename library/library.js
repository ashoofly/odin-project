const addBookButton = document.querySelector('#new_book');
const addBookModal = document.querySelector('#add_book_modal');
const addBookForm = document.querySelector('#add-book-form');
const closeModalButton = document.querySelector('#close-modal');
const shelf = document.querySelector('#shelf');
const clearLibraryButton = document.querySelector('#clear_library');

addBookForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(addBookForm);
  let read = formData.get('read') ? true : false;
  const newBook = new Book(formData.get('book_title'), formData.get('book_author'), formData.get('description'), formData.get('tags'), read);
  addBookToLibrary(newBook);
  addBookModal.classList.remove('modal-active');
  addBookForm.reset();
  displayLibrary();
});

addBookButton.addEventListener('click', function() {
  addBookModal.classList.add('modal-active');
});

closeModalButton.addEventListener('click', function() {
  addBookModal.classList.remove('modal-active');
  addBookForm.reset();
});

function renderCardActions(read, arrayPos, bookCard) {
  let cardIcons = document.createElement('div');
  cardIcons.classList.add("card-icons");
  
  let readIcon = document.createElement("img");
  readIcon.classList.add("card-icon", "hvr-grow");
  readIcon.setAttribute("data-id", arrayPos);
  readIcon.setAttribute('src', "images/read.svg");
  let readIconTooltipContainer = addBottomTooltipToIcon(readIcon, "");
  if (read) {
    readIcon.classList.add("read");
    readIconTooltipContainer.querySelector('.bottom').classList.add('tooltip-read');
  } else {
    readIconTooltipContainer.querySelector('.bottom').classList.add('tooltip-unread');
  }
  readIcon.addEventListener('click', function() {
    readIcon.classList.toggle('read');
    bookCard.classList.toggle('book-card-read');
    readIconTooltipContainer.querySelector('.bottom').classList.toggle('tooltip-read');
    readIconTooltipContainer.querySelector('.bottom').classList.toggle('tooltip-unread');

  });

  let removeIcon = document.createElement("img");
  removeIcon.classList.add("card-icon", "hvr-grow", "remove");
  removeIcon.setAttribute("data-id", arrayPos);
  removeIcon.setAttribute('src', "images/remove.svg");
  removeIcon.addEventListener('click', function() {
    myLibrary.splice(parseInt(removeIcon.getAttribute('data-id')), 1);
    displayLibrary();
  });
  let removeIconTooltipContainer = addBottomTooltipToIcon(removeIcon, "Remove book");

  cardIcons.appendChild(readIconTooltipContainer);
  cardIcons.appendChild(removeIconTooltipContainer);
  return cardIcons;
}

function renderBookCard(book, arrayPos) {
  let bookCard = document.createElement('div');
  bookCard.classList.add("book-card", "hvr-subtle-grow");
  if (book.read) {
    bookCard.classList.add("book-card-read");
  } 
  let mainCardContent = document.createElement('div');
  mainCardContent.classList.add('main-card-content');
  let bookTitle = document.createElement('div');
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;
  let bookAuthor = document.createElement('div');
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = book.author;
  let bookTagContainer = document.createElement("div");
  let tagHeading = document.createElement("span");
  tagHeading.classList.add("tag-heading");
  tagHeading.textContent = "Tags: ";
  bookTagContainer.appendChild(tagHeading);
  let bookTags = document.createElement("span");
  bookTags.classList.add("tags");
  bookTags.textContent = book.tags;
  bookTagContainer.appendChild(bookTags);
  let bookBlurb = document.createElement("p");
  bookBlurb.classList.add("blurb");
  bookBlurb.textContent = book.blurb;

  let bookCardIcons = renderCardActions(book.read, arrayPos, bookCard);

  mainCardContent.appendChild(bookTitle);
  mainCardContent.appendChild(bookAuthor);
  mainCardContent.appendChild(bookBlurb);
  mainCardContent.appendChild(bookTagContainer);
  bookCard.appendChild(mainCardContent);
  bookCard.appendChild(bookCardIcons);
  return bookCard;
}

let myLibrary = JSON.parse(localStorage.getItem('myLibrary') || "[]");

function Book(title, author, blurb, tags, read) {
  this.title = title;
  this.author = author;
  this.blurb = blurb;
  this.tags = tags;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function displayLibrary() {
  removeAllChildren(shelf);
  let i = 0;
  for (let book of myLibrary) {
    let bookCard = renderBookCard(book, i);
    shelf.appendChild(bookCard);
    i++;
  }
}

function clearLibrary() {
  myLibrary = [];
  localStorage.removeItem('myLibrary');
}

clearLibraryButton.addEventListener('click', function() {
  clearLibrary();
  displayLibrary();
});

// uncomment for testing
// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', "This book is about a hobbit.", ["fantasy", "fiction"], false);
// const lotr = new Book('Lord of the Rings', 'J.R.R. Tolkien', "This book is about elves, dwarves, hobbits, wizards, etc.", ["fantasy", "fiction"], true);
// addBookToLibrary(theHobbit);
// addBookToLibrary(lotr);

displayLibrary();