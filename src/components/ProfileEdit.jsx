import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showAlert } from "../alerts";

function ProfileEdit() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const { id } = useParams();
  const redirect = useNavigate();
  
  //Funcion para traer los datos del profile correspondiente al ID seleccionado
  useEffect(() => {
    const getProfile = async () => {
      try {
        const options = { params: { id: id } };
        const response = await axios.get(
          `http://localhost:4000/profile/${id}`,
          options
        );

        // Verificar si la respuesta contiene datos
        if (response.data.length > 0) {
          const profileData = response.data[0];
          setusername(profileData.username);
          setpassword(profileData.password);
          setrole(profileData.role);
        } else {
          // Manejo de error en caso de que se haga la consulta correctamente a la BD pero no devuelva datos
          console.log("No se encontraron datos para el perfil:", id);
        }
      } catch (error) {
        console.error("Error al obtener datos del perfil:", error);
      }
    };

    getProfile();
  }, [id]);

  //Funcion para editar profile
  const updateProfile = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/profile/${id}`, {
      id: id,
      username: username,
      password: password,
      role: role,
    });
    showAlert("Perfil editado con éxito", "success");
    redirect("/perfiles");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card">
              <div className="card-header bg-dark text-white">
                Editar Perfil
              </div>
              <div className="card-body">
                <form onSubmit={updateProfile}>
                  <label>Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    required={true}
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                  <label>Password</label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    required={true}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <label>Role</label>
                  <input
                    type="text"
                    id="role"
                    className="form-control"
                    required={true}
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  />
                  <button className="btn btn-success mt-3">Guardar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
