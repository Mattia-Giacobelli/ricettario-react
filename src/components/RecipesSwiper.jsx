import { Pagination, Navigation } from "swiper/modules";
import { useRecipes } from "../contexts/RecipesContext";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function RecipeSwiper() {

    const { getRecipesAll, recipesAll } = useRecipes()

    const [mostPrepared, setMostPrepared] = useState(null)

    function getMostPrepared() {

        const maxPrep = Math.max(...recipesAll?.map(recipe => recipe.timesPrep))

        setMostPrepared(recipesAll.filter(recipe => recipe.timesPrep === maxPrep || recipe.timesPrep >= maxPrep - 10).slice(0, 4))

    }

    useEffect(() => {

        getRecipesAll();


    }, [])

    useEffect(() => {

        getMostPrepared()

        console.log(mostPrepared);


    }, [recipesAll])

    useEffect(() => {

        const maxPrep = Math.max(recipesAll?.map(recipe => recipe.timesPrep))

        console.log(recipesAll.filter(recipe => recipe.timesPrep === maxPrep || recipe.timesPrep >= maxPrep - 10).slice(0, 4));

        console.log(recipesAll);


    }, [recipesAll, mostPrepared])

    return (

        <>

            {mostPrepared &&

                <Swiper
                    className="recipe-swiper"
                    modules={[Pagination, Navigation]}
                    space-between={10}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1400: { slidesPerView: 1 }
                    }}
                    pagination={{ clickable: true }}
                    centeredSlides={false}
                    navigation={true}>

                    {mostPrepared.map(recipe => {

                        return (

                            <SwiperSlide key={recipe.id}>

                                <Link to={`/recipes/${recipe.id}`}>

                                    <div className="card row flex-column flex-lg-row h-100">

                                        <div className="col-12 col-lg-6">


                                            <div className="card-body p-2  border-0">

                                                <div>

                                                    <div className="ps-2 rounded-bottom" style={{ margin: "5px -8px -8px -8px", padding: "5px 10px", color: "lightgray" }}>

                                                        <span className="ms-1 me-3">
                                                            <i className="bi bi-heart"></i> {Math.floor(Math.random() * 200)} LIKES
                                                        </span>

                                                        <span className="ms-1 me-3">
                                                            <i className="bi bi-clock"></i> {Math.floor(Math.random() * (999 - 1 + 1)) + 1} MIN
                                                        </span>

                                                    </div>

                                                    <h4 className="p-0 overflow">
                                                        {recipe.name}
                                                    </h4>

                                                </div>


                                            </div>

                                        </div>

                                        <div className="col-12 col-lg-6">

                                            <div className="card-header img-contain-s p-0  border-0">

                                                <div>
                                                    <img src={`${import.meta.env.VITE_LARAVEL_IMG_URL}${recipe.imageUrl}`}
                                                        alt={recipe.name} />
                                                </div>

                                            </div>

                                        </div>


                                    </div>

                                </Link>

                            </SwiperSlide>

                        )

                    })}

                </Swiper>
            }

        </>

    )

}