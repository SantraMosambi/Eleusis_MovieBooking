import React, { useEffect, useState } from "react";
import PaymentConfirmation from "../../components/PaymentConfirmation";
import CustomCard from "../../components/common/Card";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dummySlots from "../../components/data";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    setTimeout(() => {
      setSlots(dummySlots);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <p style={{ color: "#fff", textAlign: "center" }}>Loading shows...</p>
    );

  const getGridColumns = () => {
    if (isDesktop) return "repeat(4, 1fr)";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(1, 1fr)";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "repeating-linear-gradient(90deg, #b11226 0px, #8a0e1f 10px, #b11226 20px)",
        color: "#ffffff",
        padding: "24px",
        fontFamily: "'Cinzel', serif",
        paddingTop: "120px",
        boxSizing: "border-box",
      }}
    >
      {loading && <div className="curtain"></div>}

      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "2.5rem",
          textShadow: "0 0 10px #b11226",
          marginBottom: "32px",
          letterSpacing: "2px",
        }}
      >
        🎬 <span style={{ fontStyle: "italic" }}> Now Showing</span>
      </h1>
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.25rem",
          marginBottom: "40px",
          color: "#ccc",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        Lights. Camera. Book your seat.
      </h2>

      {/* {!submitted ? /( */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: getGridColumns(),
          gap: "24px",
          justifyItems: "center",
        }}
      >
        {slots.map((slot) => (
          <CustomCard
            key={slot.slot_id}
            {...slot}
            onClick={() =>
              navigate(`/book/${slot.slot_id}`, { state: { slot } })
            }
          />
        ))}
      </div>
      {/* ) : (
        <PaymentConfirmation
          name={name}
          selectedSlotId={selectedSlotId}
          totalAmount={seats * 100}
          upiUrl={"upi://pay?pa=xyz@upi"}
          handleBack={() => setSubmitted(false)}
        />
      )} */}
    </div>
  );
};

export default HomePage;
