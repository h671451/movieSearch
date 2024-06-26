import {useEffect, useState} from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';



const API_URL =  'https://www.omdbapi.com?apikey=b178810c'; //API 



const App = () => {
    // the useState is a Hook function that takes in two element, in this case it takes in movies and setMovies. But in the second element, you can call the it whatever you want
    // essentially what the second element does is that it sets a new value so in this case setMovies(newValue). useState is a setter function that is automatically generate by useState
    // useState(); you can choose inside the parameter what kind of variable you want the function to return. 
    const [movies, setMovies] = useState([]); 
    const [searchTerm, setSearchTerm] = useState ('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const searchMovies = async (title, year = '') => {
        const response = await fetch(`${API_URL}&s=${title}&y=${year}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    console.log(movies);


    useEffect( () => {
        searchMovies('Batman', selectedYear);
    }, [selectedYear]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const dropdowns = document.querySelectorAll('.dropdown');

    //loop through all the dropdowns elements
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = Array.from(dropdown.querySelectorAll('.menu li'));
        const selected = dropdown.querySelector('.selected');

        //add a click event to the select element¨
        select.addEventListener('click', () => {
            //Add the clicked select styles to the select element
            select.classList.toggle('select-clicked');
            //add the rotate styles to the care leement
            caret.classList.toggle('caret-rotate');
            //add the open styles to the menu element
            menu.classList.toggle('menu-open');
        });

        //loopthough all the options elements
        options.forEach(option => {
            // add a click event to the option eøement
            option.addEventListener('click', () => {
                //change selected inner text to clicked option inner text
                selected.innerText = option.innerText;
                // add the clicked sleect styles to the select elements
                select.classList.remove('select-clicked');

                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');

                options.forEach(option => {
                    option.classList.remove('active');
                });

                option.classList.add('active');
            });
        });
    });

    return (
        <div className ="app">
            <h1>Movies</h1>

            <div className= "search">
                <input
                placeholder = "Search for movies"
                value = {searchTerm}
                onChange= {(e) => setSearchTerm(e.target.value)}
                />
                <img 
                src= {SearchIcon}
                alt="Search"
                onClick={() => {
                    searchMovies(searchTerm, selectedYear);
                    toggleDropdown(); // Close the dropdown when searching
                }}

                />
            </div>

            <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
                <div className="select" onClick={toggleDropdown}>
                    <span className="selected">{selectedYear || 'Filter Movies Years'}</span>
                    <div className="caret"></div>
                </div>
                <ul className="menu">
                    <li onClick={() => setSelectedYear('')}>Reset Year</li>
                    <li onClick={() => setSelectedYear('2023')}>2023</li>
                    <li onClick={() => setSelectedYear('2022')}>2022</li>
                    <li onClick={() => setSelectedYear('2021')}>2021</li>
                    <li onClick={() => setSelectedYear('2020')}>2020</li>
                    <li onClick={() => setSelectedYear('2019')}>2019</li>

                    
                </ul>
            </div>

            {movies?.length > 0
                ? (
                    <div className ="container">
                        {movies.map( (movie) => (
                            <MovieCard movie = {movie} key={movie.imdbID} />
                        ))}
                    </div>                    
                ) :(
                    <div className ="empty">
                        <h2>No Movies found</h2>
                    </div>
                )}


        </div>
    );

}

export default App;