import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { RecipesProvider } from "./contexts/RecipesContext"
import DefaultLayout from "./layouts/DefaultLayout"
import RandomWheel from "./pages/RandomWheel"


function App() {

  return (
    <>
      <BrowserRouter>
        <RecipesProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/wheel" element={<RandomWheel />} />
            </Route>
          </Routes>
        </RecipesProvider>
      </BrowserRouter>
    </>
  )
}

export default App
