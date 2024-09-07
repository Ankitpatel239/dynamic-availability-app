# Dynamic Availability and Event Scheduling System

## Overview
This project is a dynamic user availability and event scheduling system where users can manage their availability and admins can schedule sessions based on the available slots.

## Features
1. **User Registration & Login:**
   - Users can register using their email and set a password.
   - Secure login functionality is implemented using **JWT (JSON Web Token)** to ensure safe and authenticated sessions.
   
2. **Manage Availability:**
   - Users can add, edit, and delete availability slots for specific days or the entire week.
   - Supports custom time intervals (e.g., 30 minutes, hourly, etc.).

3. **Event Creation:**
   - Admins can view user availability and schedule events accordingly.
   - Supports one-on-one and multi-participant sessions.

4. **Dashboard:**
   - After logging in, users have access to the dashboard where they can manage availability, check events, and update account settings.
   
5. **Secure Sessions:**
   - The application uses **JWT tokens** for secure authentication and session management.

6. **Responsive Design:**
   - The UI is responsive and accessible across different devices.

## Technologies Used
- **Frontend:**
  - Next.js (React-based framework for server-side rendering and static site generation)
  - Tailwind CSS for styling
  - JWT for secure login and session management
  - React hooks for state management

- **Backend:**
  - **Next.js API Routes**: Inbuilt server functionality to handle backend logic.
  - **Mongoose**: ODM (Object Data Modeling) library used for interacting with MongoDB.
  - **MongoDB**: NoSQL database for storing user information, availability, and events.

## Prerequisites
1. Install [Node.js](https://nodejs.org/) on your machine.
2. Install MongoDB and ensure it’s running locally or use a MongoDB cloud service like MongoDB Atlas.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Ankitpatel239/dynamic-availability-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd dynamic-availability-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
    If you encounter issues, you can also use:
    ```bash
    npm install --legacy-peer-deps
    ```

## Running the Application
1. To run the development server:
    ```bash
    npm run dev
    ```

2. To build the project:
    ```bash
    npm run build
    ```

3. In case of build issues, you may also try:
    ```bash
    npm install --legacy-peer-deps
    npm run build
    ```

## Usage
1. **Login**:
   - Navigate to `http://localhost:3000/login` for login.
   
2. **Registration**:
   - Create a new account by visiting `http://localhost:3000/registration`.
   
3. **Dashboard**:
   - After login, access the dashboard at `http://localhost:3000/dashboard`.

4. **Manage Availability**:
   - Visit `http://localhost:3000/dashboard/available` to manage your availability.
   
5. **Create Event**:
   - Admins can create events at `http://localhost:3000/dashboard/event/createEvent`.
   
6. **Upcoming Events**:
   - Users can view their upcoming events at `http://localhost:3000/dashboard/event`.

## Routes Overview
- **Public Routes:**
  - `/login` - User login page
  - `/registration` - User registration page
  - `/about` - About the application
  - `/contact` - Contact information
  - `/terms` - Terms and conditions
  - `/privacy` - Privacy policy

- **Private Routes (Require Login):**
  - `/dashboard` - User dashboard
  - `/dashboard/settings` - Update account settings (change password, delete account, etc.)
  - `/dashboard/available` - Manage user availability (add/edit slots)
  - `/dashboard/event/createEvent` - Create events as admin
  - `/dashboard/event` - View upcoming events

## Authentication
The application uses **JWT** for secure authentication. After a successful login, the user is issued a token that is used to authenticate and access private routes. The token is securely stored and sent with every API request to ensure the user is authorized.

## Mongoose Models
1. **User Model**:
   - Stores user details like name, email, password (hashed), and availability slots.

2. **Availability Model**:
   - Captures user availability details including start time, end time, and duration.

3. **Event Model**:
   - Records event details, including participants, time slots, and any scheduling conflicts.

## Deployment
The project has been deployed using:
- **Frontend**: Vercel - [Deployed App](https://dynamic-availability-app.vercel.app)
- **Frontend**: Render - [Deployed App](https://dynamic-availability.onrender.com)
- **Repository** : GitHub - [File] (https://github.com/Ankitpatel239/dynamic-availability-app)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the contact Based.



-----------© 2024 Availability Scheduler | Ankit Web Developer All rights reserved.-------------------
