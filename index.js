const mysql = require("mysql");
require("dotenv").config();
const inquirer = require("inquirer");
const chalk = require("chalk");
const { purchase } = require("./bamazonCustomer");

// Main Sequence
function init() {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        choices: ["Purchase", "Manager Login", "Supervisor Login", "Quit"],
        message: "Welcome to bamazon: what do you like to do?"
      }
    ])
    .then(answer => {
      switch (answer.choice) {
        case "Purchase":
          purchase();
          break;
        case "Manager Login":
          managerPortal();
          break;
        case "Supervisor Login":
          supPortal();
          break;
        default:
          doQuit();
      }
    });
}

function managerPortal() {
  console.log("manager portal");
  //options; login and quit
}

function supPortal() {
  console.log("supervisor portal");
  //options; login and quit
}

function doQuit() {
  connection.end();
  console.log("Good Bye!");
}

init();
