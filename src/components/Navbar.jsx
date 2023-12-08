import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <>
      <NavCont>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              C R U D
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor02"
              aria-controls="navbarColor02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Inicio
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/clientes">
                    Clientes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/productos">
                    Productos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/perfiles">
                    Perfiles
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </NavCont>
    </>
  );
}

export default Navbar;

const NavCont = styled.div`
  a {
    font-size: 20px;
  }
  .navbar-brand {
    font-size: 25px;
    font-weight: 800;
  }
`;
