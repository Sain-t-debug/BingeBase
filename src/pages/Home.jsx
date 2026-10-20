import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import { getPopularMovies, searchMovies } from "../services/api"

function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load popular movies once, when the page first appears
  useEffect(() => {
    async function loadPopularMovies() {
      try {
        setMovies(await getPopularMovies())
      } catch (err) {
        console.error(err)
        setError("Couldn't load movies. Check your API key and connection.")
      } finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (!query || loading) return

    setLoading(true)
    try {
      setMovies(await searchMovies(query))
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Search failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="status-message">Loading...</p>
      ) : movies.length === 0 && !error ? (
        <p className="status-message">No movies found. Try a different title.</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
