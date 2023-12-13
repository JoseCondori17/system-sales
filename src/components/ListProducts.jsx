import {invoke} from "@tauri-apps/api";
import {useState, useEffect} from "react";
import Search from "./Search.jsx";
import Button from "./Button.jsx";
import Icon from "./Icon.jsx";
import NewProduct from "./NewProduct.jsx";

const ListProducts = ({ onProductSelect, rol, update }) => {
    const [selectedAdd, setSelectedAdd] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [shop, setShop] = useState(false);

    useEffect(() => {
        if (update) {
            setShop(true);
        }
        const fetchData = async () => {
            try {
                const event = await invoke('get_all_products');
                const fetchedProducts = JSON.parse(event);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then(r => console.log("correct"));
    }, [selectedAdd, shop, update]);

    const filteredProducts = searchQuery
        ? products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : products;

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        if (rol==="employee"){
            onProductSelect(product);
        } else {
            console.log("error in employee")
            console.log(rol)
        }
    };

    const handleAddClick = () => setSelectedAdd(true);
    const handleOffClick = () => setSelectedAdd(false);
    // selectedAdd
    return (
        <>
            {selectedAdd ? (<NewProduct onOffClick={handleOffClick}/>) : (
                <>
                    <div className="h-16">
                        <Search setSearchQuery={setSearchQuery} children={rol === 'admin' && (
                            <Button className="bg-background-text text-white rounded-xl p-2 ml-4"
                                    onClick={handleAddClick}>
                                <Icon name="M12 4.5v15m7.5-7.5h-15" />
                            </Button>
                        )}/>
                    </div>
                    <div className="flex-1">
                        <div className="flex mb-2 p-2 font-bold text-sm font-jua text-black rounded-md">
                            <div className="w-1/5 pr-2">Código</div>
                            <div className="w-1/5 pr-2">Nombre</div>
                            <div className="w-1/5 pr-2">Stock</div>
                            <div className="w-1/5 pr-2">Categoria</div>
                            <div className="w-1/5 pr-2">Precio</div>
                        </div>
                        <div className="h-96 overflow-y-auto">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.code}
                                    className={`flex mb-2 p-2 ${selectedProduct === product ? 'bg-blue-100 rounded-xl' : ''}`}
                                    onMouseEnter={() => setSelectedProduct(product)}
                                    onMouseLeave={() => setSelectedProduct(null)}
                                    onClick={() => handleProductClick(product)}
                                >
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm">{product.code}</p>
                                    </div>
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm">{product.name}</p>
                                    </div>
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm">
                                            <span>{product.available}</span> / <span className="text-gray-400">{product.stock}</span>
                                        </p>
                                    </div>
                                    <div className="w-1/5 pr-2">
                                        <p className="text-sm">{product.category}</p>
                                    </div>
                                    <div className="w-1/5">
                                        <p className="text-sm">S./ {product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default ListProducts;