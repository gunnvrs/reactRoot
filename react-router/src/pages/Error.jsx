import React from "react";

const NotFoundPage = () => {
  return (
    <div>
       <covererror></covererror>
      <div
        style={{
          backgroundImage: "url('https://sv1.picz.in.th/images/2022/12/20/JzVn0v.jpg')",
          height: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            color: "rgb(90, 158, 178)",
            fontStyle: "oblique",
            fontSize: "140px",
            position: "absolute",
            top: "39.8%",
            left: "40%",
            transform: "translate(-50%, -50%)",
          }}
        >
          404
        </div>
        <div
          style={{
            color: "rgb(217, 236, 242)",
            fontStyle: "oblique",
            fontSize: "70px",
            position: "absolute",
            top: "48%",
            left: "33%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Page Not Found
        </div>
        <div
          style={{
            position: "absolute",
            top: "37%",
            left: "52%",
            textAlign: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "rgb(90, 158, 178)",
              color: "whitesmoke",
              fontStyle: "oblique",
              borderRadius: "8px",
              border: "none",
              padding: "15px 32px",
              fontSize: "28px",
              margin: "4px 2px",
              cursor: "pointer",
              transitionDuration: "0.4s",
            }}
            onClick={() => {
              window.history.back();
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
