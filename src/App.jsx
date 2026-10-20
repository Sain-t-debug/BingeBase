import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Favourite from "./pages/Favourite"
import MovieDetails from "./pages/MovieDetails"

function App() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </>
  )
}

export default App
