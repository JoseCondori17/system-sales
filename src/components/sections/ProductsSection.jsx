import ListProducts from "../ListProducts.jsx";

const ProductsSection = ({rol}) => {

    return (
        <div className="flex flex-col h-full p-7">
            <div className="mb-4 h-16">
                <span className="font-jua text-3xl font-bold">Inventario</span>
            </div>
            <div className="flex-1 flex-grow">
                <ListProducts rol={rol}/>
            </div>
        </div>
    );
};

export default ProductsSection;
