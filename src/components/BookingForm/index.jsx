// BookingForm.js
import React, { useEffect, useState } from "react";
import PaymentConfirmation from "../PaymentConfirmation";

const MAX_SEATS = 20; // Max seats constant

export default function BookingForm() {
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(
          "https://sheetdb.io/api/v1/swkzzoyhwcw49?sheet=shows"
        );
        let data = await res.json();
        // Filter only Active shows
        data = data.filter((slot) => slot.show_status === "Active");
        setSlots(data);
        setSelectedSlotId(data[0]?.slot_id);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
      }
    };
    fetchSlots();
  }, [submitted]);

  const selectedSlot = slots.find((slot) => slot.slot_id === selectedSlotId);
  const totalAmount = selectedSlot ? selectedSlot.pricePerSeat * seats : 0;
  const upiUrl = `upi://pay?pa=9969372757@paytm&pn=${name}&am=${totalAmount}&cu=INR`;

  const handleBooking = async () => {
    if (!name || seats < 1) return alert("Please fill all fields");

    await fetch("https://sheetdb.io/api/v1/swkzzoyhwcw49?sheet=booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          booking_id: `B${Date.now()}`,
          name,
          slot_id: selectedSlot.slot_id,
          seats_booked: seats,
          booking_time: new Date().toISOString(),
          paid: "No",
        },
      }),
    });

    const remainingSeats = selectedSlot.seats_available - seats;
    await fetch(
      `https://sheetdb.io/api/v1/swkzzoyhwcw49/slot_id/${selectedSlot.slot_id}?sheet=shows`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { seats_available: remainingSeats.toString() },
        }),
      }
    );

    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  if (loading) return <p>Loading shows...</p>;

  return (
    <div style={{ maxWidth: 450, margin: "auto" }}>
      <h2>Movie Seat Booking</h2>
      {!submitted ? (
        <>
          <label>Select Slot:</label>
          <select
            value={selectedSlotId}
            onChange={(e) => setSelectedSlotId(e.target.value)}
          >
            {slots.map((slot) => (
              <option key={slot.slot_id} value={slot.slot_id}>
                {`${slot.movie_name} - ${slot.day}, ${slot.date} at ${slot.show_time}`}
              </option>
            ))}
          </select>

          <p>
            <strong>Seats Available:</strong> {selectedSlot.seats_available}
          </p>
          <p>
            <strong>Price per Seat:</strong> ₹{selectedSlot.pricePerSeat}
          </p>

          <label>Your Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />

          <label>Number of Seats:</label>
          <input
            type="number"
            value={seats}
            min={1}
            max={Math.min(selectedSlot.seats_available, MAX_SEATS)}
            onChange={(e) => setSeats(Number(e.target.value))}
          />

          <p>
            <strong>Total:</strong> ₹{totalAmount}
          </p>
          <button onClick={handleBooking}>Book</button>
        </>
      ) : (
        <PaymentConfirmation
          name={name}
          selectedSlot={selectedSlot}
          totalAmount={totalAmount}
          upiUrl={upiUrl}
          handleBack={handleBack}
        />
      )}
    </div>
  );
}
