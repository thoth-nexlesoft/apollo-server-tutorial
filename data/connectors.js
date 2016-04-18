import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
});

const AuthorModel = db.define('author', {
  firstName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
});

const PostModel = db.define('post', {
  title: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  text: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  tags: {
    type: Sequelize.STRING,
  }
});

// Relations
AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

casual.seed(123);
db.sync({ force: true }).then(()=> {
  _.times(10, ()=> {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then(author => {
      return author.createPost({
        title: `A post by ${author.firstName} ${author.lastName}`,
        text: casual.sentences(3),
        tags: casual.words(3).split(' ').join(','),
      });
    });
  });
});

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post };
