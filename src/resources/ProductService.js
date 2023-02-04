import axios from 'axios'

const useProductService = () => {
    const { get } = axios;
    const API_BASE = 'https://reqres.in/api/products';
    const PER_PAGE = 5;

    const getTableData = async (page) => {
        const res = await get(`${API_BASE}?per_page=${PER_PAGE}&page=${page}`);
        return res;
    }

    const getFilteredData = async (id) => {
        const res = await get(`${API_BASE}?id=${id}`)
        return res;
    }

    return {
        getTableData,
        getFilteredData
    }
}

export default useProductService;