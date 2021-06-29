# NodeJS Global Mentoring Program [2021Q2 BY PM1]

## Task 7

## Setup
First of all, you need **Postgresql** DB installed on your machine.

First step. Please create the .env file in project root with content:
```sh
PORT="3000"
DB_HOST="127.0.0.1"
DB_USERNAME=[YOUR_DB_USER]
DB_PASSWORD=[YOUR_DB_PASSWORD]
TOKEN_SECRET=[YOUR_TOKEN_SECRET_STRING]
```
Initialize DB:
```sh
npm run init
```
Will be done:
- created the '**postgres_dev**' BD,
 - created **Users** and **Groups** tables in database,
- transferred prepared default users and groups from 'seeds' to the database.

Load dependencies:
```sh
npm i
```

## Start
To start an app you have to run:
```sh
npm start
```
A browser will open automatically at http://127.0.0.1:3000 with **login form**.

Please use **admin**/**admin** for login. Then the page will be reloaded with forms for **CRUD operations**.

## Test
For testing, you may run:
```sh
npm test
```
or
```sh
npx majestic
```
