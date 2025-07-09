import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PaymentConfirmation from "../../components/PaymentConfirmation";

const BookingPage = () => {
  const { slotId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [slot, setSlot] = useState(location.state?.slot || null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [seats, setSeats] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!slot) {
      const fetchSlot = async () => {
        try {
          const res = await fetch(
            `https://sheetdb.io/api/v1/k36yjrfnofu3v/search?slot_id=${slotId}&sheet=shows`
          );
          const data = await res.json();
          if (data.length > 0) setSlot(data[0]);
        } catch (error) {
          console.error("Error fetching slot:", error);
        }
      };
      fetchSlot();
    }
  }, [slot, slotId]);

  if (!slot)
    return (
      <p
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: "150px",
          fontSize: "1.2rem",
        }}
      >
        Loading slot details...
      </p>
    );

  const totalAmount = seats * parseInt(slot.pricePerSeat);

  const handleSubmit = () => {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!name.trim() || seats < 1) {
      alert("Please enter your name and select valid seats.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitted(true);
  };

  const handleBackToBooking = () => setSubmitted(false);
  const handleBackToHome = () => navigate("/");

  const incrementSeats = () => {
    if (seats < slot.seats_available) setSeats((prev) => prev + 1);
  };

  const decrementSeats = () => {
    if (seats > 1) setSeats((prev) => prev - 1);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #000, #1a0004)",
        color: "#fff",
        padding: "40px 20px",
        minHeight: "100vh",
        fontFamily: "'Cinzel', serif",
        paddingTop: "150px",
        boxSizing: "border-box",
      }}
    >
      {!submitted ? (
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "#111",
            padding: "32px",
            borderRadius: "12px",
            boxShadow: "0 0 14px rgba(177, 18, 38, 0.8)",
          }}
        >
          <h1 style={{ color: "#b11226", textAlign: "center" }}>
            🎟️ {slot.movie_name}
          </h1>

          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>Date:</strong> {slot.date}
            </p>
            <p>
              <strong>Time:</strong> {slot.show_time}
            </p>
            <p>
              <strong>Available:</strong> {slot.seats_available} seats
            </p>
            <p>
              <strong>Price:</strong> ₹{slot.pricePerSeat} per seat
            </p>
          </div>

          <hr style={{ borderColor: "#b11226", margin: "24px 0" }} />

          {/* Name & Phone Fields Side by Side */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 50%" }}>
              <label>
                <span style={{ display: "block", marginBottom: "6px" }}>
                  Your Name:
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid #b11226",
                    backgroundColor: "#222",
                    color: "#fff",
                  }}
                />
              </label>
            </div>

            <div style={{ flex: "1 1 50%" }}>
              <label>
                <span style={{ display: "block", marginBottom: "6px" }}>
                  Phone Number:
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid #b11226",
                    backgroundColor: "#222",
                    color: "#fff",
                  }}
                />
              </label>
            </div>
          </div>

          {/* Counter for seat selection */}
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  fontSize: "1rem",
                  color: "#fff",
                  marginRight: "12px",
                }}
              >
                Number of Seats:
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={decrementSeats}
                  disabled={seats <= 1}
                  style={{
                    padding: "8px 14px",
                    fontSize: "18px",
                    borderRadius: "4px",
                    backgroundColor: "#b11226",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>

                <span
                  style={{
                    fontSize: "1.2rem",
                    minWidth: "24px",
                    textAlign: "center",
                  }}
                >
                  {seats}
                </span>

                <button
                  onClick={incrementSeats}
                  disabled={seats >= slot.seats_available}
                  style={{
                    padding: "8px 14px",
                    fontSize: "18px",
                    borderRadius: "4px",
                    backgroundColor: "#b11226",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "28px",
              backgroundColor: "#b11226",
              color: "#fff",
              padding: "14px 24px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            Proceed to Pay ₹{totalAmount}
          </button>

          <button
            onClick={handleBackToHome}
            style={{
              marginTop: "16px",
              backgroundColor: "#444",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            ⬅ Back to Movie Selection
          </button>
        </div>
      ) : (
        <PaymentConfirmation
          name={name}
          phone={phone}
          selectedSlot={slot}
          seats={seats}
          totalAmount={totalAmount}
          upiUrl={`upi://pay?pa=xcolaco999@oksbi&pn=${name}&am=${totalAmount}&cu=INR`}
          handleBack={handleBackToBooking}
        />
      )}
    </div>
  );
};

export default BookingPage;
