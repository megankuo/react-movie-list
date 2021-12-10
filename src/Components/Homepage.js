import { useEffect, useState } from 'react';
import './Homepage.css';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import axios from 'axios';

export default function Homepage(props) {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [selectedGenre, setSelectedGenre] = useState(0);

	var today = new Date();
	var thirtyDaysBefore = new Date(new Date().setDate(today.getDate() - 30));
	var endDate = today.toISOString().slice(0, 10);
	var startDate = thirtyDaysBefore.toISOString().slice(0, 10);

	async function getMovies() {
		let url = `https://api.themoviedb.org/3/discover/movie?api_key=dd651f5c8c42c749409e5a3f7f679383&&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=release_date.desc&with_original_language=en&include_adult=false&region=CA&page=${page}`;
		const res = await axios.get(url);
		setMovies(res.data.results);
		setTotalPages(res.data.total_pages);
		return res.data;
	}

	async function getMoviesByGenre(id) {
		setPage(1);
		let url = `https://api.themoviedb.org/3/discover/movie?api_key=dd651f5c8c42c749409e5a3f7f679383&&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=release_date.desc&with_original_language=en&include_adult=false&region=CA&page=${page}&with_genres=${id}`;
		const res = await axios.get(url);
		setMovies(res.data.results);
		setTotalPages(res.data['total_pages']);
		return res.data;
	}

	async function getGenres() {
		let url = `
https://api.themoviedb.org/3/genre/movie/list?api_key=dd651f5c8c42c749409e5a3f7f679383&language=en-US`;
		const res = await axios.get(url);
		setGenres(res.data.genres);
	}

	function onGenreChange(e) {
		// setSelectedGenre(e.target.value);
		let selectedId = e.target.value;
		console.log('Current genre id: ', selectedId);
		selectedId === '0' ? getMovies() : getMoviesByGenre(selectedId);
	}

	function changePage(pageNumber) {
		console.log(pageNumber);
		// setPage(pageNumber, () => {
		// 	selectedGenre === '0' ? getMovies() : getMoviesByGenre(selectedGenre);
		// });
	}

	useEffect(() => {
		// only gets executed on first render (one time)
		getMovies();
		getGenres();
	});

	return (
		<>
			<h1>Movies Released in the Last 30 Days</h1>
			<div className='container'>
				<select id='genre' onChange={onGenreChange}>
					<option value='0'>All movies</option>
					{genres.map((genre) => (
						<option value={genre.id}>{genre.name}</option>
					))}
				</select>
				<div>
					<Pagination totalPages={totalPages} changePage={changePage} />
				</div>
			</div>
			<main>
				{movies.map((movie) => (
					<MovieCard movie={movie}></MovieCard>
				))}
			</main>
		</>
	);
}
