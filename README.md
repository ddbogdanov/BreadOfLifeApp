# CIS 4339 Project

## **The Project** 
**Sponsor**: Bread of Life

The web app provides the following functionalities to the Houston based organization Bread Of Life:
- Events Management
- Event Data Visualization
- Event Attendee Management/Overview
- Event RSVP Form

## **Team**
  * Dennis Bogdanov
  * Melyssa Navarro
  * Muaz Sajid 

## **npm Modules Needed**
  * express
  * mongoose
  * morgan
  * dotenv
  * mongoose-auto-increment

## **How To Run**
### General
First you will need to create the necessary .env files as follows:

**In the `../backend` directory**:
A .env file which contains the following:
- `MONGO_URL = <MONGODB CONNECTION STRING>`

**In the `../bread-of-life-app` directory**:
A .env file which contains the following:
- `VUE_APP_BASE_API_URL = <URL TO BACKEND API>` ex. "https://localhost/:####"

### Backend
In a terminal make sure you are under the `../backend` directory, then execute one of the following:

**With Nodemon**
`nodemon server.js`

**With node.js**
`node server.js`

### Frontend
In a terminal make sure you are under the `../bread-of-life-app` directory, then execute the following:
`npm run serve`

## Project Info
Technologies Used
- Node.js
- Express
- Mongoose
- Vue.js
- MongoDB
- Element Plus components

