import React, { useState, useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

function ContactForm({ apiBaseUrl, onContactCreated }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0 && formData.name && formData.email && formData.phone;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    const currentErrors = validate(formData);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      setSuccessMessage("");

      const res = await fetch(`${apiBaseUrl}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit contact");
      }

      onContactCreated(data.data);
      setFormData(initialState);
      setIsTouched({});
      setSuccessMessage("Contact submitted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert(error.message || "Error submitting contact");
    } finally {
      setSubmitting(false);
    }
  };

  const showError = (field) => isTouched[field] && errors[field];

  return (
    <div className="card">
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Name<span className="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter full name"
          />
          {showError("name") && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email<span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter email address"
          />
          {showError("email") && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone<span className="required">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter phone number"
          />
          {showError("phone") && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message (optional)</label>
          <textarea
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter a message"
          />
        </div>

        <button type="submit" disabled={!isFormValid || submitting} className="btn-primary">
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {successMessage && <p className="success-text">{successMessage}</p>}
      </form>
    </div>
  );
}

export default ContactForm;
