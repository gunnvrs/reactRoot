import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      
        <mainname>
          {/* <Link to="/appup">ItzMine</Link> */}
        <Link to="/appup" style={{ textDecoration: "none", color: "black"  }}>
        Itzmine
        </Link>
        </mainname>

        <mainfav>
          {/* <Link to="/appup">Favorite</Link> */}
          <Link to="/appup" style={{ textDecoration: "none", color: "black"  }}>
        Favorite
        </Link>
        </mainfav>

        <mainarch>
          {/* <Link to="/sharing">Share</Link> */}
          <Link to="/sharing" style={{ textDecoration: "none", color: "black"  }}>
        Share
        </Link>
        </mainarch>
      
    </nav>
  );
}

export default Navbar;
