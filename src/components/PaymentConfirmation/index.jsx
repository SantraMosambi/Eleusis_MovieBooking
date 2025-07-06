import React from "react";
import QRCode from "react-qr-code";

const PaymentConfirmation = ({
  name,
  phone,
  selectedSlot,
  totalAmount,
  handleBack,
}) => {
  const upiUrl = `upi://pay?pa=9969372757@paytm&pn=${name}&am=${totalAmount}&cu=INR`;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        background: "#111",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 0 14px rgba(177, 18, 38, 0.8)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#b11226" }}>Scan to Pay</h2>

      <QRCode value={upiUrl} bgColor="#fff" fgColor="#000" />

      <p style={{ marginTop: "10px" }}>Use your UPI app to scan and pay.</p>

      <div style={{ textAlign: "left", marginTop: "24px", color: "#fff" }}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Movie:</strong> {selectedSlot.movie_name}
        </p>
        <p>
          <strong>Show:</strong> {selectedSlot.day}, {selectedSlot.date} at{" "}
          {selectedSlot.show_time}
        </p>
        <p>
          <strong>Total:</strong> ₹{totalAmount}
        </p>
        <p>
          <strong>UPI ID:</strong> 9969372757@paytm
        </p>
      </div>

      <a
        href={upiUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "20px",
          backgroundColor: "#b11226",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Open in UPI App
      </a>

      <br />

      <button
        onClick={handleBack}
        style={{
          marginTop: "16px",
          backgroundColor: "#444",
          color: "#fff",
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Back to Booking
      </button>
    </div>
  );
};

export default PaymentConfirmation;
