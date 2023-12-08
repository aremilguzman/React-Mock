import React, { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../alerts";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Products() {
  const url = "http://localhost:4000/product";
  const [product, setproduct] = useState([]);
  const [productName, setproductName] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  //Funcion para hacer la peticion get
  const getProducts = async () => {
    try {
      const response = await axios.get(url);
      setproduct(response.data.product || []);
    } catch (error) {
      console.log("Error al obtener productos:", error);
    }
  };

  //Funcion para abrir el modal de y situar el foco en el primer input (productName)
  const openModal = (productName, price, stock) => {
    setproductName("");
    setprice("");
    setstock("");

    window.setTimeout(function () {
      document.getElementById("productName").focus();
    }, 500);
  };

  //Funcion para validar que los campos no esten vacios antes de enviar el request
  const validate = () => {
    let parameters;
    let method;
    if (productName.trim() === "") {
      showAlert("Escribe el nombre del producto", "warning");
    } else if (price.trim() === "") {
      showAlert("Escribe el precio del producto", "warning");
    } else if (stock === "") {
      showAlert("Escribe la cantidad de productos en stock", "warning");
    } else {
      parameters = {
        productName: productName.trim(),
        price: price.trim(),
        stock: stock,
      };
      method = "POST";

      sendRequest(method, parameters);
    }
  };

  //Funcion para enviar al request al servidor y agregar nuevo producto
  const sendRequest = async (method, parameters) => {
    try {
      await axios({ method, url, data: parameters });
      showAlert("Producto agregado con éxito", "success");
      document.getElementById("btnCerrar").click();
      getProducts();
    } catch (error) {
      showAlert("Error en la solicitud", "error");
      console.error(error);
    }
  };

  //Funcion para eliminar un producto, usando Swal para confirmar si desea eliminar el producto
  const deleteProduct = async (sku) => {
    const MySwal = withReactContent(Swal);
    try {
      const result = await MySwal.fire({
        title: "¿Seguro desea eliminar el producto con Sku: " + sku + " ?",
        icon: "question",
        text: "No se podrá revertir el cambio",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const params = { params: { sku: sku } };
        await axios.delete(`http://localhost:4000/product/${sku}`, params);
        getProducts();
      } else {
        showAlert("Producto NO fue eliminado", "info");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
                {/*Boton de agregar producto*/}
              <button
                onClick={() => openModal()}
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalProduct"
              >
                <i className="fa-solid fa-circle-plus"></i> Agregar Producto
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
                    <th className="">SKU</th>
                    <th>Nombre producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                {/*Funcion para hacer map en la BD y traer los datos a la tabla*/}
                <tbody className="table-group-dividier">
                  {product.map((productData) => (
                    <tr className="table-light" key={productData.sku}>
                      <td>{productData.sku}</td>
                      <td>{productData.productName}</td>
                      <td>
                        $
                        {new Intl.NumberFormat("es-US").format(
                          productData.price
                        )}
                      </td>
                      <td>{productData.stock}</td>
                      <td>
                        <Link
                          to={`/product/${productData.sku}`}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-edit"></i> Editar
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(productData.sku)}
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
      {/*Modal para agregar productos nuevos*/}
      <div id="modalProduct" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">Agregar Producto</label>
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
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="productName"
                  className="form-control"
                  placeholder="Producto"
                  value={productName}
                  onChange={(e) => setproductName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-money-check-dollar"></i>
                </span>
                <input
                  type="text"
                  id="price"
                  className="form-control"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-arrow-trend-up"></i>
                </span>
                <input
                  type="text"
                  id="stock"
                  className="form-control"
                  placeholder="Cantidad"
                  value={stock}
                  onChange={(e) => setstock(e.target.value)}
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

export default Products;
