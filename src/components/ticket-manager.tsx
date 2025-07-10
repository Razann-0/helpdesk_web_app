import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

// Define types
interface Ticket {
  id: number;
  title: string;
  description: string;
  created_at: string;
  email: string;
  status: string;
}

interface Reply {
  id: number;
  ticket_id: number;
  email: string;
  content: string;
  created_at: string;
}

function TicketManager({ session }: { session: Session }) {
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState<{ [key: number]: string }>({});

  const userEmail = session.user.email;
  const isAdmin = userEmail === "admin@fakeeh.edu.sa";

  // Fetch tickets
  const fetchTickets = async () => {
    const query = supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    const { data, error } = isAdmin
      ? await query
      : await query.eq("email", userEmail);

    if (!error && data) setTickets(data);
  };

  // Fetch replies
  const fetchReplies = async () => {
    const { data, error } = await supabase
      .from("replies")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) setReplies(data);
  };

  useEffect(() => {
    fetchTickets();
    fetchReplies();
  }, []);

  // Create new ticket
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from("tickets").insert({
      ...newTicket,
      email: userEmail,
      status: "Open",
    });
    if (!error) {
      setNewTicket({ title: "", description: "" });
      fetchTickets();
    }
  };

  // Update ticket status
  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from("tickets")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, status: newStatus } : ticket
        )
      );
    }
  };

  // Submit reply
  const handleReplySubmit = async (ticketId: number) => {
    const content = newReply[ticketId];
    if (!content) return;

    const { error } = await supabase.from("replies").insert({
      ticket_id: ticketId,
      email: userEmail,
      content,
    });

    if (!error) {
      setNewReply((prev) => ({ ...prev, [ticketId]: "" }));
      fetchReplies();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Helpdesk Web Application</h2>
      {isAdmin && <h2>Ticket Manager</h2>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={newTicket.title}
          onChange={(e) =>
            setNewTicket({ ...newTicket, title: e.target.value })
          }
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <textarea
          placeholder="Description"
          value={newTicket.description}
          onChange={(e) =>
            setNewTicket({ ...newTicket, description: e.target.value })
          }
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit">Submit Ticket</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tickets.map((t) => (
          <li
            key={t.id}
            style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}
          >
            <h3>{t.title}</h3>
            <h4>{t.description}</h4>
            <p>Email: {t.email}</p>
            <p>Status: {t.status}</p>
            <p>Submitted on: {new Date(t.created_at).toLocaleString()}</p>

            {isAdmin && (
              <div style={{ marginTop: 10 }}>
                <label htmlFor={`status-${t.id}`}>Change Status:</label>
                <select
                  id={`status-${t.id}`}
                  value={t.status}
                  onChange={(e) => updateStatus(t.id, e.target.value)}
                  style={{ padding: "0.4rem", marginTop: "0.5rem" }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            )}

            {/* Replies Section */}
            <div style={{ marginTop: 15 }}>
              <strong>Replies:</strong>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {replies
                  .filter((r) => r.ticket_id === t.id)
                  .map((r) => (
                    <li
                      key={r.id}
                      style={{
                        marginBottom: 8,
                        background: "#f9f9f9",
                        borderRadius: 5,
                        padding: 8,
                        borderLeft: "4px solid #888",
                      }}
                    >
                      <div style={{ fontWeight: "bold", color: "#333" }}>
                        {r.email}
                      </div>
                      <div style={{ marginTop: 4 }}>{r.content}</div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          marginTop: 4,
                        }}
                      >
                        {new Date(r.created_at).toLocaleString()}
                      </div>
                    </li>
                  ))}
              </ul>

              {/* Reply form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReplySubmit(t.id);
                }}
              >
                <textarea
                  placeholder="Write a reply..."
                  value={newReply[t.id] || ""}
                  onChange={(e) =>
                    setNewReply((prev) => ({
                      ...prev,
                      [t.id]: e.target.value,
                    }))
                  }
                  required
                  style={{ width: "100%", marginBottom: 5 }}
                />
                <button type="submit">Submit Reply</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default TicketManager;
