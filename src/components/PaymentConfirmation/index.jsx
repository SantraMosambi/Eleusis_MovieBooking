import React, { useState, useMemo } from "react";
import QRCode from "react-qr-code";

const PaymentConfirmation = ({
  name,
  phone,
  seats,
  selectedSlot,
  totalAmount,
  handleBack,
}) => {
  // const [confirmText, setConfirmText] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  // ✅ Memoize UPI URL so it's not recomputed on every render
  const upiUrl = useMemo(
    () =>
      `upi://pay?pa=xcolaco999@oksbi&pn=${encodeURIComponent(
        name
      )}&am=${totalAmount}&cu=INR`,
    [name, totalAmount]
  );

  const handleCopyUPI = () => {
    navigator.clipboard
      .writeText("xcolaco999@oksbi")
      .then(() => {
        alert("UPI ID copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy UPI ID");
        console.error(err);
      });
  };

  const handleConfirm = async () => {
    // if (confirmText.trim().toUpperCase() !== "PAID") {
    //   alert("Please type 'PAID' to confirm payment.");
    //   return;
    // }

    try {
      const now = new Date();

      // ✅ Improved time formatting with leading zeros
      const formatDate = (date) =>
        `${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")} ${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;

      const bookingTime = formatDate(now);

      // ✅ If the time is 6th July at 14:35:12, the ID should be:0607|143512

      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const bookingId = `${day}${month}|${hours}${minutes}${seconds}`;
      setBookingId(bookingId);

      // 1. Add booking to SheetDB
      await fetch("https://sheetdb.io/api/v1/k36yjrfnofu3v?sheet=booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            booking_id: bookingId,
            name,
            phone,
            slot_id: selectedSlot.slot_id,
            movie_name: selectedSlot.movie_name,
            seats_booked: seats,
            booking_time: String(bookingTime),
            paid: "Yes",
          },
        }),
      });

      // 2. Update available seats
      const updatedSeats = selectedSlot.seats_available - seats;
      await fetch(
        `https://sheetdb.io/api/v1/k36yjrfnofu3v/slot_id/${selectedSlot.slot_id}?sheet=shows`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              seats_available: updatedSeats.toString(),
            },
          }),
        }
      );

      setDownloadReady(true); // ✅ Allow confirmation message
    } catch (err) {
      console.error("Booking failed", err);
      alert("Something went wrong. Try again.");
    }
  };

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

      <p style={{ marginTop: "10px", color: "#ccc" }}>
        Use any UPI app to scan & pay.
      </p>

      {/* Booking Details */}
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
          <strong>Seats:</strong> {seats}
        </p>
        <p>
          <strong>Total:</strong> ₹{totalAmount}
        </p>
        <p>
          <strong>UPI ID:</strong> xcolaco999@oksbi
          <button
            onClick={handleCopyUPI}
            style={{
              marginLeft: "12px",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Copy
          </button>
        </p>
      </div>

      {/* External Link */}
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

      {/* Payment Confirmation */}
      {!downloadReady ? (
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <label
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={isPaymentDone}
              onChange={(e) => setIsPaymentDone(e.target.checked)}
              style={{ display: "none" }}
            />
            <span
              style={{
                position: "relative",
                display: "inline-block",
                width: "60px",
                height: "34px",
                backgroundColor: isPaymentDone ? "#4caf50" : "#ccc",
                borderRadius: "34px",
                transition: "background-color 0.3s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  height: "26px",
                  width: "26px",
                  left: isPaymentDone ? "30px" : "4px",
                  bottom: "4px",
                  backgroundColor: "white",
                  transition: "0.3s",
                  borderRadius: "50%",
                }}
              />
            </span>
            <span
              style={{ marginLeft: "12px", fontWeight: "bold", color: "#fff" }}
            >
              {isPaymentDone ? "Payment is done" : "Slide to confirm payment"}
            </span>
          </label>

          <button
            onClick={handleConfirm}
            disabled={!isPaymentDone}
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: isPaymentDone ? "#b11226" : "#777",
              color: "#fff",
              cursor: isPaymentDone ? "pointer" : "not-allowed",
              fontWeight: "bold",
            }}
          >
            Confirm
          </button>
        </div>
      ) : (
        <p style={{ marginTop: "20px", color: "#0f0" }}>
          ✅ Payment confirmed. Your booking ID is <strong>{bookingId}</strong>.
          You will receive booking details in few hours.
        </p>
      )}

      {/* Back Button */}
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
        ⬅ Back to Booking
      </button>
    </div>
  );
};

export default PaymentConfirmation;
