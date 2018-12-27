const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const connection = require("./dbConnect");
const { init, getItemListing } = require("./bamazonCustomer");

console.log(getItemListing);
// console.log(init);

function ManagerView() {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        choices: [
          "View Products",
          "View Low Inventory",
          "Add Product",
          "Refill Inventory",
          "Quit"
        ],
        message: "Bamazon Manager View: what do you like to do?"
      }
    ])
    .then(answer => {
      switch (answer.choice) {
        case "View Products":
          viewProduct();
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add Product":
          addProduct();
          break;
        case "Refill Inventory":
          refill();
          break;
        default:
          doQuit();
      }
    });
}

async function viewProduct() {
  console.log(getItemListing);
  const products = await getItemListing();
  console.log(products);
}

function viewLowInventory() {
  ManagerView();
}

function addProduct() {
  ManagerView();
}

function refill() {
  ManagerView();
}

function doQuit() {
  console.log("Good Bye!");
}

ManagerView();

module.exports = { ManagerView };
