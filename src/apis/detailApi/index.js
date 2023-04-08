import axios from "axios";

async function detailApi(setData, id) {
    const a = await axios.get(
        `https://course-api.com/react-store-single-product?id=${id}`
    );
    setData(a.data);
}

export default detailApi;
