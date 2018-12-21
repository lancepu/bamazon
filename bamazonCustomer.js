const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const connection = require("./dbConnect");

// Purchase sequence
async function purchase() {
  const items = await getItemListing();
  choices = [];
  for (i = 0; i < items.length; i++) {
    choices.push({
      key: items[i].id,
      value: items[i].name
    });
  }
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: function() {
          console.log(
            "What would you like to purchase? Please input the item ID"
          );
          for (i = 0; i < items.length; i++) {
            console.log(
              `ID: ${chalk.green(items[i].id)} - ${items[i].name} - Price: $${
                items[i].price
              } - In Stock: ${items[i].stock_quantity} `
            );
          }
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
      }
    ])
    .then(async answer => {
      let selectedItem = items.filter(i => i.id === parseInt(answer.item_id));
      await updateQuantity(selectedItem[0], answer.quantity);
      init();
    });
}

function updateQuantity(selectedItem, purhcase_quantity) {
  let newQuantity = selectedItem.stock_quantity - purhcase_quantity;
  if (newQuantity >= 0) {
    return new Promise((resolve, reject) => {
      let query = mysql.format(
        "UPDATE `products` SET stock_quantity = ? WHERE id = ?",
        [newQuantity, selectedItem.id]
      );
      connection.query(query, function(error, results, fields) {
        if (error) reject;
        resolve(
          console.log(
            `Your purchase of ${chalk.green(purhcase_quantity)} ${chalk.green(
              selectedItem.name
            )} is complete! Your total is ${chalk.green("$")}${chalk.green(
              (purhcase_quantity * selectedItem.price).toFixed(2)
            )} Thank you for your purchase!`
          )
        );
      });
    });
  } else
    return console.log(
      chalk.red(
        `Insufficient quantity of ${chalk.green(selectedItem.name)} in stock!`
      )
    );
}

function getItemListing() {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM `products`";
    connection.query(query, function(error, results, fields) {
      if (error) reject;
      resolve(results);
    });
  });
}

module.exports.purchase = purchase;
