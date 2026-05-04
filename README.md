# Coinbase Clone Backend

This repository contains the backend code for the Coinbase Clone project.

## Links

- **GitHub Frontend Repository**: [https://github.com/sedegah/CoinBase-Clone](https://github.com/sedegah/CoinBase-Clone)
- **Deployed Backend API Link**: [https://coinbase-clone-9ssk.onrender.com/](https://coinbase-clone-9ssk.onrender.com/)
- **Deployed Frontend App Link**: [https://sedegah22237205.netlify.app/](https://sedegah22237205.netlify.app/)

## How It Works

This backend application is built using **Node.js** and **Express.js**, providing a RESTful API for the Coinbase Clone project. 

### Key Technologies & Features
- **Database**: Uses **MongoDB** (via **Mongoose**) to securely store application data.
- **Authentication**: Implements user authentication using **JSON Web Tokens (JWT)** and **bcryptjs** for secure password hashing.
- **Routing**: 
  - `/api/auth`: Handles user registration, login, and token issuance.
  - `/api/crypto`: Manages cryptocurrency-related endpoints and logic.
- **Security & Configuration**: Configured with **CORS** to seamlessly connect with the deployed frontend and uses **dotenv** for environment variable management.

To run this locally, you'll need to set up a `.env` file with your `MONGODB_URI` and JWT secrets, install dependencies with `npm install`, and start the dev server via `npm run dev`.
