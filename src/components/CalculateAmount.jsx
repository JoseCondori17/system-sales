
import {useState} from "react";
import {invoke} from "@tauri-apps/api";
import Button from "./Button.jsx";
import Icon from "./Icon.jsx";
const CalculateAmount = ({selectedProducts, quantityProducts, onClear, onUpdate}) => {
    const [discount, setDiscount] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("yape");

    const subtotal = selectedProducts.reduce((acc, product, index) => (
        acc + product.price * quantityProducts[index]
    ), 0);

    const handleDiscountChange = (e) => {
        setDiscount(parseFloat(e.target.value) || 0);
        setDiscountApplied(false);
    };

    const applyDiscount = () => {
        const discountedTotal = subtotal - discount;
        const totalAmount = discountApplied ? discountedTotal : subtotal;
        return totalAmount < 0 ? 0 : totalAmount;
    };

    const handleApplyDiscount = () => {
        setDiscountApplied(true);
    }

    const handleClear = () => {
        setDiscount(0);
        setDiscountApplied(false);
        onUpdate();
        onClear();
    };

    async function handleRegister() {
        try {
            if (selectedProducts && selectedProducts.length > 0){
                const currentDate = new Date().toLocaleString();
                const productsInfo = selectedProducts.map((product, index) => ({
                    name: product.name,
                    quantity: quantityProducts[index],
                    previous_stock: product.available,
                    current_stock: product.available - quantityProducts[index],
                    price: product.price,
                }));
                const registrationData = {
                    datetime: currentDate,
                    payment_method: paymentMethod,
                    amount: applyDiscount(),
                    products: productsInfo,
                    discount: discount,
                };
                const json_sale = JSON.stringify(registrationData, null, 2);
                const message = await invoke('register_shopping', { json: json_sale }).then((message) => message)
                handleClear();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex-1 bg-white rounded-xl border border-stone-200 shadow">
            {/* Previous */}
            <div className="flex flex-row mb-6">
                <div className="flex flex-col items-start p-4 flex-grow">
                    <label className="text-center text-black text-lg font-jua">Pago</label>
                </div>
                <div className="flex flex-col items-start p-4 flex-grow">
                    <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mb-1 p-0.5"
                    >
                        <option value="yape">Yape</option>
                        <option value="plin">Plin</option>
                        <option value="credit-card">Card</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>

                <div className="flex flex-col items-end p-4">
                    <div className="mb-1">
                        <span className="font-bold p-2">Subtotal </span>
                        <span>S./ {subtotal}</span>
                    </div>
                </div>
            </div>

            {/* Discount */}
            <div className="flex flex-col items-end mb-10 mr-4">
                <input
                    value={discount}
                    onChange={handleDiscountChange}
                    className="bg-zinc-300 bg-opacity-75 rounded-md p-2 mb-2 outline-none w-28"
                />
                <Button
                    onClick={handleApplyDiscount}
                    className="font-jua text-background-text text-base"
                >
                    Aplicar descuento
                </Button>
            </div>

            {/* Total */}
            <div className="flex flex-row justify-end mb-1 mr-4">
                <p className="text-2xl font-bold mr-4">Total</p>
                <p className="text-2xl font-bold">S./ {applyDiscount()}</p>
            </div>

            <div className="flex flex-row justify-end p-4">
                <Button
                    onClick={handleClear}
                    className="mr-6 bg-blacktext-white p-2 rounded-md"
                >
                    <Icon name="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </Button>
                <Button
                    onClick={handleRegister}
                    className="bg-background-text text-white font-bold font-jua p-2 rounded-md"
                >
                    Registrar compra
                </Button>
            </div>

        </div>
    )
}

export default CalculateAmount;