import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import "./app.scss";

function App() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(savedProducts);
    }, []);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Lista de Productos</h1>
            </header>
            <div className="app-content">
                <ProductList products={products} setProducts={setProducts} setSelectedProduct={setSelectedProduct} />
                <div className="product-form-container">
                    <h2 className="form-title">{selectedProduct ? "Modificar Producto" : "Agregar Producto"}</h2>
                    <ProductForm products={products} setProducts={setProducts} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                </div>
            </div>
        </div>
    );
}

export default App;