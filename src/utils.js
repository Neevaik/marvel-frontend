// utils.js

import axios from "axios";

// Fonction pour récupérer les données
export const fetchData = async (setData, setIsLoading) => {
    try {
        const response = await axios.get("http://localhost:3000/characters/all");
        setData(response.data.data.results);
        setIsLoading(false);
    } catch (error) {
        console.log(error.message);
    }
};

// Fonction pour filtrer les données selon un terme de recherche
export const filterData = (data, searchTerm) => {
    return data.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

// Fonction pour la pagination des données
export const paginateData = (filteredData, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
};
