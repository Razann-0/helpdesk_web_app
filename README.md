 **Helpdesk Web Application**

 ##Overview

This is a web-based Helpdesk application that enables users to submit support tickets and communicate with administrators. Admins can manage, update, and respond to tickets, providing efficient support and tracking.

 ##Features

* Secure user login and authentication via Supabase.
* Users can submit new tickets with detailed descriptions.
* Admin dashboard to view and manage all tickets.
* Admins can update ticket status: Open, In Progress, Closed.
* Threaded replies to tickets for clear communication.
* Role-based views: users see their own tickets; admins see all.

**Setup Instructions**

 ## Requirements
 
* Node.js and npm installed
* Supabase account and project with configured tables

##Running Locally

1. Clone this repository:
   
   git clone https://github.com/yourusername/helpdesk-web-app.git
   cd helpdesk-web-app
   

3. Install dependencies:
   
   npm install
   
5. Create a `.env` file in the root directory and add:

   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   

6. Start the development server:

   npm run dev
   

7. Open your browser to `http://localhost:3000` to access the app.


## Technologies

* React (with functional components and hooks)
* Supabase (Authentication and Database)
* Vite (Development server and bundler)
* CSS for styling

## Live Demo

Explore the deployed version of this app at:
[https://helpdesk-web-app-puce.vercel.app
](https://helpdesk-web-app-puce.vercel.app/)
## Test Credentials

Users (6 accounts)
1 admin + 5 staff

 **Admin:**
  Email: `admin@fakeeh.edu.sa`
  Password: `admin123`

 **Users:**
 ## User1:
  Email: `user1@fakeeh.edu.sa`
  Password: `pass123`

  ## User2:
  Email: `user2@fakeeh.edu.sa`
  Password: `pass123`

  ## User3:
  Email: `user3@fakeeh.edu.sa`
  Password: `pass123`
 
  ## User4:
  Email: `user4@fakeeh.edu.sa`
  Password: `pass123`

  ## User1:
  Email: `user5@fakeeh.edu.sa`
  Password: `pass123`
