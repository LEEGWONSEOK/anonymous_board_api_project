const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          checkLength(value) {
            if (value.length > 20) {
              throw new Error("title 길이가 20자 이하여야 합니다");
            }
          },
        },
        comment: '익명 게시판 제목',
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          checkLength(value) {
            if (value.length > 200) {
              throw new Error("content 길이가 200자 이하여야 합니다");
            }
          },
        },
        comment: '익명 게시판 내용',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '익명 게시판 비밀번호',
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'salt',
      },
      createAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        comment: '생성 날짜',
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        comment: '수정 날짜',
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: "utf8mb4_unicode_ci"
    });
  }
}