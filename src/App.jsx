import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { RecipesProvider } from "./contexts/RecipesContext"
import DefaultLayout from "./layouts/DefaultLayout"
import RandomWheel from "./pages/RandomWheel"
import Register from "./pages/Register"
import { AuthProvider } from "./contexts/AuthContext"
import Login from "./pages/Login"


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <RecipesProvider>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/wheel" element={<RandomWheel />} />
              </Route>
            </Routes>
          </RecipesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
