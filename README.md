# Fundraising App (MERN Stack)

A full-stack crowdfunding platform built with the MERN stack (MongoDB, Express.js, React, Node.js).
Creators can start campaigns, donors can contribute, and admins approve campaigns for extra trust.

## Features (Current)

- JWT authentication with role-based access (Donor, Creator, Admin)
- Creator dashboard with campaign stats
- Multi-step campaign creation form with validation
- Campaign listing with filters and pagination
- Admin-only campaign approval workflow (pending → active)

## Tech Stack

- **Frontend:** React, React Router, Context API, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT-based authentication and authorization

## Project Structure

Fundraising App/
├── fundraising-frontend/ # React client
└── fundraising-backend/ # Express API

## Getting Started

### Backend

cd fundraising-backend
npm install
npm run dev

### Frontend

cd ../fundraising-frontend
npm install
npm run dev