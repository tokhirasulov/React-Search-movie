import { useState } from "react";
import Movies from "./Movies";

function SearchMovies(){
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e)  => {
        e.preventDefault();

        const url = 
        `https://api.themoviedb.org/3/search/movie?api_key=aeeeee40a5d038d1ddd97f28bbab0780&language=en-US&query=${query}&page=1&include_adult=false`

        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results)
        }catch(err){
            console.error(err)
        };
    };

    
    return(
        <>
            <form onSubmit={searchMovies}>
                <label htmlFor="query">Movie Name</label>
                <input  type="text"
                name="query" 
                placeholder="Type name of movie" 
                value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <Movies 
                    movie={movie}
                    key={movie.id}
                    />
                ))}
            </div>
    </> 
    )
}

export default SearchMovies