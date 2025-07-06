import React from "react";
import logo from "../../../assets/logo.PNG";

export default function Header() {
  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "10px 0",
        textAlign: "center",
        borderBottom: "2px solid #b11226",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <img src={logo} alt="logo" height="80" />
    </div>
  );
}
