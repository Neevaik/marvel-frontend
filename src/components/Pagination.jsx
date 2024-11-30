import "../styles/Home.css";

function Pagination({ currentPage, totalPages, handlePageChange }) {
    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Previous
            </button>
            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
