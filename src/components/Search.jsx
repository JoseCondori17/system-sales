const Search = ({ setSearchQuery, children }) => {
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        console.log('Realizando búsqueda:', query);
    };

    return (
        <div className="rounded flex">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleInputChange}
                className="border rounded-xl p-2 w-1/3"
            />
            {children}
        </div>
    );
}

export default Search;
