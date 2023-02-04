import React, { useState } from "react";
import FilterProduct from "../filterResults/FilterProduct";
import TableProducts from "../tableProducts/TableProducts";
import { BrowserRouter as Router } from 'react-router-dom'

const MainWrapper = () => {
    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showFiltered, setShowFiltered ] = useState(false);
    const [ filteredProduct, setFilteredProduct ] = useState([]);
    const [ isError, setIsError ] = useState(false);
    return (
        <>
            <FilterProduct 
                setFilteredProduct={setFilteredProduct} 
                setIsLoading={setIsLoading} 
                setShowFiltered={setShowFiltered}
                setIsError={setIsError}
            />
            <Router>
                <TableProducts
                    products={products}
                    setProducts={setProducts}
                    showFiltered={showFiltered}
                    isLoading={isLoading}
                    filteredProduct={filteredProduct}    
                    isError={isError}
                    setIsError={setIsError}
                    setIsLoading={setIsLoading}
                    // param={param}
                />
            </Router>
        </>
    )
}

export default MainWrapper;