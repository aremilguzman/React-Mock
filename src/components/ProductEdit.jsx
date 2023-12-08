import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showAlert } from "../alerts";

function ProductEdit() {
  const [productName, setproductName] = useState("");
  const [price, setprice] = useState("");
  const [stock, setstock] = useState("");
  const { sku } = useParams();
  const redirect = useNavigate();

  //Funcion para traer los datos del cliente correspondiente al ID seleccionado  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const options = { params: { sku: sku } };
        const response = await axios.get(
          `http://localhost:4000/product/${sku}`,
          options
        );

        // Verificar si la respuesta contiene datos
        if (response.data.length > 0) {
          const productData = response.data[0];
          setproductName(productData.productName);
          setprice(productData.price);
          setstock(productData.stock);
        } else {
          // Manejo de error en caso de que se haga la consulta correctamente a la BD pero no devuelva datos
          console.log("No se encontraron datos para el producto con sku:", sku);
        }
      } catch (error) {
        console.error("Error al obtener datos del producto:", error);
      }
    };

    getProduct();
  }, [sku]);

  //Funcion para editar productos
  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/product/${sku}`, {
      sku: sku,
      productName: productName,
      price: price,
      stock: stock,
    });
    showAlert("Producto editado con éxito", "success");
    redirect("/productos");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card">
              <div className="card-header bg-dark text-white">
                Editar Producto
              </div>
              <div className="card-body">
                <form onSubmit={updateProduct}>
                  <label>Nombre del producto</label>
                  <input
                    type="text"
                    id="productName"
                    className="form-control"
                    required={true}
                    value={productName}
                    onChange={(e) => setproductName(e.target.value)}
                  />
                  <label>Precio</label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    required={true}
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                  />
                  <label>Cantidad</label>
                  <input
                    type="number"
                    id="stock"
                    className="form-control"
                    required={true}
                    value={stock}
                    onChange={(e) => setstock(e.target.value)}
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

export default ProductEdit;
