import { Link } from "react-router-dom"
import { posterUrl } from "../services/api"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext()
  const favourite = isFavourite(movie.id)

  function onFavouriteClick(e) {
    e.preventDefault()
    if (favourite) removeFromFavourites(movie.id)
    else addToFavourites(movie)
  }

  const year = movie.release_date?.split("-")[0]

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl(movie.poster_path)} alt={movie.title} loading="lazy" />
        <div className="movie-overlay">
          <button
            className={`favourite-btn ${favourite ? "active" : ""}`}
            onClick={onFavouriteClick}
            aria-pressed={favourite}
            aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
        <div className="movie-info">
          <h3><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h3>
          <p>{year}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
