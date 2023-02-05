import React, { useCallback, useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Stack, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import useProductService from "../../resources/ProductService";
import { Box } from "@mui/system";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import ModalWindow from "../modalWindow/ModalWindow";
import { Link, useSearchParams } from "react-router-dom";

const TableProducts = ({ products, setProducts, showFiltered, isLoading, isError, setIsError, setIsLoading, filteredProduct }) => {
    const [open, setOpen] = useState(false);
    const [ productForModal, setProductForModal ] = useState();
    const { getTableData } = useProductService();
    const [ searchParams ] = useSearchParams();
    const params = searchParams.get('page');
    let [ page , setPage ] = useState(+params || 1);
    console.log(params)
    
    const handleOpen = (product) => {
        setOpen(true);
        setProductForModal(product); 

    };
        
    const onProductsLoaded = useCallback((products) => {
        setProducts(products)
    }, [setProducts])

    const toForwardPage = () => {
        setIsError(false);
        setPage(page => page + 1)
    }

    const toBackPage = () => {
        setIsError(false);
        setPage(page => page - 1)
    }

    const checkError = useCallback((response) => {
        if (response.status >= 200 && response.status <= 299) {
            onProductsLoaded(response.data);
        } else {
            setIsError(true);
        }
    }, [onProductsLoaded, setIsError])
    useEffect(() => {
        if (isLoading || isError || products.page === page) {
            return;
        }
        setIsLoading(true);
        setIsError(false);
        getTableData(page)
            .then(checkError)
            .catch(() => setIsError(true))
            .finally(setIsLoading(false))
    }, [checkError, getTableData, isError, isLoading, page, params, products.page, setIsError, setIsLoading])

    const tableData = showFiltered ? [filteredProduct.data] : products.data || [];
    return (
        <>
        {isLoading && <Spinner />}
        {isError && <ErrorMessage />}
        {open && <ModalWindow product={productForModal} open={open} setOpen={setOpen}/>}
        {!isLoading && !isError && (
        <Box>
            <TableContainer component={Paper} sx={{maxWidth : 500, mx: 'auto', mt: 1}}>
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((product) => (
                        <TableRow onClick={() => handleOpen(product)} key={product.id} sx={{bgcolor: product.color, cursor: 'pointer'}}>
                            <TableCell component="th" scope="row">
                                {product.id}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.year}</TableCell> 
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!showFiltered ? 
                <Stack direction="row" spacing={1} alignItems='center' justifyContent='center' mt={1}>
                    <Link style={{pointerEvents: page === 1 ? 'none' : ''}} to={`?page=${page - 1}`} onClick={toBackPage}>
                        <IconButton aria-label="back" disabled={page === 1 ? true : false}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    
                    <Link style={{pointerEvents: products.total_pages === page ? 'none' : ''}} to={`?page=${page + 1}`} onClick={toForwardPage}>
                        <IconButton aria-label="forward" disabled={page === products.total_pages ? true : false}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Link>
                </Stack> : 
                null}
                
        </Box>
        )}
        </>
    )
}
export default TableProducts;