import "../styles/Home.css";
import { useState, useEffect } from "react";

import { fetchData, filterData, paginateData } from "../utils";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

function Comics() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSorted, setIsSorted] = useState(false); // Indique si les données sont triées par ordre alphabétique
    const itemsPerPage = 10;

    const route = "/comics";

    // Récupérer les données de l'API
    useEffect(() => {
        const getData = async () => {
            await fetchData(route, setData, setIsLoading);
        };
        getData();
    }, []);

    // Filtrer et trier les données en fonction du terme de recherche et du tri alphabétique
    useEffect(() => {
        let results = filterData(data, searchTerm);
        if (isSorted) {
            results = results.sort((a, b) => a.title.localeCompare(b.title));
        }
        setFilteredData(results);
        setCurrentPage(1); // Réinitialiser à la première page après un tri ou une recherche
    }, [searchTerm, data, isSorted]);

    const currentItems = paginateData(filteredData, currentPage, itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (direction) => {
        const newPage = currentPage + direction;
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const toggleSortOrder = () => {
        setIsSorted((prev) => !prev);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button className="sort-button" onClick={toggleSortOrder}>
                {isSorted ? "Unsort" : "Sort Alphabetically"}
            </button>
            <div className="cards-container">
                {currentItems.map((comic) => (
                    <div key={comic._id} className="comic-card">
                        <div
                            className="comic-thumbnail"
                            style={{
                                backgroundImage: `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`,
                            }}
                        ></div>
                        <div className="comic-details">
                            <h3 className="comic-title">{comic.title}</h3>
                            <p className="comic-description">
                                {comic.description || "No description available"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}

export default Comics;
