# NodeJS Global Mentoring Program [2021Q2 BY PM1]

## Task 3

**Please note:** two subtasks are **merged into one** because of the way of implementation. This solution was discussed and **approved** by the program mentor.

## Setup
First of all, you need **Postgresql** DB installed on your machine.

Next step. Please create the .env file in project root with content:
```sh
PORT="3000"
DB_HOST="127.0.0.1"
DB_USERNAME=[YOUR_DB_USER]
DB_PASSWORD=[YOUR_DB_PASSWORD]
```
Create DB:
```sh
npm run db:create
```
Will be created the '**database_dev**' BD.

To create the **User** table in database you need to run:
```sh
npm run db:migrate
```
To transfer prepared default users from 'seeds' to the database you have to run:
```sh
npm run db:seed:all
```
To start an app you have to run:
```sh
npm start
```
A browser will open automatically at http://127.0.0.1:3000.

**Please note**, all CRUD operations **_available from UI_**.

## Issues:

Please contact me in case of any issues/questions.


May the Force be with you! :sunny:
