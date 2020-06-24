# 401 PROJECT/ 1

## Project Name : Trader APP


## Team Members:

- Ahmad Kmal
- Yazan aljamal
- yasmeen Adaileh
- Marah Joudeh

## LINKS:

- [heruko app]()
- [Trello Board](https://trello.com/b/YLFmPzGT/trader)
- [Software Requirements](software-Req.md)


## App Description:

Trader App is an app for users who want to see who's interested in buying or trading thier items , so that other users can explore the app and see all published posts from all users, also a user can chat with another user as well to ask for more information. 

## Wireframe:

![Wireframe](/assets/framework.PNG)

## Domain Modeling:

![Domain6](/assets/domain6.png)
![Domain1](/assets/domain1.png)
![Domain2](/assets/domain2.png)
![Domain3](/assets/domain3.png)
![Domain4](/assets/domain4.png)
![Domain5](/assets/domain5.png)

## Routes

- `/signup` >>> no auth

* POST: send username and password 


- `/signin` >>> basic

* POST: send username and password with basic authentication.


- `/oauth` 

* GET: sign in using google .


- `/login-with-facebook`

* POST: sign in using facebook .


- `/users` >>> basic

* GET: get all users from database.


- `/status` >>> bearer

* GET: get all posts (published, pending, deleted) for admins only.


- `/status/:id` >>> bearer

* GET: get a certain post (published, pending, deleted) for admins only.


- `/status/:id` >>> bearer

* PUT : update any post (accept, reject, delete) for admins only.


- `/all` >>> no auth

* GET: get all posts (accepted only) for users.


- `/search/:id` >>> bearer

* DELETE: allow the user to delete his own post.


- `/user/:id` >>> bearer

* PUT: allow the user to update his own post.


- `/user/:username` >>> bearer

* POST: allow the user to post a new post.


- `/user/:username` >>> bearer/guest

* GET : allow the signed in user to get all his posts (published, pending), allow the guest user to get all posts of a certain user (published only).


- `/searchBy/:categories` >>> no auth

* GET: allow the user to search for accepted posts regarding the categories.


- `/statusBy/:categories` >>> bearer

* GET: allow the admin to search for ALL posts regarding the categories.


- `/addfav/:id` >>> bearer

* GET : allow the user to add a certain post to his favorites.


- `/fav` >>> bearer

* GET : allow the user to get all posts in his favorites list.


- `/rate/:id` >>> bearer

* POST : allow the user to rate a certain post.


- `/comment/:id` >>> bearer

* POST : allow the user to  leave a comment on a certain post.


## Database Entity-Relationship-Diagram:

![Diagram](/assets/diagram.jpg)

## Enviromental variables:

- `PORT`=3000
- `MONGODB_URI`=mongodb://localhost:27017/trader
- `SECRET`=Dealer5-401+

## Run the server

- `nodemon`

## Realtime chat 

![Chat Console]()

## Tests

- `npm test`
- `npm run lint`
- `npm run jsdoc`
