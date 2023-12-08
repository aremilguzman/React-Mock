import React, { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../alerts";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Profile() {
  const url = "http://localhost:4000/profile";
  const [profile, setprofile] = useState([]);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    getProfiles();
  }, []);

  //Funcion para hacer la peticion get
  const getProfiles = async () => {
    try {
      const response = await axios.get(url);
      setprofile(response.data.profile || []);
    } catch (error) {
      console.log("Error al obtener perfiles:", error);
    }
  };

  //Funcion para abrir el modal de agregar profiles
  const openModal = (username, password, role) => {
    setusername("");
    setpassword("");
    setrole("");
  };

  //Funcion para validar que los campos no esten vacios antes de enviar el request
  const validate = () => {
    let parameters;
    let method;
    if (username.trim() === "") {
      showAlert("Escribe el nombre de usuario", "warning");
    } else if (password.trim() === "") {
      showAlert("Escribe una clave", "warning");
    } else if (role === "") {
      showAlert("Escribe el rol de usuario", "warning");
    } else {
      parameters = {
        username: username.trim(),
        password: password.trim(),
        role: role,
      };
      method = "POST";

      sendRequest(method, parameters);
    }
  };

  //Funcion para enviar al request al servidor y agregar nuevo profile
  const sendRequest = async (method, parameters) => {
    try {
      await axios({ method, url, data: parameters });
      showAlert("Perfil agregado con éxito", "success");
      document.getElementById("btnCerrar").click();
      getProfiles();
    } catch (error) {
      showAlert("Error en la solicitud", "error");
      console.error(error);
    }
  };

  //Funcion para eliminar profile, usando Swal para confirmar si desea eliminar el profile
  const deleteProfile = async (id) => {
    const MySwal = withReactContent(Swal);
    try {
      const result = await MySwal.fire({
        title: "¿Seguro desea eliminar el perfil con ID: " + id + " ?",
        icon: "question",
        text: "No se podrá revertir el cambio",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const params = { params: { id: id } };
        await axios.delete(`http://localhost:4000/profile/${id}`, params);
        getProfiles();
      } else {
        showAlert("El perfil NO fue eliminado", "info");
      }
    } catch (error) {
      console.error("Error al eliminar perfil:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
                {/*Boton de agregar nuevo profile*/}
              <button
                onClick={() => openModal()}
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalProfile"
              >
                <i className="fa-solid fa-circle-plus"></i> Agregar Perfil
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className="table-info">
                    <th className="">ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                {/*Funcion para hacer map en la BD y traer los datos a la tabla*/}
                <tbody className="table-group-dividier">
                  {profile.map((profileData) => (
                    <tr className="table-light" key={profileData.id}>
                      <td>{profileData.id}</td>
                      <td>{profileData.username}</td>
                      <td>{profileData.password}</td>
                      <td>{profileData.role}</td>
                      <td>
                        <Link
                          to={`/profile/${profileData.id}`}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-edit"></i> Editar
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProfile(profileData.id)}
                        >
                          <i className="fa-solid fa-trash"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*Modal para agregar profiles nuevos*/}
      <div id="modalProfile" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Agregar Perfil</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="profileUser"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="text"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-user-shield"></i>
                </span>
                <input
                  type="text"
                  id="role"
                  className="form-control"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validate()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
