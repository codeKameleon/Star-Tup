# Star Tup - Realtime chat application

As a part of our BeCode training, this fullstack project is a mobile-first chat app that allow users to create conversations and send messages in realtime with other registered users.

The app is hosted on [Heroku](https://becode-star-tup.herokuapp.com/)

## Technology Stack
|  |
| ------ | 
| MongoDB |
| Express |
| NodeJS |
| Socket.io |
| React |
| Tailwind |

## API Documentation

### Register
| Method | Endpoint | Param | Body | Description 
| --- | --- | --- | ---  | ---
| GET | /api/account/register | None | [ email, firstname, lastname, password, birthdate, motto(optional) ] | Register new user

### Login
| Method | Endpoint | Param | Body | Description |
| --- | --- | --- | ---  | ---
| GET | /api/account/login | None | [ email, password ] | Log user

### Logout
| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| GET | /api/account/logout | None | None | Log out user

### Users
| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| GET | /api/users | None | None | Get all users

| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| GET | /api/users/:id | id | None | Get one user

| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| PUT | /api/users/:id | id | [ email (optional), password (optional), motto (optional) ] | Update user's infos

### Conversations
| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| GET | /api/conversations | None | None | Get all registered user's conversations 

| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| POST | /api/conversations/ | None | [ receiverId ] | Create new conversation

| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| GET | /api/conversations/:id | id | None | Get one conversation

### Messages
| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| POST | /api/messages/:conversationId | conversationId | [ content ] | Create new message 

| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | ---
| GET | /api/messages/:conversationId  | conversationId | None | Get all messages

| Method | Endpoint | Param | Body | Description
| --- | --- | --- | ---  | --- 
| GET | /api/messages/:conversationId/last  | conversationId | None | Get last message from conversation

#### Authors
- [Axel Tavormina](https://github.com/codeKameleon) - Backend
- [Dylan Richardson](https://github.com/Dyl-Richardson) - Frontend
