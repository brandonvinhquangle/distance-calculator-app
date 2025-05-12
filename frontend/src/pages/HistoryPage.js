import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/history")
      .then((res) => setHistory(res.data))
      .catch(() => setHistory([]));
  }, []);

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
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: "28px", margin: "0 0 6px 0" }}>
          Historical Queries
        </h2>
        <p style={{ margin: 0, color: "#666", fontSize: "16px" }}>
          History of the user's queries.
        </p>
      </div>

      {history.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20,
            fontSize: 16,
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e0e0e0" }}>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: 12,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Source Address
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: 12,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Destination Address
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: 12,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Distance in Miles
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: 12,
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Distance in Kilometers
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: 12 }}>{item.source}</td>
                <td style={{ padding: 12 }}>{item.destination}</td>
                <td style={{ padding: 12 }}>
                  {(item.distance_km * 0.621371).toFixed(2)}
                </td>
                <td style={{ padding: 12 }}>{item.distance_km.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No history found.</p>
      )}
    </div>
  );
}
