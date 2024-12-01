import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

function Card({ item, handleFavoriteToggle, isFavorite, onCardClick, titleKey = "name", descriptionKey = "description" }) {
    return (
        <div
            className="card"
            style={{
                backgroundImage: `url(${item.thumbnail.path}.${item.thumbnail.extension})`,
            }}
            onClick={onCardClick}>
            <div className="card-content">
                <div
                    className="favorite-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteToggle(item._id);
                    }}
                >
                    {isFavorite ? (
                        <FaStar className="favorite-star" />
                    ) : (
                        <FaRegStar className="favorite-stars" />
                    )}
                </div>
                <h2 className="card-title">{item[titleKey]}</h2>
                <p className="card-description">
                    {item[descriptionKey] || "No description available"}
                </p>
            </div>
        </div>
    );
}

export default Card;
