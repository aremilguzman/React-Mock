import React, { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../alerts";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Client() {
  const url = "http://localhost:4000/client";
  const [client, setclient] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");

  useEffect(() => {
    getClients();
  }, []);

  //Funcion para hacer la peticion get
  const getClients = async () => {
    try {
      const response = await axios.get(url);
      setclient(response.data.client || []);
    } catch (error) {
      console.log("Error al obtener clientes:", error);
    }
  };

  //Funcion para abrir el modal y situar el foco en el primer input (firstName)
  const openModal = (firstName, lastName, age, phone) => {
    setfirstName("");
    setlastName("");
    setage("");
    setphone("");

    window.setTimeout(function () {
      document.getElementById("firstname").focus();
    }, 500);
  };

  //Funcion para validar que los campos no esten vacios antes de enviar el request
  const validate = () => {
    const ageValue = parseInt(age, 10);
    let parameters;
    let method;
    if (firstName.trim() === "") {
      showAlert("Escribe el nombre del cliente", "warning");
    } else if (lastName.trim() === "") {
      showAlert("Escribe el apellido del cliente", "warning");
    } else if (isNaN(ageValue) || ageValue <= 0) {
      showAlert("Escribe una edad válida del cliente", "warning");
    } else if (phone === "") {
      showAlert("Escribe el telefono del cliente", "warning");
    } else {
      parameters = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: ageValue,
        phone: phone,
      };
      method = "POST";

      sendRequest(method, parameters);
    }
  };

  //Funcion para enviar al request al servidor y agregar nuevo cliente
  const sendRequest = async (method, parameters) => {
    try {
      await axios({ method, url, data: parameters });
      showAlert("Cliente agregado con éxito", "success");
      document.getElementById("btnCerrar").click();
      getClients();
    } catch (error) {
      showAlert("Error en la solicitud", "error");
      console.error(error);
    }
  };

  //Funcion para eliminar cliente, usando Swal para confirmar si desea eliminar el cliente
  const deleteClient = async (id) => {
    const MySwal = withReactContent(Swal);
    try {
      const result = await MySwal.fire({
        title: "¿Seguro desea eliminar cliente con ID: " + id + " ?",
        icon: "question",
        text: "No se podrá revertir el cambio",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const params = { params: { id: id } };
        await axios.delete(`http://localhost:4000/client/${id}`, params);
        getClients();
      } else {
        showAlert("Cliente NO fue eliminado", "info");
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
                {/*Boton de agregar cliente*/}
              <button
                onClick={() => openModal()}
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalClient"
              >
                <i className="fa-solid fa-circle-plus"></i> Agregar Cliente
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
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Telefono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                {/*Funcion para hacer map en la BD y traer los datos a la tabla*/}
                <tbody className="table-group-dividier">
                  {client.map((clientData) => (
                    <tr className="table-light" key={clientData.id}>
                      <td>{clientData.id}</td>
                      <td>{clientData.firstName}</td>
                      <td>{clientData.lastName}</td>
                      <td>{clientData.age}</td>
                      <td>{clientData.phone}</td>
                      <td>
                        <Link
                          to={`/client/${clientData.id}`}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-edit"></i> Editar
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteClient(clientData.id)}
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
      {/*Modal para agregar clientes nuevos*/}
      <div id="modalClient" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Agregar Cliente</label>
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
                  id="firstname"
                  className="form-control"
                  placeholder="Nombre"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="lastname"
                  className="form-control"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="age"
                  className="form-control"
                  placeholder="Edad"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  placeholder="Telefono"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
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

export default Client;
