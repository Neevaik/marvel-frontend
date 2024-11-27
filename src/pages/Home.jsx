import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Home.css";

function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Nombre de cartes par page

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/characters/all");
            setData(response.data.data.results); // Accéder directement au tableau des personnages
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Calcul des index pour la pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Nombre total de pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="cards-container">
                {currentItems.map((character) => (
                    <div
                        key={character._id}
                        className="card"
                        style={{
                            backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`,
                        }}
                    >
                        <div className="card-content">
                            <h2 className="card-title">{character.name}</h2>
                            <p className="card-description">
                                {character.description || "No description available"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation pour la pagination */}
            <div className="pagination">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;
