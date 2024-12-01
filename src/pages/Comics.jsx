import "../styles/Comics.css";
import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import { fetchData } from "../utils";

function Comics() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const route = "/comics";
    const totalPages = 47;

    useEffect(() => {
        fetchData(route, setData, setIsLoading, searchTerm, currentPage);

    }, [currentPage, searchTerm]);

    const handlePageChange = (newPage) => {
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
                {data.length > 0 ? (
                    data.map((comic) => (
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
