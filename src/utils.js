import axios from "axios";

const deployedUrl = "https://site--marvel-backend--jwrbvpgcfj9t.code.run";

export const fetchData = async (route, setData, setIsLoading,name,page) => {
    const baseUrl = "http://localhost:3000";
    const url = `${deployedUrl}${route}`;
    try {
        const response = await axios.get(url,{
            params:{
                name,
                page,
            }
        });
        setData(response.data.results);
        setIsLoading(false);
    } catch (error) {
        console.log(error.message);
    }
};