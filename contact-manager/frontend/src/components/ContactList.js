// frontend/src/components/ContactList.js
import React from "react";

function ContactList({ contacts, onDeleteContact }) {
  if (!contacts || contacts.length === 0) {
    return (
      <div className="card">
        <p className="empty-state">
          No contacts yet. Create your first contact using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.message || "-"}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => onDeleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
