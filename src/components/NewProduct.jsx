import { useState, useEffect } from 'react';
import {invoke} from "@tauri-apps/api";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";

const NewProduct = ({onOffClick}) => {
    const [productData, setProductData] = useState({
        productCode: '',
        productName: '',
        category: '',
        stock: 0,
        price: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const product = {
                code: e.target.elements.productCode.value.toUpperCase(),
                name: e.target.elements.productName.value.toUpperCase(),
                category: e.target.elements.category.value.toUpperCase(),
                stock: parseInt(e.target.elements.stock.value),
                price: parseFloat(parseFloat(e.target.elements.price.value).toFixed(2)),
                available: parseInt(e.target.elements.stock.value),
            }
            const json_product = JSON.stringify(product, null, 2);
            const message = await invoke('register_product', { json: json_product }).then((message) => message)
            onOffClick();
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <Button
                className="text-black px-4 py-2 rounded-md absolute top-[110px] left-32 m-4"
                onClick={onOffClick}
            >
                <Icon name="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"/>
            </Button>
            <h2 className="text-2xl font-jua text-center font-semibold mb-6">Nuevo producto</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-4">
                    <label htmlFor="productCode" className="block text-sm font-medium font-jua text-gray-600">
                        Código de Producto
                    </label>
                    <input
                        type="text"
                        id="productCode"
                        name="productCode"
                        value={productData.productCode}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium font-jua text-gray-600">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={productData.productName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium font-jua text-gray-600">
                        Categoría
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium font-jua text-gray-600">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium font-jua text-gray-600">
                        Precio
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4 text-center">
                    <button type="submit"
                            className="bg-background-text text-white font-bold p-2 rounded-md">
                        Registrar Producto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProduct;
