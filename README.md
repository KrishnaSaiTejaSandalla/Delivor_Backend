# Delivor Backend

This directory contains the backend code for the **Delivor** project, which is designed to handle the server-side logic and APIs.

## Overview

The backend is built using **Node.js** and **Express.js** and uses **MongoDB** as the database. It follows an MVC (Model-View-Controller) pattern for better organization and scalability.

## Folder Structure

- `controllers/` - Contains logic for handling requests and responses.
- `models/` - Defines the database schemas and models.
- `routes/` - Defines the API endpoints and routes.
- `middlewares/` - Contains middleware functions such as authentication.
- `.vscode/` - Visual Studio Code settings (optional).
- `index.js` - The main entry point of the backend server.
- `package.json` and `package-lock.json` - Project dependencies and configurations.

## Features

- User and vendor authentication with JWT.
- CRUD operations for products, firms, and vendors.
- Middleware for token verification and error handling.
- Organized modular structure for ease of maintenance.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
