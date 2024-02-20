import { useEffect } from "react";
import PropTypes from "prop-types";
import "./productList.scss";

function ProductList({ products, setProducts, setSelectedProduct }) {
    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(savedProducts);
    }, [setProducts]);

    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const sortedProducts = products.slice().sort((a, b) => a.name.localeCompare(b.name));

    return (
        <ul className="product-list">
            {sortedProducts.map((product, index) => (
                <li key={index} className="product-item">
                    <div className="product-info">
                        <span className="product-name">{product.name} - </span> 
                        <span className="product-description">{product.description} - </span> 
                        <span className="product-price">{product.price}</span>
                    </div>
                    <div className="product-actions">
                        <button className="edit-button" onClick={() => handleEdit(product)}>Editar</button>
                        <button className="delete-button" onClick={() => handleDelete(index)}>Eliminar</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    })).isRequired,
    setProducts: PropTypes.func.isRequired,
    setSelectedProduct: PropTypes.func.isRequired,
};

export default ProductList;
