'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Books',
			[
				{
					title: 'Gogol',
					author: 'Gogol',
					user_comment: 'Great book i love it',
					book_cover:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/N.Gogol_by_F.Moller_%281840%2C_Tretyakov_gallery%29.jpg/800px-N.Gogol_by_F.Moller_%281840%2C_Tretyakov_gallery%29.jpg',
          user_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Books', null, {})
		
	},
}
