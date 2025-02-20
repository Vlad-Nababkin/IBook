'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					username: 'Philip',
					email: 'filip@mail.ru',
					phone_number: '79653232112',
					password: 'qwertyPhil',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {})
		
	},
}
