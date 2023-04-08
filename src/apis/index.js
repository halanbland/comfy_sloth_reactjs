import axios from "axios";

const fetchData = async (setData, setCurrData) => {
    const result = await axios.get(
        "https://course-api.com/react-store-products"
    );
    setData(result.data);

    setCurrData && setCurrData(result.data);
};

export default fetchData;
