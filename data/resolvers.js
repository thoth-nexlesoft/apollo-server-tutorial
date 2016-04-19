import { Author, Post, View, FortuneCookie } from './connectors';

const resolveFunctions = {
  RootQuery: {
    author(_, { firstName, lastName }){
      return Author.find({ where: { firstName, lastName } });
    },
    posts(_, { tag }){
      return Post.where( tag in tags); // TODO TK
    },
    fortuneCookie(){
      return FortuneCookie.getOne();
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
    },
    views(post){
      return View.findOne({ postId: post.id }).then( (res) => res.views );
    }
  }
}

export default resolveFunctions;
