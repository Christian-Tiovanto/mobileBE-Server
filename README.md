# Mobile Backend Server

This repository provides the backend server for a mobile application, set up with a MongoDB database and a Node.js server. Follow the instructions below to get the server up and running on your local environment.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher is recommended)
- [MongoDB](https://www.mongodb.com/try/download/community), with an instance running locally on port `27017` or configure a remote MongoDB URI in the `.env` file.

## Installation

1. **Clone the Repository**  
   Clone the project from GitHub and navigate to the project directory:

   ```bash
   git clone https://github.com/Christian-Tiovanto/mobileBE-Server.git
   ```
   ## Important
   clone the **cdn-db-service-account.json** to the root project, if you dont have the service-account, the app will not work 

## Running the Server
1. Start the server with the following command:
   ```bash
   npm run start
2. If the database connection is successful, you should see:
   ```bash
   DB Connection Successful. Listening on port 3006

## Available Scripts
- **Start Server**: Run the server in production mode:
  ```bash
  npm run starT


## Troubleshooting

  - Database Connection Issues: If you encounter errors connecting to MongoDB, ensure the MongoDB server is running.
  - Port Conflicts: If port 3006 is already in use, specify a different PORT in the .env file.
