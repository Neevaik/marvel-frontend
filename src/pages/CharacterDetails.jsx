import "../styles/Character-details.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { fetchData } from "../utils";

function CharacterDetails() {

    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const route = `/comics/character-detail/${id}`
    useEffect(() => {
        fetchData(route, setCharacter, setIsLoading)
    }, [id])

    if(isLoading){
        return <p>Loading...</p>
    }

    const { thumbnail, name, description, comics } = character;
    const imageUrl = thumbnail
        ? `${thumbnail.path}.${thumbnail.extension}`
        : "default-image-path.jpg";

        return (
            <div className="character-details-container">
                <div className="character-info">
                    <img
                        src={imageUrl}
                        alt={name || "Character thumbnail"}
                        className="character-thumbnail"
                    />
                    <div className="character-text">
                        <h1>{name}</h1>
                        <p>{description || "No description available."}</p>
                    </div>
                </div>
    
                <h2>Comics</h2>
                <div className="comics-container">
                    {comics && comics.length > 0 ? (
                        comics.map((comic) => (
                            <div className="comic-card" key={comic._id}>
                                <img
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    style={{height:50}}
                                    alt={comic.title}
                                    className="comic-thumbnail"
                                />
                                <div className="comic-text">
                                    <h3>{comic.title}</h3>
                                    <p>{comic.description || "No description available."}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comics available for this character.</p>
                    )}
                </div>
            </div>
        );

}


export default CharacterDetails;