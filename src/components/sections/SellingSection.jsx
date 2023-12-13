import ListProducts from "../ListProducts.jsx";
import {useState, useEffect} from "react";
import SelectionsProducts from "../SelectionsProducts.jsx";
import CalculateAmount from "../CalculateAmount.jsx";

const SellingSection = ({rol}) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantityProducts, setQuantityProducts] = useState([]);
    const [shop, setShop] = useState(false);
    const handleProductSelection = (product) => {
        setSelectedProducts((prevSelectedProducts) => {
            const isAlreadySelected = prevSelectedProducts.some(
                (selectedProduct) => selectedProduct.code === product.code
            );

            if (isAlreadySelected) {
                return prevSelectedProducts.filter(
                    (selectedProduct) => selectedProduct.code !== product.code
                );
            } else {
                return [...prevSelectedProducts, product];
            }
        });
    }
    console.log("selling ", rol)
    useEffect(() => {
        if (selectedProducts.length > 0) {
            setQuantityProducts(selectedProducts.map(() => 1));
        }
    }, [selectedProducts]);

    const handleRemoveProduct = (product) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.filter(
                (selectedProduct) => selectedProduct.code !== product.code
            )
        );
    };

    const handleClear = () => {
        setSelectedProducts([]);
        setQuantityProducts([]);
    }

    const handleProductsQuantity = (quantity) => {
        setQuantityProducts(quantity);
    }

    const handleShop = () => {
        setShop(true);
    }

    return (
        <div className="flex flex-col h-full p-7">
            <div className="mb-4 h-16">
                <span className="font-jua text-3xl font-bold">Vender</span>
            </div>
            <div className="flex max-h-[710px]">
                <div className="w-2/3 pr-4">
                    <ListProducts onProductSelect={handleProductSelection} rol={rol} update={shop}/>
                </div>

                <div className="w-1/3 flex-1">
                    {/* Primera Tarjeta (Card) */}
                    <SelectionsProducts
                        selectedProducts={selectedProducts}
                        quantityProducts={quantityProducts}
                        onRemoveProduct={handleRemoveProduct}
                        onProductsQuantity={handleProductsQuantity}
                    />

                    {/* Segunda Tarjeta (Card) */}
                    <CalculateAmount
                        selectedProducts={selectedProducts}
                        quantityProducts={quantityProducts}
                        onClear={handleClear}
                        onUpdate={handleShop}
                    />

                </div>
            </div>
        </div>
    )
}

export default SellingSection;