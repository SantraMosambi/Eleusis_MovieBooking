// PaymentConfirmation.js
import React from "react";
import QRCode from "react-qr-code";

const PaymentConfirmation = ({
  name,
  selectedSlot,
  totalAmount,
  upiUrl,
  handleBack,
}) => {
  return (
    <div>
      <h4>Pay via UPI</h4>
      <QRCode value={upiUrl} />
      <p>Scan this QR with your UPI app to pay.</p>

      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Movie:</strong> {selectedSlot.movie_name}
      </p>
      <p>
        <strong>Show:</strong> {selectedSlot.day}, {selectedSlot.date} at{" "}
        {selectedSlot.show_time}
      </p>
      <p>
        <strong>Total Amount:</strong> ₹{totalAmount}
      </p>
      <p>
        <strong>UPI ID:</strong> 9969372757@paytm
      </p>

      <button style={{ marginTop: 10 }}>
        <a href={upiUrl} target="_blank" rel="noopener noreferrer">
          Open in UPI App
        </a>
      </button>
      <br />
      <button onClick={handleBack} style={{ marginTop: 10 }}>
        Back to Booking
      </button>
    </div>
  );
};

export default PaymentConfirmation;
