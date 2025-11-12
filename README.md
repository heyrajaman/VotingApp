# Voting Application

This is a backend-only Node.js application for a simple voting system, built using Express and MongoDB. It features user authentication (voter and admin roles) and full CRUD functionality for managing candidates, as well as the core voting logic.

## Features

  * **User Authentication:**
      * User (voter) and Admin signup.
      * Only one admin can exist.
      * Login for existing users (voter or admin) using Aadhar Card Number and password.
      * JWT (JSON Web Token) is generated upon signup and login for authenticating subsequent requests.
  * **User Management:**
      * Authenticated users can view their own profile.
      * Authenticated users can update their own password.
  * **Candidate Management (Admin Only):**
      * Admins can add a new candidate.
      * Admins can update an existing candidate's details.
      * Admins can delete a candidate.
  * **Voting System:**
      * Authenticated users (voters) can vote for a candidate.
      * Each user can only vote once (`isVoted` flag).
      * Users with the "admin" role are not allowed to vote.
      * View a list of all candidates (name and party).
      * View live vote counts, sorted in descending order.

## Technologies Used

  * **Node.js**
  * **Express.js:** Web application framework.
  * **MongoDB:** NoSQL database for storing user and candidate data.
  * **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
  * **bcrypt:** Library for hashing passwords.
  * **jsonwebtoken (JWT):** For generating and verifying access tokens.
  * **dotenv:** For managing environment variables.
  * **body-parser:** Middleware for parsing request bodies.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd votingapp
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create Environment Variables:**
    Create a `.env` file in the root directory. This file is ignored by Git.
    Copy the contents of `.env.example` into your new `.env` file and fill in the values:

    ```env
    PORT=3000
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

## How to Run

Once the setup is complete, you can start the server using the following command:

```bash
npm start
```

The server will start and listen on the port specified in your `.env` file (e.g., `listening on port 3000`).

## API Endpoints

### User Routes

Base Path: `/user`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Registers a new user (voter or admin). | No |
| `POST` | `/login` | Logs in an existing user. | No |
| `GET` | `/profile` | Gets the profile of the logged-in user. | Yes (JWT) |
| `PUT` | `/profile/password` | Updates the password of the logged-in user. | Yes (JWT) |

### Candidate Routes

Base Path: `/candidate`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Adds a new candidate. | Yes (Admin Role) |
| `PUT` | `/:candidateId` | Updates an existing candidate. | Yes (Admin Role) |
| `DELETE` | `/:candidateId` | Deletes a candidate. | Yes (Admin Role) |
| `POST` | `/vote/:candidateId` | Records a vote for a specific candidate. | Yes (JWT) |
| `GET` | `/vote/count` | Gets the live vote count, sorted. | No |
| `GET` | `/` | Gets a list of all candidates (name and party). | No |

## Project Structure

```
/
├── server.js         # Main server entry point
├── db.js             # MongoDB connection setup
├── package.json
├── .env.example      # Example environment variables
├── .gitignore
│
├── controllers/
│   ├── userController.js     # Logic for user routes
│   └── candidateController.js# Logic for candidate routes
│
├── models/
│   ├── user.js             # User Mongoose schema and model
│   └── candidate.js        # Candidate Mongoose schema and model
│
├── routes/
│   ├── userRoutes.js         # Defines user API endpoints
│   └── candidateRoute.js     # Defines candidate API endpoints
│
├── middleware/
│   └── auth.js             # JWT authentication and admin role check
│
└── utils/
    └── jwtHelper.js      # Utility function to generate JWT
```
