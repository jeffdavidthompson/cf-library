function Book(name) {
  this.name = name;
  //Taking a book off the shelf will simply return it to the book cart.
  //We could search for the book first rather than requiring the starting
  //shelf, but it seems like a good precaution to require the location.
  this.unshelf = function(startShelf){
    startShelf.bookstock.splice(startShelf.bookstock.indexOf(this),1);
    cart.bookstock.push(this);
  };
  this.enshelf = function(shelf) {
  //For this one we have to check if it's on the book cart first
    if (cart.bookstock.indexOf(this) != -1) {
      shelf.bookstock.push(this);
    };
  };
};

function Shelf(name){
  this.name = name;
  this.bookstock = [];
  //this will allow reports on books by shelf
  this.report = function() {
    if (this.bookstock.length > 0) {
    console.log("The " + name + " contains:");
    for (var i = 0; i < this.bookstock.length; i++) {
      console.log(this.bookstock[i].name);
      };
    } else {
      console.log("The " + name + " is empty.");
    }
  };
};

function Library(name){
  this.name = name;
  this.shelves = [];
  this.report = function(){
    console.log("Generating Report for the " + name);
    console.log("");
    for (var i = 0; i < this.shelves.length; i++) {
      this.shelves[i].report();
      //and a return for easier reading, unless it's the last line
      if (i != this.shelves.length - 1) {
        console.log("");
      };
    };
  };
};


var illiad = new Book("The Illiad");
var oddysey = new Book("The Oddysey");
var gatsby = new Book("The Great Gatsby");

var cart = new Shelf("Book Cart");
var classics = new Shelf("Classics Shelf");
var lit = new Shelf("Literature Shelf");

var mainStreetLibrary = new Library("Main Street Library");


//This will populate the library with shelves,
//and then below, the shelves will be populated with books
//but the shelves could be populated first as well.

mainStreetLibrary.shelves.push(cart);
mainStreetLibrary.shelves.push(classics);
mainStreetLibrary.shelves.push(lit);

classics.bookstock.push(illiad);
classics.bookstock.push(oddysey);
lit.bookstock.push(gatsby);

illiad.unshelf(classics);

mainStreetLibrary.report();
