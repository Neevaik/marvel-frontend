import { FaStar, FaRegStar } from "react-icons/fa";
import "../styles/Home.css"

function CharacterCard({ character, handleFavoriteToggle, isFavorite }) {
    return (
        <div className="card"
            style={{
                backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`,
            }}>
            <div className="card-content">
                <div
                    className="favorite-icon"
                    onClick={() => handleFavoriteToggle(character._id)}>
                    {isFavorite ? (
                        <FaStar className="favorite-star" />
                    ) : (
                        <FaRegStar className="favorite-stars" />
                    )}
                </div>
                <h2 className="card-title">{character.name}</h2>
                <p className="card-description">
                    {character.description || "No description available"}
                </p>
            </div>
        </div>
    );
};

export default CharacterCard;
