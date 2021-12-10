import { useState, useEffect } from 'react';
import './Pagination.css';

export default function Pagination({ totalPages, changePage }) {
	const [pages, setPages] = useState(totalPages);
	const [currentPage, setCurrentPage] = useState(1);

	function goToNextPage() {
		setCurrentPage(
			(page) => page + 1,
			() => changePage(currentPage)
		);
	}

	function goToPreviousPage() {
		setCurrentPage(((page) => page - 1) , () => changePage(currentPage));
	}

	// function changePage(event) {
	// 	const pageNumber = Number(event.target.textContent);
	// 	setCurrentPage(pageNumber);
	// }

	// useEffect(() => {
	// 	setPages(totalPages);
	// });

	return (
		<div>
			{/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
			<div className='pagination'>
				{/* previous button */}
				<button
					onClick={goToPreviousPage}
					className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
				>
					prev
				</button>

				{/* show page numbers */}
				<span>
					{currentPage} / {totalPages}
				</span>

				{/* next button */}
				<button
					onClick={goToNextPage}
					className={`next ${currentPage === pages ? 'disabled' : ''}`}
				>
					next
				</button>
			</div>
		</div>
	);
}
