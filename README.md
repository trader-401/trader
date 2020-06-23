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

- `/signup`
* POST: send username and password 

- `/signin`
* POST: send username and password with basic authentication.

- `/oauth`
* GET: sign using other providers .

- `/users`
* GET: get all users from database.

- `/status`
* GET: get all posts (published, pending, deleted) for admins only.

- `/status/:id`
* GET: get a certain post (published, pending, deleted) for admins only.

- `/status/:id`
* PUT : update any post (accept, reject, delete) for admins only.

- `/all`
* GET: get all posts (accepted only) for users.

- `/search/:id`
* GET: get the user a certain post of this ID .

- `/search/:id`
* DELETE: allow the user to delete his own post.

- `/user/:id`
* PUT: allow the user to update his own post.

- `/user/:username`
* POST: allow the user to post a new post.

- `/search/:categories`
* GET: allow the user to search for posts regarding the categories.

- `/user/:username`
* GET : allow the signed in user to get all his posts (published, pending), allow the guest user to get all posts of a certain user (published only).

- `/addfav/:id`
* GET : allow the user to add a certain posts to his favorites.

- `/fav`
* GET : allow the user to get all his favorite posts.


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
