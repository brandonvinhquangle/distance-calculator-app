import React, { useState } from "react";
import axios from "axios";
import { FaCalculator } from "react-icons/fa";

export default function DistanceForm({ setResult, setError }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [unit, setUnit] = useState("mi");
  const [distance, setDistance] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post(`http://localhost:8000/distance?unit=${unit}`, {
        source,
        destination,
      });
      setResult(res.data);
      if (unit === "km") setDistance(`${res.data.distance_km} km`);
      else if (unit === "mi") setDistance(`${res.data.distance_mi} mi`);
      else setDistance(`${res.data.distance_mi} mi / ${res.data.distance_km} km`);
    } catch (err) {
      setError("API error. Please check both addresses and try again.");
    }
  };

  const isDisabled = source.trim() === "" || destination.trim() === "";

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2.5fr 2.5fr 1fr 1fr",
          gap: 40,
          alignItems: "start",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Source Address</label>
          <input
            type="text"
            placeholder="Input address"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Destination Address</label>
          <input
            type="text"
            placeholder="Input address"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Unit</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label>
              <input
                type="radio"
                name="unit"
                value="mi"
                checked={unit === "mi"}
                onChange={(e) => setUnit(e.target.value)}
              />{" "}
              Miles
            </label>
            <label>
              <input
                type="radio"
                name="unit"
                value="km"
                checked={unit === "km"}
                onChange={(e) => setUnit(e.target.value)}
              />{" "}
              Kilometers
            </label>
            <label>
              <input
                type="radio"
                name="unit"
                value="both"
                checked={unit === "both"}
                onChange={(e) => setUnit(e.target.value)}
              />{" "}
              Both
            </label>
          </div>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Distance</label>
          <div
            style={{
              padding: 12,
              backgroundColor: "#eee",
              borderRadius: 4,
              minHeight: 48,
              lineHeight: "24px",
            }}
          >
            {distance || "—"}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <button
          type="submit"
          disabled={isDisabled}
          style={{
            maxWidth: "300px",
            padding: 14,
            backgroundColor: isDisabled ? "#ccc" : "#cc0000",
            color: "white",
            border: "none",
            borderRadius: 5,
            fontSize: 18,
            cursor: isDisabled ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Calculate Distance <FaCalculator style={{ marginLeft: 12 }} />
        </button>
      </div>
    </form>
  );
}
