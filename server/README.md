# FANCY TODO API

REST API built with Express and Mongoose

### List of basic routes:
Route | HTTP | Header(s) | Body | Code | Response | Description
----- | ---- | --------- | ---- | ---- | ------------ | -----------
`/`| GET | `none` | `none` | 200 | `App is running. . .` |

### List of users routes:
Route | HTTP | Header(s) | Body | Code | Response | Description
----- | ---- | --------- | ---- | ---- | ------------ | -----------
`/users/register` | POST | `none` | `email:String, password:String` | `201` | `message: success create a user` | 
 | | | | | `400` | `Validation Error`
 | | | | | `500` | `Internal server error`
`/users/login` | POST | `none` | `email:String, password:String` | `200` | `message: login success` |
 | | | | | `403` | `Invalid username / password`
 | | | | | `400` | `Validation Error`
 | | | | | `500` | `Internal server error`
`/users/oauth` | POST | `none` | `none` | `200` | `message: login via OAuth success` |
 | | | | | `500` | `Internal server error`

### List of todos routes:
Authenticaion required
Route | HTTP | Header(s) | Body | Code | Response | Description
----- | ---- | --------- | ---- | ---- | ------------ | -----------
`/todos` | GET | `token` | `none` | `200` | `todos data` | Get all user's todo
 | | | | | `500` | `Internal server error`
 `/todos/completed` | GET | `token` | `none` | `200` | `completed todos data` | Get all completed user's todo
 | | | | | `500` | `Internal server error`
 `/todos/uncomplete` | GET | `token` | `none` | `200` | `uncomplete todos data` | Get all uncomplete user's todo
 | | | | | `500` | `Internal server error`
  `/todos` | POST | `token` | `name:String, description:String, due_date:Date` | `201` | `message: success create a todo` | Create a new todo
 | | | | | `500` | `Internal server error`

Authenticaion and Authorization required
Route | HTTP | Header(s) | Body | Code | Response | Description
----- | ---- | --------- | ---- | ---- | ------------ | -----------
`/todos/:id` | GET | `token` | `none` | `200` | `todo data` | Get a todo
 | | | | | `401` | `User not authorized`
 | | | | | `500` | `Internal server error`
 `/todos/:id` | PATCH | `token` | `none` | `200` | `message: success update status` | Update status todo
 | | | | | `401` | `User not authorized`
 | | | | | `500` | `Internal server error`
 `/todos/:id` | DELETE | `token` | `none` | `200` | `message: success delete a todo` | Delete a todo
 | | | | | `401` | `User not authorized`
 | | | | | `500` | `Internal server error`

### Usage
Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```

Access the API via http://localhost:3000/
