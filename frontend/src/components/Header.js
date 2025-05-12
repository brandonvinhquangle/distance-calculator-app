import { Link, useLocation } from "react-router-dom";
import { FaCalculator, FaHistory } from "react-icons/fa";

export default function Header() {
  const { pathname } = useLocation();
  const isDistancePage = pathname === "/";

  const iconStyle = {
    marginLeft: 12,
    verticalAlign: "middle",
  };

  return (
    <header style={{ background: "#f1f1f1", padding: "24px 0", marginBottom: 32 }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 32px", // same horizontal padding as Distance/History pages
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "28px" }}>Distance Calculator</h1>
          <p style={{ margin: 0, fontSize: "16px", color: "#555" }}>
            Prototype web application for calculating the distance between addresses.
          </p>
        </div>
        <nav>
          <Link
            to={isDistancePage ? "/history" : "/"}
            style={{
              padding: "10px 16px",
              backgroundColor: isDistancePage ? "#333" : "#fff",
              color: isDistancePage ? "#fff" : "#333",
              textDecoration: "none",
              border: "1px solid #333",
              borderRadius: 6,
              fontWeight: "bold",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {isDistancePage ? (
              <>
                View Historical Queries <FaHistory style={iconStyle} />
              </>
            ) : (
              <>
                Back to Calculator <FaCalculator style={iconStyle} />
              </>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
