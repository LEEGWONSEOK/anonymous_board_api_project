const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '익명 게시판 제목',
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '익명 게시판 내용',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '익명 게시판 비밀번호',
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: "utf8mb4_unicode_ci"
    });
  }
}