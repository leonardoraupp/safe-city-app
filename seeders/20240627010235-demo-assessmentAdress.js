'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addressassessments', [{
      userId: 1,
      addressId: 1,
      score: 10,
      comment: 'Legal',
      updatedAt: new Date(),
      createdAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addressassessments', null, {});
  }
};
