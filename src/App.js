import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddRecipe from "./components/add-recipe.component";
import Recipe from "./components/recipe.component";
import RecipesList from "./components/recipes-list.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/recipes" className="navbar-brand">
                        Aydelotte
                    </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/recipes"} className="nav-link">
                            Recipes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<RecipesList/>} />
                        <Route path="/recipes" element={<RecipesList/>} />
                        <Route path="/add" element={<AddRecipe/>} />
                        <Route path="/recipes/:id" element={<Recipe/>} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
