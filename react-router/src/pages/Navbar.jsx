import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [selected, setSelected] = useState("Itzmine");

  const handleClick = (event) => {
    setSelected(event.target.innerText);
  };

  return (
    <nav>
      <mainname>
        <Link
          to="/appup"
          style={{
            fontFamily: '-apple-system',
            textDecoration: "none",
            color: selected === "Itzmine" ? "black" : "grey",
          }}
          onClick={handleClick}
        >
          Itzmine
        </Link>
      </mainname>

      <mainfav>
        <Link
          to="/favorite"
          style={{
            fontFamily: '-apple-system',
            textDecoration: "none",
            color: selected === "Main" ? "black" : "grey",
          }}
          onClick={handleClick}
        >
          Main
        </Link>
      </mainfav>

      <mainarch>
        <Link
          to="/sharing"
          style={{
            fontFamily: '-apple-system',
            textDecoration: "none",
            color: selected === "Share" ? "black" : "grey",
          }}
          onClick={handleClick}
        >
          Share
        </Link>
      </mainarch>

      <mainalbum>
      <Link
          to="/myupload"
          style={{
            fontFamily: '-apple-system',
            textDecoration: "none",
            color: selected === "MyShare" ? "black" : "grey",
          }}
          onClick={handleClick}
        >
          MyShare
        </Link>
      </mainalbum>
    </nav>
  );
}

export default Navbar;
