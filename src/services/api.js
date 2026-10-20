const API_KEY = 'a19ef42780591686305dbb4837405bb2'
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// One helper builds the URL, calls TMDB and throws on a bad response.
async function request(path, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, language: "en-US", ...params })
  const response = await fetch(`${BASE_URL}${path}?${query}`)
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`)
  return response.json()
}

export async function getPopularMovies() {
  const data = await request("/movie/popular")
  return data.results
}

export async function searchMovies(query) {
  const data = await request("/search/movie", { query, include_adult: "false" })
  return data.results
}

// Full details for one movie: runtime, genres, overview, rating...
export function getMovieDetails(id) {
  return request(`/movie/${id}`)
}

// TMDB returns only a path like "/abc123.jpg"; join it with the image base and a size.
export function posterUrl(path, size = "w500") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : "/poster-placeholder.svg"
}
