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
            color: selected === "Favorite" ? "black" : "grey",
          }}
          onClick={handleClick}
        >
          Favorite
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
          to="/album"
          style={{
            fontFamily: '-apple-system',
            textDecoration: "none",
            color: selected === "Album" ? "black" : "grey",
          }}
          onClick={handleClick}
        >
          Album
        </Link>
      </mainalbum>
    </nav>
  );
}

export default Navbar;
