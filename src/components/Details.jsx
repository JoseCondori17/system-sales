import Icon from "./Icon.jsx";
import Button from "./Button.jsx";

const Details = ({sale, format, onClick}) => {
    return (
        <div className="relative">
            <Button
                className="text-black px-4 py-2 rounded-md absolute top-0 left-0 m-4"
                onClick={onClick}
            >
                <Icon name="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"/>
            </Button>
            <div className="flex justify-center items-center h-4/5">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg text-center font-jua mb-4">Resumen de compra</p>
                    <div className="flex justify-between mb-2">
                        <span className="font-jua text-sm">Fecha y hora</span>
                        <div className="text-right ml-44">
                            <span className="font-jua text-sm">{format(sale.datetime)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-jua text-sm">Metodo de pago</span>
                        <div className="flex-1 text-right">
                            <span className="font-jua text-sm">{sale.payment_method}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <div className="flex-1">
                            <span className="font-jua text-sm">Descuento</span>
                        </div>
                        <div className="flex-1 text-right">
                            <span className="font-jua text-sm">S./ {sale.discount}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <div className="flex-1">
                            <span className="font-jua text-sm">Total sin descuento</span>
                        </div>
                        <div className="flex-1 text-right">
                            <span className="font-jua text-sm">S./ {sale.amount + sale.discount}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-3">
                        <div className="flex-1">
                            <span className="font-jua text-sm">Total con descuento</span>
                        </div>
                        <div className="flex-1 text-right">
                            <span className="font-jua text-sm">S./ {sale.amount.toFixed(2)}</span>
                        </div>
                    </div>
                    <p className="text-lg text-center font-jua mb-2">Productos incluidos</p>
                    {sale.products.map((product, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-gray-400 font-jua text-sm">Nombre: {product.name}</p>
                            <p className="text-gray-400 font-jua text-sm">Precio: S./ {product.price.toFixed(2)}</p>
                            <p className="text-gray-400 font-jua text-sm">Cantidad: {product.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Details;