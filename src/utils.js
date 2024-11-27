import axios from "axios";

export const fetchData = async (route, setData, setIsLoading) => {
    const baseUrl = "http://localhost:3000";
    const url = `${baseUrl}${route}`;

    try {
        const response = await axios.get(url);
        setData(response.data.data.results);
        setIsLoading(false);
    } catch (error) {
        console.log(error.message);
    }
};

export const filterData = (data, searchTerm) => {
    return data.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const paginateData = (filteredData, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
};
