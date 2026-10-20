import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getMovieDetails, posterUrl } from "../services/api"

function MovieDetails() {
  const { id } = useParams()          // from the route /movie/:id
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getMovieDetails(id)
      .then(setMovie)
      .catch((err) => {
        console.error(err)
        setError("Couldn't load this movie.")
      })
  }, [id])

  if (error) return <p className="error-message">{error}</p>
  if (!movie) return <p className="status-message">Loading...</p>

  return (
    <div className="movie-details">
      <Link to="/" className="back-link">← Back to movies</Link>
      <div className="details-layout">
        <img className="details-poster" src={posterUrl(movie.poster_path, "w500")} alt={movie.title} />
        <div>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p className="details-meta">
            {movie.release_date?.split("-")[0]}
            {movie.runtime ? ` · ${movie.runtime} min` : ""}
            {movie.vote_average ? ` · ★ ${movie.vote_average.toFixed(1)}` : ""}
          </p>
          <ul className="genre-list">
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
