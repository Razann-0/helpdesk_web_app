
# Helpdesk Web Application

## Overview

This application provides a simple helpdesk system where users can submit support tickets and communicate with administrators. It streamlines issue tracking and resolution by allowing users to open tickets and reply to conversations, while admins manage and update ticket statuses.

## Features

* Secure user authentication
* Role-based access (Admins and Users)
* Create, view, and manage tickets
* Admins can update ticket status (Open, In Progress, Closed)
* Comment threads on tickets for replies and discussions
* Real-time data fetching from Supabase backend

## Getting Started (Local Setup)

1. Clone the repository:

   git clone https://github.com/yourusername/helpdesk-web-app.git  
 
2. Change into the directory:

  cd helpdesk-web-app  
   
4. Install dependencies:

   npm install  
   
5. Configure your Supabase project and update the connection details in `supabaseClient.ts` or `.js`.

6. Start the development server:

   npm run dev  
   
7. Open your browser at `http://localhost:3000` to use the app.

## Technologies

* React with TypeScript
* Supabase for Authentication and Database
* Vite as the build tool
* CSS for styling

## Live Deployment

Try the live app here: [https://helpdesk-web-app-puce.vercel.app/](https://helpdesk-web-app-puce.vercel.app/)

## Test User Credentials

| Role  | Email                                             | Password |
| ----- | ------------------------------------------------- | -------- |
| Admin | [admin@fakeeh.edu.sa](mailto:admin@fakeeh.edu.sa) | admin123 |
| User1 | [user1@fakeeh.edu.sa](mailto:user1@fakeeh.edu.sa) | pass123  |
| User2 | [user2@fakeeh.edu.sa](mailto:user2@fakeeh.edu.sa) | pass123  |
| User3 | [user3@fakeeh.edu.sa](mailto:user3@fakeeh.edu.sa) | pass123  |
| User4 | [user4@fakeeh.edu.sa](mailto:user4@fakeeh.edu.sa) | pass123  |
| User5 | [user5@fakeeh.edu.sa](mailto:user5@fakeeh.edu.sa) | pass123  |
