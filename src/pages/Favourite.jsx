import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Favourite() {
  const { favourites } = useMovieContext()

  if (favourites.length > 0) {
    return (
      <div className="favourites">
        <h2>Your favourites</h2>
        <div className="movies-grid">
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="favourites-empty">
      <h2>No favourite movies yet</h2>
      <p>Tap the heart on a movie and it will appear here.</p>
    </div>
  )
}

export default Favourite
