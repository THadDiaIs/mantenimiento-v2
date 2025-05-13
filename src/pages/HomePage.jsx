
import { useState } from "react";
import FormularioOrden from "../components/Orden";
import LoginVehiculos from "../components/Login";

const HomePage = ({handleLogin}) => {

    const [showLogin, setShowLogin] = useState(false);

    const buttonStyle = {
        height: '40px',
        backgroundColor: 'var(--accent)',
        color: 'var(--primary)',
        borderRadius: '1em',
        border: 'none',
        padding: '0.5em 1em',
        cursor: 'pointer',
        margin: '0 5px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'all 0.3s ease'
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'var(--primary)',
        color: 'var(--accent)',
        border: '2px solid var(--accent)'
    };

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
                                style={buttonStyle}
                            >
                                button 1
                            </button>
                            <button style={buttonStyle}>button2</button>
                            <button style={buttonStyle}>button3</button>
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
                                    cursor: "pointer"
                                }}
                            >
                                Login
                            </div>
                            {showLogin && (
                                <div style={{ position: "absolute", top: "2.4em", right: "0" }}>
                                    <LoginVehiculos handleLogin={handleLogin} />
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
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
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
                        className="search-fields"
                        style={{
                            minWidth: "80%",
                            height: "60px",
                            backgroundColor: "var(--secondary)",
                            display: "flex",
                            borderRadius: "1em",
                            overflow: "hidden"
                        }}
                    >
                        <input
                            type="date"
                            name="date"
                            id="date1"
                            style={{
                                flex: 1,
                                border: "none",
                                padding: "0 1em",
                                outline: "none"
                            }}
                        />
                        <input
                            type="date"
                            name="date"
                            id="date2"
                            style={{
                                flex: 1,
                                border: "none",
                                padding: "0 1em",
                                outline: "none"
                            }}
                        />
                        <input
                            type="date"
                            name="date"
                            id="date3"
                            style={{
                                flex: 1,
                                border: "none",
                                padding: "0 1em",
                                outline: "none"
                            }}
                        />
                        <input
                            type="date"
                            name="date"
                            id="date4"
                            style={{
                                flex: 1,
                                border: "none",
                                padding: "0 1em",
                                outline: "none"
                            }}
                        />
                    </div>
                </div>
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
                <FormularioOrden />
            </div>
        </main >
    );
};

export default HomePage;