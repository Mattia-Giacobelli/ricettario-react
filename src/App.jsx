import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { RecipesProvider } from "./contexts/RecipesContext"


function App() {

  return (
    <>
      <RecipesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={ }>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecipesProvider>
    </>
  )
}

export default App
