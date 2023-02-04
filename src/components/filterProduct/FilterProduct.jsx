import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useProductService from '../../resources/ProductService';
import { debounce } from 'lodash';

const FilterProduct = ({ setFilteredProduct, setIsLoading, setShowFiltered, setIsError }) => {
    const { getFilteredData } = useProductService();
    const handleChange = (e) => {
        setIsError(false);
        setIsLoading(true);
        const { value } = e.target;
        if (!value) {
            setShowFiltered(false);
            setIsLoading(false);
            return;
        }
        setShowFiltered(true);
        const debounced = debounce(async () => {
            getFilteredData(value)
                .then(data => setFilteredProduct(data.data))
                .catch(() => setIsError(true))
                .finally(() => setIsLoading(false))
        }, 500)
        debounced()

    }

    return (
        <Box
            component="form"
            sx={{
                 mx: 'auto', my: 1, width: '25ch'
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Enter ID" variant="outlined" type="number" onChange={handleChange}/>
        </Box>
    )
}

export default FilterProduct;