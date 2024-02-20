import  { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ProductForm({ products, setProducts, selectedProduct, setSelectedProduct }) {
    const [formProduct, setFormProduct] = useState({ name: "", description: "", price: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedProduct) {
            setFormProduct(selectedProduct);
        } else {
            setFormProduct({ name: "", description: "", price: "" });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price" && !/^\d*\.?\d*$/.test(value)) {
            return;
        }
        setFormProduct({ ...formProduct, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formProduct.name || !formProduct.price) {
            setErrors({ name: !formProduct.name, price: !formProduct.price });
            return;
        }
        setErrors({});
        if (selectedProduct) {
            const updatedProducts = products.map((product) => {
                if (product.name === selectedProduct.name) {
                    return formProduct;
                }
                return product;
            });
            setProducts(updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            setSelectedProduct(null);
        } else {
            const updatedProducts = [...products, formProduct];
            setProducts(updatedProducts);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        }
        setFormProduct({ name: "", description: "", price: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nombre" value={formProduct.name} onChange={handleChange} />
            {errors.name && <span style={{ color: "red" }}>El Nombre es requerido</span>}
            <input type="text" name="description" placeholder="Descripción" value={formProduct.description} onChange={handleChange} />
            <input type="text" name="price" placeholder="Precio" value={formProduct.price} onChange={handleChange} />
            {errors.price && <span style={{ color: "red" }}>El Precio es requerido</span>}
            <button type="submit">{selectedProduct ? "Modificar" : "Agregar"}</button>
        </form>
    );
}

ProductForm.propTypes = {
    products: PropTypes.array.isRequired,
    setProducts: PropTypes.func.isRequired,
    selectedProduct: PropTypes.object,
    setSelectedProduct: PropTypes.func.isRequired
};

export default ProductForm;