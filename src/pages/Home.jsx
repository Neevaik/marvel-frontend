import "../styles/Home.css";
import "../styles/Favorite.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Card from "../components/Card";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

import { fetchData } from "../utils";

function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState(null);

    const navigate = useNavigate();
    const route = "/characters/all";
    const totalPages = 15;

    const params = { name: searchTerm, page: currentPage };

    const getData = async () => {
        await fetchData(route, setData, setIsLoading, params);
    };

    useEffect(() => {
        const storedFavorites = Cookies.get("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        getData();
    }, [currentPage, searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleFavoriteToggle = (id) => {
        const updatedFavorites = {
            ...favorites,
            [id]: !favorites[id],
        };
        setFavorites(updatedFavorites);
        Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 30 });
    };

    const handleCardClick = (id) => {
        navigate(`/character-details/${id}`);
    };

    if (isLoading || favorites === null) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="cards-container">
                {data.map((character) => (
                    <Card
                        key={character._id}
                        item={character}
                        handleFavoriteToggle={handleFavoriteToggle}
                        isFavorite={favorites[character._id]}
                        onCardClick={() => handleCardClick(character._id)}
                        titleKey="name"
                        descriptionKey="description"
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
