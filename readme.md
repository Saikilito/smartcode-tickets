<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="https://i.ibb.co/Lx77zgM/logo.jpg" alt="logo"  height="80">    
  </a>

  <h1 align="center">
	Smartcode Tickets Manager
  </h1>

  <p align="center">
    Dynamically rendering a simple manager of users and tickets CRUD
    <br />
	  🖊️    
    🐞
    <a href="https://github.com/Saikilito/smartcode-tickets/">Report a Bug</a>
    🙋‍♂
    <a href="https://github.com/Saikilito/smartcode-tickets/">Request Feature</a>
  </p>
</p>
    <p align="center">
    <img src="https://i.ibb.co/fGtx5ng/welcome.jpg"/>
    </p>

# The Project

The project consists of an application that discriminates between administrators and users, between them they can request tickets but only the adprministrator can edit users, edit, delete tickets and even other users.

Based in these requirements

- Async calls to external server
- Data Structures
- Object Oriented Programming
- ES6 syntax
- Export/import ES6+ notation

# Features

- Basic VanillaJS app with a single script or few commands
- ReactJS Framework
- Nodejs based on typescript
- TypeORM ORM for connect a Mysql
- connected an API using `async/await`
- Bootstrap 4
- Mobile Optimized

# Built With

- Create React App (CRA)
- React-Router-Dom
- `yarn`
- `vscode` with prettier extension
- Windows 10
- Love and Passion for code

# Live Demo

Comming Soon

<p align="center">
    <img src="https://i.ibb.co/L0hsPZ9/mobile-2.jpg"/>
    <img src="https://i.ibb.co/ZMr5r7C/window-2.jpg"/>
    <img src="https://i.ibb.co/yXrqmBS/c1.jpg"/>
</p>

## Prerequisites

- `yarn` 1.21.1 +
- `node` 11.15 +
- `mysql +8.0`
- A Text Editor like VSCode
- A browser like Firefox or Chrome

## Quick Start

Please follow carefully the following steps

1 - In your Mysql create and use a new database

```bash
create database smartcode
use database smartcode
```

2 - git clone

```bash
git@github.com:Israel-Laguan/movie-discover.git
```

3- install and run server

```bash
cd smartcode-tickets/server
yarn && yarn start
```

4- insert data seeds in your database

```bash
insert into tipo_usuario (nombre) values ("admin");
insert into tipo_usuario (nombre) values ("user");
```

5- install and run client

```bash
cd smartcode-tickets/client
yarn && yarn start
```

Then open [http://localhost:4000/](http://localhost:4000/) to see the app.
