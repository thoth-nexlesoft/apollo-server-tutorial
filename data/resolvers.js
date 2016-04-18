import { Author, Post } from './connectors';

const resolveFunctions = {
  RootQuery: {
    author(_, { firstName, lastName }){
      return Author.find({ where: { firstName, lastName } });
    },
    posts(_, { tag }){
      return Post.where( tag in tags); // TODO TK
    },
  },
  RootMutation: {
    createAuthor: (root, args) => { return Author.create(args); },
    createPost: () => { throw new Error('not implemented'); },
  },
  Author: {
    posts(author){
      return author.getPosts();
    },
  },
  Post: {
    author(post){
      return post.getAuthor();
    },
    tags(post){
      return post.tags.split(',');
    }
  }
}

export default resolveFunctions;
