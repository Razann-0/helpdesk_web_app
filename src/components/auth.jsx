import { useState } from "react";
import { supabase } from "../supabaseClient";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

   if (error) {
  if (error.message.toLowerCase().includes("invalid login credentials")) {
    setErrorMessage("Login error: Incorrect email or password. Please try again.");
  } else if (error.message.toLowerCase().includes("user not found")) {
    setErrorMessage("No account found with this email.Please try again.");
  } else {
    setErrorMessage(`Login failed. Reason: ${error.message}`);
  }
} else {
  setErrorMessage(""); // Clear the message on successful login
}
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Welcome to Helpdesk Web Application</h2>
      <br></br>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem" }}
        >
          Login
        </button>
      </form>
      {errorMessage && (
        <div style={{ color: "red", marginTop: "1rem",textAlign:"center" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

