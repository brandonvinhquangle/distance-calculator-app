import React, { useState } from "react";
import DistanceForm from "../components/DistanceForm";
import { BiSolidErrorAlt } from "react-icons/bi";

export default function DistancePage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div
      style={{
        maxWidth: 1440,
        margin: "40px auto",
        padding: "32px 32px",
        background: "#f9f9f9",
        borderRadius: 12,
      }}
    >
      <DistanceForm setResult={setResult} setError={setError} />

      {/* Error message box */}
      {error && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#fffaf0",
            border: "1px solid #cc0000",
            padding: 16,
            borderRadius: 8,
            maxWidth: 350,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{ marginTop: 2 }}>
            <BiSolidErrorAlt color="#cc0000" size={24} />
          </div>
          <div>
            <div style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Calculation failed
            </div>
            <div style={{ color: "#333", marginTop: 4 }}>
              Something went wrong and the calculation failed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
