import axios from "axios";

async function find(path) {
    const res = await axios
        .get(`http://localhost:3001/api${path}`);
    return res.data;
}

export default find;