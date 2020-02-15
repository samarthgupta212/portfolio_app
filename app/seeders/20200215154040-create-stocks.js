'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stocks', [
      {
        name: 'Apple Technologies',
        ticker: 'AAPL',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Miscrosoft",
        ticker: "MSFT",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Google",
        ticker: "GOOG",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Tata Consultancy",
        ticker: "TCS",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Tata Motors",
        ticker: "TAM",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Amazon",
        ticker: "AMZ",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Housing Development",
        ticker: "HDFC",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Bharat Petroleum",
        ticker: "BPCL",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "ICICI BANK",
        ticker: "ICICIBANK",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        name: "Wipro Technologies",
        ticker: "WIPRO",
        createdAt : new Date(),
        updatedAt : new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Stocks', null, {});
  }
};
