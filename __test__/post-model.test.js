'use strict';

require('@code-fellows/supergoose');

// const Model = require('../lib/models/users-model.js');
const ModelPost = require('../lib/models/posts-model.js');
let postItem = {
  username:'yaso',
  title:'car',
  description:'red',
  categories:'mobile',
};
let id;
describe('Testin Model CRUD operations', () => {
  it('create post', async ()=>{
    let post = await ModelPost.create({
      username:'yaso',
      title:'car',
      description:'red',
      categories:'cars',
    });
    expect(post.username).toStrictEqual('yaso');
    expect(post.title).toStrictEqual('car');
  });
  it('get all posts', async ()=>{
    await ModelPost.get()
      .then(data =>{
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toEqual(1);
      });
  });
  it('get post by category', async ()=>{
    let post = await ModelPost.create(postItem);
    await ModelPost.searchGet({categories:'mobile'})
      .then(data =>{
        id = post._id;
        // console.log('_id :' , id);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toEqual(1);
        expect(post.username).toEqual('yaso');
      });
  });
  it('update post', async ()=>{
    await ModelPost.update(id,{categories:'electronic'})
      .then(data =>{
        expect(data.username).toEqual('yaso');
        expect(data.categories).toEqual('electronic');
      });
  });
  it('dalete post', async ()=>{
    await ModelPost.delete(id)
      .then(data =>{
        console.log('data :' , data, id);
        expect(data.username).toEqual('yaso');
      });
  });
});