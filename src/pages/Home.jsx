import axios from "axios"
import { useEffect } from "react"
import { useRecipes } from "../contexts/RecipesContext"
import logo from "../assets/img/logo.png"

export default function Home() {

    const { recipes, setRecipes } = useRecipes()

    return (

        <>

            <div className="left-sidebar">

                <img src={logo} alt="logo" />

            </div>

            <div className="content">



            </div>

            <div className="right-sidebar">

                <span>

                    <i class="bi bi-search"></i>

                </span>

            </div>

        </>

    )

}