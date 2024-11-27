import "../styles/Home.css";
import { useState, useEffect } from "react";

import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

import { fetchData, filterData, paginateData } from "../utils";

function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState({});
    const itemsPerPage = 10;

    const route = "/characters/all"

    useEffect(() => {
        const getDataAndFilter = async () => {
            await fetchData(route, setData, setIsLoading);

            setFilteredData(filterData(data, searchTerm));
        };

        getDataAndFilter();
    }, [searchTerm, data]);

    const currentItems = paginateData(filteredData, currentPage, itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (direction) => {
        const newPage = currentPage + direction;
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleFavoriteToggle = (id) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [id]: !prevFavorites[id],
        }));
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="cards-container">
                {currentItems.map((character) => (
                    <CharacterCard
                        key={character._id}
                        character={character}
                        handleFavoriteToggle={handleFavoriteToggle}
                        isFavorite={favorites[character._id]}
                    />
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

export default Home;
