import React, { useEffect, useState } from "react";
import "./contact.css";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const validateForm = (name, email, reason, message, phone) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!reason) {
      errors.reason = "Reason is required";
    }
    if (!message) {
      errors.message = "Message is required";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    }
    return errors;
  };

  const Handlermessage = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(name, email, reason, message, phone));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          reason: reason,
          message: message,
        }),
      };

      fetch("http://127.0.0.1:8000/api/messages", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "ok") {
            document.getElementById("myForm").reset();
            setSubmissionMessage("Your message has been sent successfully!");
          } else {
            setSubmissionMessage("There was an error sending your message.");
          }
          setIsSubmit(false);
        })
        .catch((error) => {
          console.error(error);
          setSubmissionMessage("There was an error sending your message.");
          setIsSubmit(false);
        });
    }
  }, [formErrors, isSubmit, name, email, reason, message, phone]);

  return (
    <div className="contact">
      <div className="left-contact">
        <form id="myForm" onSubmit={Handlermessage}>
          <label className="form-group">
            <input
              className={"form-control"}
              type="text"
              onChange={handleName}
              value={name}
            />
            <span>Your Name</span>
            <span className="border"></span>
          </label>
          {formErrors.name && <p className="error">{formErrors.name}</p>}

          <label className="form-group">
            <input
              className={"form-control"}
              type="email"
              onChange={handleEmail}
              value={email}
            />
            <span>Email</span>
            <span className="border"></span>
          </label>
          {formErrors.email && <p className="error">{formErrors.email}</p>}

          <label className="form-group">
            <input
              className={"form-control"}
              type="text"
              onChange={handlePhone}
              value={phone}
            />
            <span>Phone</span>
            <span className="border"></span>
          </label>
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}

          <label className="form-group">
            <input
              className={"form-control"}
              type="text"
              onChange={handleReason}
              value={reason}
            />
            <span>Your Reason</span>
            <span className="border"></span>
          </label>
          {formErrors.reason && <p className="error">{formErrors.reason}</p>}

          <label className="form-group">
            <textarea
              className={"form-control"}
              rows={"6"}
              onChange={handleMessage}
              value={message}
            />
            <span>Your Message</span>
            <span className="border"></span>
          </label>
          {formErrors.message && <p className="error">{formErrors.message}</p>}

          <button className="contanir65" type="submit">
            Submit
          </button>
          {submissionMessage && <p className="success">{submissionMessage}</p>}
        </form>
      </div>

      <div className="right-contact">
        <p className="contanir68">We’d love to hear from you</p>
        <p className="contanir77">developercareer@gmail.com </p>
        <p className="contanir69">Preferred method of communication </p>
        <form className="methods-form">
          <div className="method-input">
            <input
              type="radio"
              id="phone"
              name="preferd_method"
              value={"Phone"}
            />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="method-input">
            <input
              type="radio"
              id="email"
              name="preferd_method"
              value={"Email"}
            />
            <label htmlFor="email">Email</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
