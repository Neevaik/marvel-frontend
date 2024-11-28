import "../styles/Comics.css";
import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import { fetchData, filterComicsData, paginateData } from "../utils";

function Comics() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10;

    const route = "/comics";

    useEffect(() => {
        const getDataAndFilter = async () => {
            await fetchData(route, setData, setIsLoading);
            setFilteredData(filterComicsData(data, searchTerm));
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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
