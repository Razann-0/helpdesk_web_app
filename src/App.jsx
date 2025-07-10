import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth"; // Import authentication component
import TicketManager from "./components/ticket-manager"; // Import ticket management component
import { supabase } from "./supabaseClient"; // Import initialized Supabase client

function App() {
// State to track the current user session
const [session, setSession] = useState(null);

// Function to fetch the current session from Supabase
const fetchSession = async () => {
const currentSession = await supabase.auth.getSession(); // Get session from Supabase
console.log(currentSession); // For debugging
setSession(currentSession.data.session); // Store session in state
};

// Run once on component mount
useEffect(() => {
fetchSession(); // Check if user is already logged in

// Set up listener to update session on login/logout
const { data: authListener } = supabase.auth.onAuthStateChange(
  (_event, session) => {
    setSession(session); // Update state when auth changes
  }
);

// Cleanup listener on component unmount
return () => {
  authListener.subscription.unsubscribe();
};

}, []);

// Log out the user
const logout = async () => {
await supabase.auth.signOut(); // Sign out from Supabase
};

// Render
return (
<>
{session ? (
// If session exists, show ticket manager and logout button
<>
<button onClick={logout}>Log Out</button>
<TicketManager session={session} />
</>
) : (
// If not logged in, show login form
<Auth />
)}
</>
);
}

export default App;