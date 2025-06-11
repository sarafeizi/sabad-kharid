import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../context/ProductContextProvider';
import { CartContext } from '../context/CartContextProvider';
import { isInCart, quantityCount } from '../helper/functions';
import trashIcon from "../assets/icons/trash.svg";
import styles from "./ProductDetails.module.css";

const ProductDetails = (props) => {
    const id = props.match.params.id;
    const data = useContext(ProductsContext);
    const { state, dispatch } = useContext(CartContext);

    const product = data[id - 1];
    const { image, title, description, price, category } = product;

    return (
        <div className={styles.container}>
            <img className={styles.image} src={image} alt="product" />
            <div className={styles.textContainer}>
                <h3>{title}</h3>
                <p className={styles.description}>{description}</p>
                <p className={styles.category}><span>Category:</span> {category}</p>

                <div className={styles.buttonContainer}>

                    <span className={styles.price}>{price} $</span>
                    <div>
                        {quantityCount(state, product.id) === 1 && (
                            <button className={styles.smallButton} onClick={() => dispatch({ type: "REMOVE_ITEM", payload: product })}>
                                <img src={trashIcon} alt="trash" />
                            </button>
                        )}

                        {quantityCount(state, product.id) > 1 && (
                            <button className={styles.smallButton} onClick={() => dispatch({ type: "DECREASE", payload: product })}>-</button>
                        )}

                        {quantityCount(state, product.id) > 0 && (
                            <span className={styles.quantity}>{quantityCount(state, product.id)}</span>
                        )}

                        {isInCart(state, product.id) ? (
                            <button className={styles.smallButton} onClick={() => dispatch({ type: "INCREASE", payload: product })}>+</button>
                        ) : (
                            <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>Add to Cart</button>
                        )}

                    </div>
                    <Link to="/products" className="mt-4 d-inline-block">Back to Shop</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
