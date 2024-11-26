# Authentication, Authorization, and Role-Based Access Control (RBAC) System

## Overview

This project implements a secure **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** system. The application allows users to register, log in, and log out securely. It assigns roles to users, and based on their role, grants them access to specific endpoints and resources.

### Roles Implemented:
1. **ADMIN**: Full access to all resources.
2. **USER**: Limited access, can access personal data and certain resources.
3. **MANAGER**: Can create new event registrations.

The system uses **JWT** (JSON Web Tokens) for authentication and session management, ensuring secure access control.

## Core Features

### Authentication
- **/api/auth/register** - Registers a new user (accessible by all users).
- **/api/auth/login** - Logs a user in and returns a JWT (accessible by all users).

### Authorization
- **/api/event-registration**:
  - **POST** - Only accessible by **MANAGER** to create new event registrations.
  - **GET** - Only accessible by **ADMIN** to retrieve all event registrations.
  
- **/api/users** - **GET** - Only accessible by **ADMIN** to get the list of all users.

- **/api/users/:id** - **GET** - Accessible by **ADMIN** and the **USER** themselves to access personal user data.

### Role-Based Access Control (RBAC)
- Access to specific routes is granted based on the user's assigned role:
  - **ADMIN**: Can access all endpoints.
  - **MANAGER**: Can create event registrations.
  - **USER**: Can access only their own data.

## System Requirements

- Node.js (LTS version)
- Docker (for containerization)
- MySQL database

## Installation

### Step 1: Clone the Repository

```bash
git clone <https://github.com/prakhar-8999/authentication>
cd <authentication>
```

## Step 2: Set up the Environment

Create a `.env` file in the root of the project directory and add the following environment variables:

```bash
DB_HOST=<your-database-host>
DB_PORT=<your-database-port>
DB_USERNAME=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_DATABASE=<your-database-name>
```


## Step 3: Import Predefined Roles

The predefined roles (ADMIN, USER, MANAGER) are provided in the `roles.sql` file. You can import the roles into your MySQL database by running the following command:

```bash
mysql -u <username> -p <database_name> < roles.sql
```



## Step 4: Docker Setup (Optional)

If you prefer to run the project using Docker, follow these steps:

1. Make sure you have **Docker** and **Docker Compose** installed on your machine.

2. **Build and start the project using Docker**:

    ```bash
    docker-compose up --build
    ```

    This will start the application and set up the necessary containers for your project.
