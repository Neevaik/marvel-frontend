import "../styles/Home.css"

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search for a superhero..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;