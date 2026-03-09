import { useState } from 'react';

const usePagination = (data, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Total pages calculation
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    // Logic to get items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return { currentItems, currentPage, totalPages, setCurrentPage, itemsPerPage };
};

export default usePagination;