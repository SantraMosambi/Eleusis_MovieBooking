// BookingForm.js (with dummy data for development)
import React, { useEffect, useState } from "react";
import PaymentConfirmation from "../PaymentConfirmation";
import CustomCard from "../common/Card";

const MAX_SEATS = 20; // Max seats constant

const dummySlots = [
  {
    slot_id: "1",
    day: "Friday",
    date: "2025-07-18",
    show_time: "5:00 PM",
    movie_name: "Test Movie 1",
    seats_available: 16,
    pricePerSeat: 100,
    show_status: "Active",
  },
  {
    slot_id: "2",
    day: "Friday",
    date: "2025-07-18",
    show_time: "10:00 PM",
    movie_name: "Test Movie 2",
    seats_available: 12,
    pricePerSeat: 120,
    show_status: "Active",
  },
  {
    slot_id: "3",
    day: "Saturday",
    date: "2025-07-19",
    show_time: "1:00 PM",
    movie_name: "Test Movie 3",
    seats_available: 20,
    pricePerSeat: 150,
    show_status: "Active",
  },
];

export default function BookingForm() {
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay with dummy data
    setTimeout(() => {
      const activeSlots = dummySlots.filter(
        (slot) => slot.show_status === "Active"
      );
      setSlots(activeSlots);
      setSelectedSlotId(activeSlots[0]?.slot_id);
      setLoading(false);
    }, 500);
  }, [submitted]);

  const selectedSlot = slots.find((slot) => slot.slot_id === selectedSlotId);
  const totalAmount = selectedSlot ? selectedSlot.pricePerSeat * seats : 0;
  const upiUrl = `upi://pay?pa=xcolaco999@oksbi&pn=${name}&am=${totalAmount}&cu=INR`;

  const handleBooking = async () => {
    if (!name || seats < 1) return alert("Please fill all fields");

    // Dummy booking log
    console.log("Booking Data:", {
      booking_id: `B${Date.now()}`,
      name,
      slot_id: selectedSlot.slot_id,
      seats_booked: seats,
      booking_time: new Date().toISOString(),
      paid: "No",
    });

    const remainingSeats = selectedSlot.seats_available - seats;

    // Update dummy data locally
    const updatedSlots = slots.map((slot) =>
      slot.slot_id === selectedSlot.slot_id
        ? { ...slot, seats_available: remainingSeats }
        : slot
    );
    setSlots(updatedSlots);
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  if (loading) return <p>Loading shows...</p>;

  return (
    <div style={{ maxWidth: 450, margin: "auto" }}>
      <h2>Movie Seat Booking</h2>
      <CustomCard />
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
