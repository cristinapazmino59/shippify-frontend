import axios from "axios";

export async function find(path) {
    const res = await axios
        .get(`http://localhost:3001/api${path}`);
    return res.data;
};

export async function erase(path) {
    const res = await axios
        .delete(`http://localhost:3001/api${path}`);
    return res.data;
};

export async function createNew(path, body) {
    const res = await axios
        .post(`http://localhost:3001/api${path}`, body);
    return res.data;
};

export async function edit(path, body) {
    const res = await axios
        .put(`http://localhost:3001/api${path}`, body);
    return res.data;
};


