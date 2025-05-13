import FormularioOrden from "./pages/Orden";
import LoginVehiculos from "./pages/Login";
import { useState } from "react";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const buttontyle = {
    height: "40px",
    backgroundColor: "var(--accent)",
    color: "var(--primary)",
    borderRadius: "1em",
    border: "none",
    padding: "0.5em 1em",
  }

  return (
    <main
      style={{
        backgroundColor: "var(--primary)",
      }}
    >
      <div
        className="illustration"
        style={{
          backgroundImage: "url(/rav-pexels.jpg)",
          width: "100vw",
          height: "90vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="content"
        style={{
          marginTop: "-90vh",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div
          className="nav-container"
          style={{
            width: "100%",
          }}
        >
          <nav
            style={{
              backgroundColor: "rgba(var(--tertiary-raw), 0.7)",
              height: "60px",
              width: "85%",
              borderRadius: "1em",
              margin: "1em auto 1em auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "1em",
              paddingRight: "1em",
            }}
          >
            <a href="#">Logo</a>
            <div>
              <button
                style={buttontyle}
              >
                button 1
              </button>
              <button style={buttontyle}>button2</button>
              <button style={buttontyle}>button3</button>
            </div>
            <div
              onMouseEnter={() => setShowLogin(true)}
              onMouseLeave={() => setShowLogin(false)}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--primary)",
                  borderRadius: "1em",
                  border: "none",
                  padding: "0.7em 1.3em",
                  "&:hover": {
                    backgroundColor: "var(--primary)",
                    color: "var(--accent)",
                  },
                }}
              >
                Login
              </div>
              {showLogin && (
                <div style={{ position: "absolute", top: "2.4em", right: "0" }}>
                  <LoginVehiculos />
                </div>
              )}
            </div>
          </nav>
        </div>

        <div
          style={{
            width: "100%",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <h1
            style={{
              marginLeft: "5%",
              fontSize: "7rem",
              color: "var(--primary)",
            }}
          >
            Cuida de tu <br /> Vehiculo
          </h1>
        </div>

        <div
          className="search-fields-container"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "150px",
          }}
        >
          <div
            className="serach-fields"
            style={{
              minWidth: "80%",
              height: "60px",
              backgroundColor: "var(--secondary)",
              display: "flex",
            }}
          >
            <input type="date" name="date" id="date" />
            <input type="date" name="date" id="date" />
            <input type="date" name="date" id="date" />
            <input type="date" name="date" id="date" />
          </div>
        </div>
      </div>
      <FormularioOrden />
    </main>
  );
};

export default App;
