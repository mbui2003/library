// Array to store book objects
let myLibrary = [];

// DOM elements
const $title = document.querySelector("#title");
const $author = document.querySelector("#author");
const $pages = document.querySelector("#pages");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#book-table-body");

// Form submission event listener
const $form = document.querySelector("form#myForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // Add book to library, render the updated library, and clear the form
  addBookToLibrary();
  render();
  clearForm();
});

// Table click event listener
const $table = document
  .querySelector(".table")
  .addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    // Handle delete button click
    if (e.target.innerHTML == "Delete") {
      if (confirm(`Are you sure you want to delete ${currentTarget.innerText}?`))
        deleteBook(findBook(myLibrary, currentTarget.innerText));
    }
    // Handle status button click
    if (e.target.classList.contains("status-button")) {
      changeStatus(findBook(myLibrary, currentTarget.innerText));
    }
    // Render the updated library
    render();
  });

// Book class
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// Function to add a book to the library
function addBookToLibrary() {
  // Check if title and author fields are filled
  if ($title.value.length === 0 || $author.value.length === 0) {
    alert("Please, fill all the fields");
    return;
  }
  // Create a new Book object and add it to the library
  const newBook = new Book($title.value, $author.value, $pages.value, $status.value);
  myLibrary.push(newBook);
}

// Function to change the status of a book
function changeStatus(book) {
  if (myLibrary[book].status === "Read") {
    myLibrary[book].status = "Not read";
  } else myLibrary[book].status = "Read";
}

// Function to delete a book from the library
function deleteBook(currentBook) {
  myLibrary.splice(currentBook, 1);
}

// Function to find the index of a book in the library
function findBook(libraryArray, title) {
  if (libraryArray.length === 0 || libraryArray === null) {
    return;
  }
  for (Book of libraryArray)
    if (Book.title === title) {
      return libraryArray.indexOf(Book);
    }
}

// Function to clear the form fields
function clearForm() {
  $title.value = "";
  $author.value = "";
  $pages.value = "";
}

// Function to render the library in the table
function render() {
  $tableBody.innerHTML = "";
  myLibrary.forEach((book) => {
    // Generate HTML for each book and append it to the table body
    const htmlBook = `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td><button class="status-button">${book.status}</button></td>
          <td><button class="delete">Delete</button></td>
        </tr>
        `;
    $tableBody.insertAdjacentHTML("beforeend", htmlBook);
  });
}

// Initial rendering of the library
render();
