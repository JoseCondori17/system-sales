import {useState, useEffect} from "react";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";
const SelectionsProducts = ({ selectedProducts, quantityProducts, onRemoveProduct, onProductsQuantity }) => {
    const handleChange = (e, index) => {
        const newValue = e.target.value === '' ? 1 : Math.max(1, parseInt(e.target.value));
        onProductsQuantity([...quantityProducts.slice(0, index), newValue, ...quantityProducts.slice(index + 1)]);
    };

    return (
        <div className="h-72 bg-white p-4 mb-4 rounded-xl border border-stone-200 shadow overflow-y-auto">
            {selectedProducts.length > 0 ? (
                <ul>
                    {selectedProducts.map((product, index) => (
                        <li key={product.code} className="flex items-center justify-between mb-2">
                            <input
                                className="border rounded-md p-1 text-sm w-16 h-12 text-center"
                                min="1"
                                value={quantityProducts[index] || 1}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <p className="text-sm font-bold">{product.name}</p>
                            <div className="flex items-center">
                                <p className="text-sm font-bold w-20">S./ {product.price}</p>
                                <Button
                                    onClick={() => onRemoveProduct(product)}
                                >
                                    <Icon name="M6 18L18 6M6 6l12 12"/>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                "No products selected"
            )}
        </div>
    );
}


export default SelectionsProducts;