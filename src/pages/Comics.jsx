import "../styles/Comics.css";
import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Card from "../components/Card";

import { fetchData } from "../utils";

function Comics() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState({});


    const route = "/comics";
    const totalPages = 47;
    const params = { title: searchTerm, page: currentPage }

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
                {data.length > 0 ? (
                    data.map((comic) => (
                        <Card
                            key={comic._id}
                            item={comic}
                            handleFavoriteToggle={handleFavoriteToggle}
                            isFavorite={favorites[comic._id]}
                            onCardClick={() => console.log(`Comic ${comic._id} clicked!`)}
                            titleKey="title"
                            descriptionKey="description"
                        />
                    ))
                ) : (
                    <p>No comics available</p>
                )}
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
