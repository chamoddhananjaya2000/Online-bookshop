# Online Bookshop System

A full-stack online bookshop application built with Next.js, featuring user authentication, book management with Google Books API integration, and a complete shopping experience.

## Features

- **User Authentication**
  - Registration and login
  - JWT-based authentication
  - Profile management

- **Book Management**
  - Integration with Google Books API
  - Search, filter, and sort functionality
  - Detailed book information

- **Shopping Experience**
  - Shopping cart with persistence
  - Checkout process
  - Order history

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT, bcrypt
- **External API**: Google Books API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)
- Google Books API key

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/online-bookshop.git
   cd online-bookshop
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your MongoDB connection string, JWT secret, and Google Books API key

4. Set up the database:
   \`\`\`bash
   npx prisma generate
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application is ready to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable React components
- `/context`: React context providers
- `/lib`: Utility functions and API clients
- `/prisma`: Database schema and client

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `PUT /api/auth/profile`: Update user profile

### Book Endpoints

- `GET /api/books`: Get a list of books with filtering and pagination
- `GET /api/books/[id]`: Get details of a specific book

### Order Endpoints

- `POST /api/orders`: Create a new order
- `GET /api/orders`: Get a list of orders for the current user
- `GET /api/orders/[id]`: Get details of a specific order

## License

This project is licensed under the MIT License.
