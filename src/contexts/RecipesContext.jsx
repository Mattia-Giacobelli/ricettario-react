import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { createContext, useContext, useEffect, useState } from "react";

const RecipesContext = createContext()

function RecipesProvider({ children }) {

    const [recipes, setRecipes] = useState({})

    const [recipeName, setRecipeName] = useState("")

    const [recipesAll, setRecipesAll] = useState([])

    const [activePoll, setActivePoll] = useState({})

    const [lastPoll, setLastPoll] = useState({})

    const [recipeId, setRecipeId] = useState(0)

    const [errMsg, setErrMsg] = useState("")

    const [succMsg, setSuccMsg] = useState("")

    const [searchValue, setSearchValue] = useState("")

    const [results, setResults] = useState([])

    function vote(candidateId, username) {

        console.log(candidateId);
        console.log(username);


        const vote = {

            candidateId,
            username

        }

        axios.post(`${import.meta.env.VITE_API_URL}/polls/${activePoll.pollId}/vote`, vote, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {

                console.log(res.data)

                getActivePoll()
            })

    }

    function addRecipe(recipeId) {

        console.log(recipeId);


        const recipe = {

            recipeId

        }

        axios.post(`${import.meta.env.VITE_API_URL}/polls/${activePoll.pollId}/addrecipe`, recipe, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {

                console.log(res.data)

                getActivePoll()

                setRecipeId(0)
            })

    }

    function deleteRecipe(recipeId) {

        console.log(recipeId);


        const recipe = {

            recipeId

        }

        axios.delete(`${import.meta.env.VITE_API_URL}/polls/${activePoll.pollId}/deleterecipe`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: recipe
        })
            .then(res => {

                console.log(res.data)

                getActivePoll()
            })

    }

    function getActivePoll() {

        axios.get(`${import.meta.env.VITE_API_URL}/polls/active`)
            .then(res => {

                console.log(res.data)
                setActivePoll(res.data)
                getRecipesAll()

            })
            .catch(err => console.log(err))

    }

    function getLastPoll() {

        axios.get(`${import.meta.env.VITE_API_URL}/polls/last-poll`)
            .then(res => {

                console.log(res.data)
                setLastPoll(res.data)

            })
            .catch(err => console.log(err))

    }

    function addSuggestion(recipeId, name) {

        console.log(recipeId);


        const recipe = {

            recipeId,
            name

        }

        axios.post(`${import.meta.env.VITE_API_URL}/polls/${activePoll.pollId}/suggestrecipe`, recipe, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {

                console.log(res.data)

                getActivePoll()

                setRecipeId(0)

                const modalElement = document.getElementById('suggestionModal');

                const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
                modalInstance.hide();
            })
            .catch(err => setErrMsg(err.response?.data?.message))


        setRecipeName("")

    }

    function getRecipesAll() {

        axios.get(`${import.meta.env.VITE_API_URL}/recipes/all`)
            .then(res => {
                console.log(res.data)
                setRecipesAll(res.data)
            })

    }


    function getRecipes(page) {

        axios.get(`${import.meta.env.VITE_API_URL}/recipes`, {
            params: {
                page
            }
        })
            .then(res => {
                console.log(res.data)
                setRecipes(prevRecipes => {

                    const currentItems = prevRecipes?.content || [];

                    const newItems = res.data?.content || [];

                    return {
                        ...res.data,
                        content: [...currentItems, ...newItems]
                    };
                });
            })

    }

    function getSearch(value) {

        setSearchValue(value)

        setResults(recipesAll.filter(recipe => recipe.name.includes(value)))

    }

    useEffect(() => {

        getRecipes(0)

    }, [])

    return (

        <RecipesContext.Provider
            value={{
                recipes, setRecipes, recipeName, setRecipeName, recipesAll, setRecipesAll,
                activePoll, setActivePoll, recipeId, setRecipeId, vote, addRecipe, deleteRecipe, getActivePoll,
                addSuggestion, getRecipesAll, getRecipes, errMsg, setErrMsg, succMsg, setSuccMsg,
                lastPoll, setLastPoll, getLastPoll, searchValue, setSearchValue, results, setResults, getSearch
            }}>
            {children}
        </RecipesContext.Provider>

    )

}

function useRecipes() {

    const context = useContext(RecipesContext)

    return context

}

export { RecipesProvider, useRecipes }