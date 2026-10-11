import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "State Analysis", path: "/state-analysis" },
    { name: "Crop Analysis", path: "/crop-analysis" },
    { name: "Yearly Trends", path: "/yearly-trends" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div
      style={{
        width: "240px",
        background: "#1b5e20",
        color: "white",
        minHeight: "100vh",
        paddingTop: "20px",
        position: "sticky",
        top: 0,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        Agri Analytics
      </h2>

      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          style={({ isActive }) => ({
            textDecoration: "none",
            color: "white",
            display: "block",
            padding: "15px 20px",
            background: isActive ? "#2e7d32" : "transparent",
            transition: "0.3s",
          })}
        >
          {({ isActive }) => (
            <motion.div
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {item.name}
            </motion.div>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;