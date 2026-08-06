import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const RecipesContext = createContext()

function RecipesProvider({ children }) {

    const [recipes, setRecipes] = useState([])

    function getRecipes() {

        axios.get("https://ricettario-spring.duckdns.org/api/recipes")
            .then(res => {
                console.log(res.data)
                setRecipes(res.data)
            })

    }

    useEffect(() => {

        getRecipes()

    }, [])

    return (

        <RecipesContext.Provider
            value={{ recipes, setRecipes }}>
        </RecipesContext.Provider>

    )

}

function useRecipes() {

    const context = useContext(RecipesContext)

    return context

}

export { RecipesProvider, useRecipes }