import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage"; // You’ll create this
import { inject } from "@vercel/analytics"; // ✅ CORRECT";

inject();

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:slotId" element={<BookingPage />} />
      </Routes>{" "}
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
