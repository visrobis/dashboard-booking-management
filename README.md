# Samara Booking Management System

A full-stack booking management system built with **Next.js**, **Prisma ORM**, and **MySQL**. This application allows users to manage booking data with features like pagination, sorting, and CRUD operations. The system is designed for scalability, efficiency, and user-friendly interaction.

## Features
- **Booking List Management**: View, create, edit, and delete booking records.
- **Pagination**: Efficiently navigate through large datasets with pagination support.
- **Responsive Design**: Intuitive and user-friendly interface that works on all devices.
- **Backend API Integration**: Fetch and update data dynamically using Prisma and MySQL.
- **Type Safety**: Built with **TypeScript** to ensure robust and error-free code.

## Technologies Used
- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Prisma ORM
- **Database**: MySQL
- **Styling**: Tailwind CSS
- **Tools**: Postman (API testing), XAMPP (Local MySQL server)

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   
2. Navigate to the project directory:
- cd your-repo-name
## Install dependencies:
- npm install
## Set up the environment variables in a .env file:
- DATABASE_URL=mysql://user:password@localhost:3306/samara_booking_db
## Apply database migrations:
- npx prisma migrate dev
## Start the development server:
- npm run dev
## Open your browser and navigate to http://localhost:3000.
