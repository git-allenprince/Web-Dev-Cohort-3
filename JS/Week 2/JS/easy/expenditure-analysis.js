/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  if (transactions.length == 0) return [];
  var result = {};
  for (let i = 0; i < transactions.length; i++) {
    const category = transactions[i].category;
    const price = transactions[i].price;

    if (category in result) {
      result[category] += price;
    } else {
      result[category] = price;
    }
  }
  arr = [];
  for (const category in result) {
    arr.push({ category, totalSpent: result[category] });
  }
  return arr;
}

module.exports = calculateTotalSpentByCategory;
