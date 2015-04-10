//THEORY
//I see the library system as a set of sets. Books are inside shelves,
//shelves are sets inside libraries, libraries are sets inside the library
//system, etc. So, all of these sets can perform almost the same fuctions, eg.
//list their contents, or add and remove them.

//starting with the smallest componants
function book(title,author) {
  this.title = title;
  this.author = author;
  //Taking a book off the shelf will simply return it to the book cart.
  //We could search for the book first rather than requiring the starting
  //shelf, but it seems like a good precaution to require the location.
  };

function shelf(name){
  //this would be the name of the shelf, probably a genre like Mystery
  this.name = name;
  //initialize an empty array which will hold books
  this.bookstock = [];
  //books can't come from a void, they must start on another shelf
  this.add = function(book,originShelf){
    if (originShelf.bookstock.indexOf(book) != 1){
      originShelf.bookstock.splice(originShelf.bookstock.indexOf(book),1);
      this.bookstock.push(book);
    }
  }
  this.remove = function(book){
    if (this.bookstock.indexOf(book) != 1){
      this.bookstock.splice(this.bookstock.indexOf(book),1);
      cart.bookstock.push(book);
    }
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

function branch(name){
  this.name = name;
  //initialize an empty array which will hold all the shelves
  this.shelves = [];
  //adding a shelf will move it from the archive to the library
  this.add = function(shelf){
    if (archive.shelves.indexOf(shelf) != -1){
      this.shelves.push(shelf);
    }
  }
  //removing a shelf will send it to the archive
  this.remove = function(shelf){
    this.shelves.splice(this.shelves.indexOf(shelf),1);
    archive.shelves.push(shelf);
  }
  //The library report simply generates reports for all the shelves it contains
  this.report = function(){
    console.log(name + " stacks:");
    console.log("");
    for (var i = 0; i < this.shelves.length; i++) {
      this.shelves[i].report();

      //add a return for easier reading, unless it's the last line
      if (i != this.shelves.length - 1) {
        console.log("");
      }
    };
  };
};

function librarySystem(name){
  this.name = name;
  this.libraries = [];
  this.report = function(){
    console.log("Generating report for the " + name);
    console.log("");
    for (var i = 0; i < this.libraries.length; i++) {
      this.libraries[i].report();
      //add a return for easier reading, unless it's the last line
      if (i != this.libraries.length - 1) {
        console.log("");
      }
    }
  }
}
//
//Set up the library system
//

//add some books
var illiad = new book("The Illiad","Homer");
var odyssey = new book("The Odysey","Homer");
var scarlet = new book("A Study in Scarlet","Arthur Conan Doyle");

//add some shelves
//the cart will hold the books not assigned to a shelf
var cart = new shelf("Book Cart");
var classics = new shelf("Classics Shelf");
var mystery = new shelf("Mystery Shelf");

//add some libraries
//The archive will hold the shelves not assigned to a library
var archive = new branch("Archive")
var mainStreetLibrary = new branch("Main Street Library");

//add the library system that contains the branches
var spl = new librarySystem("Seattle Public Library System");

//This is the initial setup, laying out how the

spl.libraries.push(mainStreetLibrary);
spl.libraries.push(archive)

mainStreetLibrary.shelves.push(classics);
mainStreetLibrary.shelves.push(mystery);

archive.shelves.push(cart);

classics.bookstock.push(illiad);
mystery.bookstock.push(odyssey);
mystery.bookstock.push(scarlet);

//Here's the methods in action. Note how The Odyssey was wrongly added to the
//classic's shelf. Below the custom methods are used to fix the problem.


mainStreetLibrary.remove(mystery);
mystery.remove(odyssey);
classics.add(odyssey,cart);

spl.report();
