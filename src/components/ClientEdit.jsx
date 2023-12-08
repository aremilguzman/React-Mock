import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showAlert } from "../alerts";

function ClientEdit() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");
  const { id } = useParams();
  const redirect = useNavigate();
  
  //Funcion para traer los datos del cliente correspondiente al ID seleccionado
  useEffect(() => {
    const getClient = async () => {
      try {
        const options = { params: { id: id } };
        const response = await axios.get(
          `http://localhost:4000/client/${id}`,
          options
        );

        // Verificar si la respuesta contiene datos
        if (response.data.length > 0) {
          const clientData = response.data[0];
          setfirstName(clientData.firstName);
          setlastName(clientData.lastName);
          setage(clientData.age);
          setphone(clientData.phone);
        } else {
          // Manejo de error en caso de que se haga la consulta correctamente a la BD pero no devuelva datos
          console.log("No se encontraron datos para el cliente con ID:", id);
        }
      } catch (error) {
        console.error("Error al obtener datos del cliente:", error);
      }
    };

    getClient();
  }, [id]);

  //Funcion para editar cliente
  const updateClient = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/client/${id}`, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      age: age,
      phone: phone,
    });
    showAlert("Cliente editado con éxito", "success");
    redirect("/clientes");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card">
              <div className="card-header bg-dark text-white">
                Editar Cliente
              </div>
              <div className="card-body">
                <form onSubmit={updateClient}>
                  <label>Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    required={true}
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <label>Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    className="form-control"
                    required={true}
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                  <label>Edad</label>
                  <input
                    type="number"
                    id="edad"
                    className="form-control"
                    required={true}
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                  />
                  <label>Telefono</label>
                  <input
                    type="tel"
                    id="telefono"
                    className="form-control"
                    required={true}
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
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

export default ClientEdit;
