import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setFetchError("");
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch contacts");
      }
      setContacts(data.data || []);
    } catch (error) {
      console.error(error);
      setFetchError(error.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactCreated = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleDeleteContact = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete contact");
      }
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert(error.message || "Error deleting contact");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
  <div className="app-header-inner">
    <div>
      <h1>
        <span className="logo-pill">CM</span>
        Contact Manager
      </h1>
      <p>Minimal MERN contact management dashboard</p>
    </div>
    <div className="app-header-right">
      <span className="status-dot" />
      <span>API status: live</span>
    </div>
  </div>
</header>


      <main className="app-main">
        <section className="form-section">
          <ContactForm apiBaseUrl={API_BASE_URL} onContactCreated={handleContactCreated} />
        </section>
        <section className="list-section">
  <div className="table-header-row">
    <h2>Contacts</h2>
    <span>{contacts.length} saved</span>
  </div>
  {loading && <p className="loading-text">Loading contacts...</p>}
  {fetchError && <p className="error-text">{fetchError}</p>}
  {!loading && !fetchError && (
    <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
  )}
</section>
      </main>

      <footer className="app-footer">
        <p>Made By Bambam Gupta❤️</p>
      </footer>
    </div>
  );
}

export default App;
