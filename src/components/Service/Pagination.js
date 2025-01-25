import React from 'react';

const BootstrapPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPaginationNumbers = () => {
        const delta = 2;
        const range = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) range.unshift('...');
        if (currentPage + delta < totalPages - 1) range.push('...');

        return [1, ...range, totalPages];
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <i className="fa-solid fa-arrow-left" style={{ fontSize: "18px", color: "#000" }}></i>
                    </button>
                </li>

                {paginationNumbers.map((page, index) =>
                    page === '...' ? (
                        <li key={index} className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                    ) : (
                        <li key={index} className={`page-item ${currentPage === page && 'active'}`}>
                            <button className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </button>
                        </li>
                    )
                )}

                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <i className="fa-solid fa-arrow-right" style={{ fontSize: "18px", color: "#000" }}></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default BootstrapPagination;
