import { Author, Post } from './connectors';
import rp from 'request-promise';

const resolveFunctions = {
  RootQuery: {
    author(_, { firstName, lastName }){
      return Author.find({ where: { firstName, lastName } });
    },
    posts(_, { tag }){
      return Post.where( tag in tags); // TODO TK
    },
    fortuneCookie(){
      return rp('http://fortunecookieapi.com/v1/cookie')
        .then((res) => JSON.parse(res))
        .then((res) => {
          return res[0].fortune.message;
        });
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
