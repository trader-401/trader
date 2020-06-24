# 401 PROJECT/ 1

## Project Name : Trader APP


## Team Members:

- Ahmad Kmal
- Marah Joudeh
- Yazan aljamal
- yasmeen Adaileh

## LINKS:

- [heruko app](https://trader401.herokuapp.com/)
- [Trello Board](https://trello.com/b/YLFmPzGT/trader)
- [Software Requirements](software-Req.md)


## App Description:

Trader App is an app for users who want to see who's interested in buying or trading thier items , so that other users can explore the app and see all published posts from all users, also a user can chat with another user as well to ask for more information. 

## Wireframe:

![Wireframe](/assets/framework.PNG)

## Domain Modeling:

![Domain](/assets/domain.png)
![Domain1](/assets/domain1.png)
![Domain2](/assets/domain2.png)
![Domain3](/assets/domain3.png)
![Domain4](/assets/domain4.png)
![Domain5](/assets/domain5.png)


## Database Entity-Relationship-Diagram:

![Diagram](/assets/schema1.PNG)


## Routes

### POST `/signup` >>> no auth
* INPUT BODY:
 ```json
 {"username":"yourname",
 "password":"pass",
 "role":"admin"}
 ```
* OUTPUT: 
```json
{"token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."}
```

### POST `/signin` >>> basic auth
* INPUT BODY : -
* OUTPUT: 
```json
{"token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."}
```

### GET `/oauth` : sign in using google 

### POST `/login-with-facebook`: sign in using facebook 

### GET `/users` >>> basic
* INPUT BODY : -
* OUTPUT : get all users from database: 
```json
{
        "role": "admin",
        "favPost": [],
        "_id": "5ef34d4523fce100170f5f8e",
        "username": "marah",
        "password": "$2a$05$Gz3qpPQKqC4ChCYf9ogXl.7T2Nf5aAqcfB2LPMm0GVIBVmQxZYz9u",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmFoIiwiX2lkIjoiNWVmMzRkNDUyM2ZjZTEwMDE3MGY1ZjhlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTkzMDAzMzMzLCJleHAiOjE1OTMwODk3MzN9.IxSD1K1WTvhg13IL1ES8qftvz09Li1V193a0Hgj69YE",
        "posts": null,
        "id": "5ef34d4523fce100170f5f8e"
    },
    {
        "role": "user",
        "favPost": [],
        "_id": "5ef34d7823fce100170f5f90",
        "username": "myname",
        "password": "$2a$05$cyX3cp7fSRvMvQ2c/5plCe/AaTC9eD.hVYSmrysTl/GOpqJbotwby",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im15bmFtZSIsIl9pZCI6IjVlZjM0ZDc4MjNmY2UxMDAxNzBmNWY5MCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU5MzAwMzQ2NywiZXhwIjoxNTkzMDg5ODY3fQ.wXrB05AwUqo7KURvq_RjLlfDKEyIAPVa1E0gNP_NarU",
        "posts": null,
        "id": "5ef34d7823fce100170f5f90"
    }
```


### GET `/status` >>> bearer
* INPUT BODY: -
* OUTPUT:get all posts (published, pending, deleted) for admins only:
```json
 "count": 4,
    "results": [
        {
            "images": [],
            "status": "accepted",
            "deleted": false,
            "positiveRateUser": [],
            "negativeRateUser": [],
            "_id": "5ef3119a080d1d001711e31f",
            "title": "thinkpad E590 for sale",
            "description": "-15 inch -500GB harddesk -16Gb ram - core I5 ",
            "categories": "labtop",
            "username": "yazan",
            "comment": [],
            "__v": 0
        },
        {
            "images": [],
            "status": "accepted",
            "deleted": false,
            "positiveRateUser": [],
            "negativeRateUser": [],
            "_id": "5ef312b8080d1d001711e320",
            "title": "honda civic ",
            "description": "2000 in good condition 1.5L ABS ",
            "categories": "car",
            "username": "ahmad",
            "comment": [],
            "__v": 0
        }, .....
```


### GET `/status/:id` >>> bearer
* INPUT: -
* OUTPUT : get a certain post (published, pending, deleted) for admins only:
```json
[
    {
        "images": [],
        "status": "pending",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef312b8080d1d001711e320",
        "title": "honda civic ",
        "description": "2000 in good condition 1.5L ABS ",
        "categories": "car",
        "username": "ahmad",
        "comment": [],
        "__v": 0
    }
]
```


- PUT `/status/:id` >>> bearer
*  : update any post (accept, reject, delete) for admins only.
* INPUT: 
```json
 {
     "status": "accepted"
 }
 ```
* OUTPUT:
```json
[
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef312b8080d1d001711e320",
        "title": "honda civic ",
        "description": "2000 in good condition 1.5L ABS ",
        "categories": "car",
        "username": "ahmad",
        "comment": [],
        "__v": 0
    }
]
```

### GET `/all` >>> no auth
* INPUT: -`
* OUTPUT : get all posts (accepted only) for users:
```json
[
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef3119a080d1d001711e31f",
        "title": "thinkpad E590 for sale",
        "description": "-15 inch -500GB harddesk -16Gb ram - core I5 ",
        "categories": "labtop",
        "username": "yazan",
        "comment": [],
        "__v": 0
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef312b8080d1d001711e320",
        "title": "honda civic ",
        "description": "2000 in good condition 1.5L ABS ",
        "categories": "car",
        "username": "ahmad",
        "comment": [],
        "__v": 0
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef3521623fce100170f5f91",
        "title": "thinkpad E590 for sale",
        "description": "-15 inch -500GB harddesk -16Gb ram - core I5 ",
        "categories": "labtop",
        "username": "yazan",
        "comment": [],
        "__v": 0
    },.....
```


### DELETE `/search/:id` >>> bearer
* INPUT: -
* OUTPUT : allow the user to delete his own post:
```json
{
    "images": [],
    "status": "pending",
    "deleted": true,
    "positiveRateUser": [],
    "negativeRateUser": [],
    "_id": "5ef26433cd7b3330cc568366",
    "username": "marah",
    "title": "meme",
    "description": null,
    "categories": null,
    "comment": [],
    "__v": 0
}
```


### PUT `/user/:id` >>> bearer
* INPUT: 
```json
{
    "title": "other title"
}
```
* OUTPUT : allow the user to update his own post.

```json
{
    "images": [],
    "status": "pending",
    "deleted": true,
    "positiveRateUser": [],
    "negativeRateUser": [],
    "_id": "5ef26433cd7b3330cc568366",
    "username": "marah",
    "title": "other title",
    "description": null,
    "categories": null,
    "comment": [],
    "__v": 0
}
```

### POST `/user/:username` >>> bearer
* INPUT : allow the user to post a new post:
```json
{
"username":"marah",
"title":"iphone x",
"description":"new phone",
"categories":"mobiles"
}
```

* OUTPUT:
```json
{
    "images": [],
    "status": "pending",
    "deleted": false,
    "positiveRateUser": [],
    "negativeRateUser": [],
    "_id": "5ef35e99cb3bf91754b4f052",
    "username": "marah",
    "title": "iphone x",
    "description": "new phone",
    "categories": "mobiles",
    "comment": [],
    "__v": 0
}
```

### GET `/user/:username` >>> bearer/guest
* INPUT: -
* OUTPUT:  allow the signed in user to get all his posts (published, pending), allow the guest user to get all posts(published only) of a certain user (marah):
```json
[
    {
        "images": [],
        "status": "pending",
        "deleted": true,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef26433cd7b3330cc568366",
        "username": "marah",
        "title": "meme",
        "description": null,
        "categories": null,
        "comment": [],
        "__v": 0
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef26482cd7b3330cc568367",
        "username": "marah",
        "title": "note",
        "description": "s6",
        "categories": "cars",
        "comment": [],
        "__v": 0
    },.....
    
```

### GET `/searchBy/:categories` >>> no auth
* INPUT: 
* OUTPUT : allow the user to search for accepted posts regarding the categories (cars):
```json
[
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef263f0cd7b3330cc568362",
        "username": "ahmad",
        "title": "bmw",
        "description": "s6",
        "categories": "cars",
        "comment": [],
        "__v": 0
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef263f6cd7b3330cc568363",
        "username": "ahmad",
        "title": "ccc",
        "description": "s6",
        "categories": "cars",
        "comment": [],
        "__v": 0
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef26482cd7b3330cc568367",
        "username": "marah",
        "title": "note",
        "description": "s6",
        "categories": "cars",
        "comment": [
            {
                "_id": "5ef28d61d99edc467873ffbc",
                "username": "marah",
                "theComment": "wow"
            }
        ],
        "__v": 0
    }
]
```


### GET `/statusBy/:categories` >>> bearer
* INPUT: -
* OUTPUT: allow the admin to search for ALL posts regarding the categories (cars):
```json
[
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef263f0cd7b3330cc568362",
        "username": "ahmad",
        "title": "bmw",
        "description": "s6",
        "categories": "cars",
        "comment": [],
        "__v": 0
    },
    {
        "images": [],
        "status": "pending",
        "deleted": false,
        "positiveRateUser": [
            "marah"
        ],
        "negativeRateUser": [],
        "_id": "5ef26403cd7b3330cc568364",
        "username": "ahmad",
        "title": "gclass",
        "description": "s6",
        "categories": "cars",
        "comment": [
            {
                "_id": "5ef343c152737517d4f69078",
                "username": "marah",
                "theComment": "wow"
            }
        ],
        "__v": 0,
        "rate": 1
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef26482cd7b3330cc568367",
        "username": "marah",
        "title": "note",
        "description": "s6",
        "categories": "cars",
        "comment": [
            {
                "_id": "5ef28d61d99edc467873ffbc",
                "username": "marah",
                "theComment": "wow"
            }
        ],
        "__v": 0
    },
    {
        "images": [],
        "status": "pending",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef2648acd7b3330cc568368",
        "username": "marah",
        "title": "bm",
        "description": "s6",
        "categories": "cars",
        "comment": [],
        "__v": 0
    }
]
```

### GET `/addfav/:id` >>> bearer
* INPUT: -
* OUTPUT: allow the user to add a certain post to his favorites:
```json
"Post Added to your Fav"
```

### GET `/fav` >>> bearer
* INPUT: -
* OUTPUT : allow the user to get all posts in his favorites list:
```json
[
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef263f6cd7b3330cc568363",
        "username": "ahmad",
        "title": "ccc",
        "description": "s6",
        "categories": "cars",
        "comment": [],
        "__v": 0
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [],
        "negativeRateUser": [],
        "_id": "5ef26482cd7b3330cc568367",
        "username": "marah",
        "title": "note",
        "description": "s6",
        "categories": "cars",
        "comment": [
            {
                "_id": "5ef28d61d99edc467873ffbc",
                "username": "marah",
                "theComment": "wow"
            }
        ],
        "__v": 0
    },
    {
        "images": [],
        "status": "accepted",
        "deleted": false,
        "positiveRateUser": [
            "marah"
        ],
        "negativeRateUser": [],
        "_id": "5ef263d8cd7b3330cc568361",
        "username": "ahmad",
        "title": "iphone",
        "description": "s6",
        "categories": "mobiles",
        "comment": [
            {
                "_id": "5ef33a16c42b24306cff7105",
                "username": "marah"
            },
            {
                "_id": "5ef33a24c42b24306cff7107",
                "username": "marah",
                "theComment": "wow"
            }
        ],
        "__v": 0,
        "rate": 1
    }
]
```



### POST `/comment/:id` >>> bearer
* INPUT: 
```json
{
"theComment":"wow"
}
```
* OUTPUT:
```json
{
    "images": [],
    "status": "accepted",
    "deleted": false,
    "positiveRateUser": [],
    "negativeRateUser": [],
    "_id": "5ef263f0cd7b3330cc568362",
    "username": "ahmad",
    "title": "bmw",
    "description": "s6",
    "categories": "cars",
    "comment": [
        {
            "_id": "5ef3683fcb3bf91754b4f053",
            "username": "marah",
            "theComment": "wow"
        }
    ],
    "__v": 0
}
```


### POST `/rate/:id` >>> bearer
* INPUT: 
```json
{
"theRate":"+"
}
```
* OUTPUT:
```json
{
    "images": [],
    "status": "accepted",
    "deleted": false,
    "positiveRateUser": [
        "marah"
    ],
    "negativeRateUser": [],
    "_id": "5ef263f0cd7b3330cc568362",
    "username": "ahmad",
    "title": "bmw",
    "description": "s6",
    "categories": "cars",
    "comment": [
        {
            "_id": "5ef3683fcb3bf91754b4f053",
            "username": "marah",
            "theComment": "wow"
        }
    ],
    "__v": 0,
    "rate": 1
}
```


## Enviromental variables:

- `PORT`=3000
- `MONGODB_URI`=mongodb://localhost:27017/trader
- `SECRET`=Dealer5-401+

## Run the server

- `nodemon`


## Tests

- `npm test`
- `npm run lint`

![tests](/assets/test-run.PNG)

