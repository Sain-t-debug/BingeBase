import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext(null)

// Custom hook so components can write: const { favourites } = useMovieContext()
export function useMovieContext() {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error("useMovieContext must be used inside <MovieProvider>")
  }
  return context
}

export function MovieProvider({ children }) {
  // Start from whatever was saved last time (or an empty list)
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem("favourites")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Save to the browser every time the list changes
  useEffect(() => {
    try {
      localStorage.setItem("favourites", JSON.stringify(favourites))
    } catch {
      /* storage unavailable (private mode, full): the app still works */
    }
  }, [favourites])

  const addToFavourites = (movie) => {
    setFavourites((prev) => (prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]))
  }

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((m) => m.id !== movieId))
  }

  const isFavourite = (movieId) => favourites.some((m) => m.id === movieId)

  const value = { favourites, addToFavourites, removeFromFavourites, isFavourite }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}
