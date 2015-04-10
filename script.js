//THEORY
//I see the library system as a set of sets. Books are sets inside shelves,
//shelves are sets inside libraries, libraries are sets inside the library
//system, etc. So, all of these sets can perform almost the same fuctions, eg.
//list their contents, or add and remove them.

//starting with the smallest componants
function Book(title,author) {
  this.title = title;
  this.author = author;
  //Taking a book off the shelf will simply return it to the book cart.
  //We could search for the book first rather than requiring the starting
  //shelf, but it seems like a good precaution to require the location.
  this.add = function(startShelf){
    startShelf.bookstock.splice(startShelf.bookstock.indexOf(this),1);
    cart.bookstock.push(this);
  };
  this.remove = function(shelf) {
  //For this one we have to check if it's on the book cart first
    if (cart.bookstock.indexOf(this) != -1) {
      shelf.bookstock.push(this);
    };
  };
};

function Shelf(name){
  this.name = name;
  //initialize an empty array which will hold books
  this.bookstock = [];
  //this will allow add/remove books from the shelf
  this.remove = function(){

  }
  //this will allow reports describing the books on the shelf
  this.report = function() {
    if (this.bookstock.length > 0) {
    console.log("The " + name + " contains:");
    for (var i = 0; i < this.bookstock.length; i++) {
      console.log(this.bookstock[i].title + ", by " + this.bookstock[i].author);
      };
    } else {
      console.log("The " + name + " is empty.");
    };
  };
};

function Library(name){
  this.name = name;
  //initialize and empty array which will hold all the shelves
  this.shelves = [];
  this.report = function(){
    console.log("Generating Report for the " + name);
    console.log("");
    for (var i = 0; i < this.shelves.length; i++) {
      this.shelves[i].report();
      //add a return for easier reading, unless it's the last line
      if (i != this.shelves.length - 1) {
        console.log("");
      };
    };
  };
};

var illiad = new Book("The Illiad","Homer");
var oddysey = new Book("The Oddysey","Homer");
var scarlet = new Book("A Study in Scarlet","Arthur Conan Doyle");

var cart = new Shelf("Book Cart");
var classics = new Shelf("Classics Shelf");
var mystery = new Shelf("Mystery Shelf");

var mainStreetLibrary = new Library("Main Street Library");

//This will populate the library with shelves,
//and then below, the shelves will be populated with books

mainStreetLibrary.shelves.push(cart);
mainStreetLibrary.shelves.push(classics);
mainStreetLibrary.shelves.push(mystery);

classics.bookstock.push(illiad);
classics.bookstock.push(oddysey);
mystery.bookstock.push(scarlet);

illiad.remove(classics);

mainStreetLibrary.report();
