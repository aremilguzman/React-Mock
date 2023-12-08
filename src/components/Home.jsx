import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Home() {
  return (
    <>
      <HomeCont>
        <div className="container">
          <div className="row justify-content-center mt-5">
            <h2>Datos a consultar</h2>
            <div className="col-md-3">
              <Link to="/clientes">
                <img
                  src="https://previews.dropbox.com/p/thumb/ACElx6sGB5TPe8F7cXKFk0a7dFv3B0mYuWll6XGwaT-k2C7SvKpZfAaZGrAviGKEDiqCP3Er1xy3QvexjVz-RwV6YTjS84bN5YD8AVoqYAJOhfEU2g8p88LaXa2Yq-FSbjyJZ_rHUG9uprnskeDfzRUtDJhndXoWP46HfzBLNQB6xERpoOshIvodHG2ifuMFFv1N2ntE3PA3C0mFgnCBFAvBo5JmwQvUz4Wc_7nbQIoBkPNzxjmDEEwO-WqMa_VPJk3AFhQ4-GqlclsYD9WHpHOARSIwr-MFiGciJQZzGw2q_odx_PHmO0kmbZ0WkTgatxWaoKSnP1ICYCIhoO1_3bWH/p.png"
                  alt=""
                  className="img-fluid imgOk"
                />
                <figcaption>Clientes</figcaption>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/productos">
                <img
                  src="https://previews.dropbox.com/p/thumb/ACHBiarIXSc7Ls8j3m6R7JebOCL-1FGDAGHko51xYKk-eCL9nm34EHeyG1CenD68mbQdBLcz3CG1W1-L7uURuUuPjAluvmyBzAvrLMmUC-WihyHA38kopB9TZCZ4rbYixL4FMNhxJ62MpgJENPT7vuLCC247TQ_Luhmt9bimCM0PwCo2GUbnCfys1AsW6wPDWfDaNhIIsOowFnYNpx3j-gM6ADzU0ITSyEKQ_pV0mlvDdDtkXC_3bOmr3xKvza6jZ7_KFxxBtdu8n8I7c29xcYv4uY3v33CGSjYp3WhEmYInoWcuVW54yPa8wQxwX2zKYJ9SKyWl6HAMLkkMHbdijrTc/p.png"
                  alt=""
                  className="img-fluid imgOk"
                />
                <figcaption>Productos</figcaption>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/perfiles">
                <img
                  src="https://previews.dropbox.com/p/thumb/ACEpgWovADZILY0auoHPua5em-oCJA6QgEM12dOEnopvsIBnFf89y8LiCiXgL1Jb5A-46_meqRt_SOFHitHG3bdOOUCQkjVbqCw6jXQRvhAcGGQBiH6NGC5wHUwSRNByiGa4k1NOoK-J70Xu5dm03Sp-Tn8KsDQAThl8YL1kuc_hS7HUgstQbp76x8XpvEw9i6pIQRrmZ8shKpKhnLEUFnfMUMllsRx0_x7T8gSgOTujCvxuizY8ioCuvtnGuMrzFCiwjyhAYFPnKqZw0WDQXHr8dE980Jo1IcmxHJnMhh-syn8oetKUNppVtNyIa8e3ydV31i76bPrFDGepGXsWqg88/p.png"
                  alt=""
                  className="img-fluid imgOk"
                />
                <figcaption>Perfiles</figcaption>
              </Link>
            </div>
          </div>
        </div>
      </HomeCont>
    </>
  );
}

export default Home;

const HomeCont = styled.div`
  justify-content: center;
  text-align: center;
  padding-top: 50px;

  .imgOk {
    height: 130px;
    width: 130px;
  }
  .imgOk:hover {
    box-shadow: 5px 10px 20px 1px rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transition: all 0.4s linear;
  }
  figcaption {
    font-size: 20px;
    font-weight: 600;
  }

  img {
    margin-top: 50px;
  }
`;
