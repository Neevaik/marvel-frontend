import "../styles/Home.css";
import { useState, useEffect } from "react";

import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

import { fetchData } from "../utils";

function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState({});

    const route = "/characters/all";

    const totalPages = 15;

    const params = { name: searchTerm, page: currentPage }

    const getData = async () => {
        await fetchData(route, setData, setIsLoading, params);
    };

    useEffect(() => {
        getData();
    }, [currentPage, searchTerm]);

    const handlePageChange = (newPage) => {
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
                {data.map((character) => (
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
