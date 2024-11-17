import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber);
        window.scrollTo({
            top: 10,
            behavior: 'smooth'
        });
    };


    return (
        <div className="flex justify-center items-center mt-4 mb-4 space-x-2">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`flex justify-center items-center px-6 py-2 mx-1 rounded-full text-sm font-bold transition-all duration-300 
                ${currentPage === number
                    ? 'bg-[#a41c4c] text-white  bg-gradient-to-r from-[#a41c4c] via-[#a41c4c] to-[#0454a4] hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 '}  
            `}
                >
                    {number}
                </button>
            ))}
        </div>

    );
};
export default Pagination;
