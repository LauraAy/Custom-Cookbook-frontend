import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PairingRecipeDataService from "../services/pairingRecipe.service";
import RecipeDataService from "../services/recipe.service";

const PairingViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 

  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ pairing, setPairing] = useState ([])
  const [recipeOne, setRecipeOne] = useState ([])
  const [recipes, setRecipes] = useState ([])

  const getRecipeOne = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeOne(response.data)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const getRecipePairings = id => {
    PairingRecipeDataService.getRecipePairings(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setPairing(response.data.pairings)
      console.log(response.data);
    })
    // .then(()=>{
    //   console.log(pairing.recipeOne)
    //   getRecipeOne()
    // })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    if(id)
    getRecipePairings(id);
  }, [id]);

  useEffect(() => {
    if(pairing.recipeOne)
    getRecipeOne(pairing.recipeOne)
  }, [pairing.recipeOne]
  )

const goAddPairing = () => {
  navigate("/pairings/add/" + id)
}

const refreshPage = () => {
  navigate(0);
}

//Remove pairing from this recipe
const removePairing = currentPairingId => {
  const recipeId = currentRecipe.id
  const pairingId = currentPairingId

  PairingRecipeDataService.removePairing(recipeId, pairingId)
  .then(response => {
    console.log(response.data)
    refreshPage()
  
  })
  .catch(e => {
    console.log(e)
  })
}

return (
    <>
      <div>
        {pairing ? (
          <div >
            {/* <button onClick={(getRecipes)}>TEST</button> */}
            <h2> {pairing.pairingName} </h2>
            {pairing.description ? (
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {pairing.description}
              </div>
            ):(<div></div>)}
            {pairing.drinks ? (
              <div>
								<label>
                  <strong>Drinks:</strong>
                </label>{" "}
								{pairing.drinks}
              </div>
            ):(<div></div>)}
						{pairing.shows ? (
              <div>
                <label>
                  <strong>Shows:</strong>
                </label>{" "}
                {pairing.shows}
              </div>
            ):(<div></div>)}
						{pairing.books ? (
              <div>
                <label>
                  <strong>Books:</strong>
                </label>{" "}
                {pairing.books}
              </div>
            ):(<div></div>)}
						{pairing.music ? (
              <div>
                <label>
                  <strong>Music:</strong>
                </label>{" "}
                {pairing.music}
              </div>
            ):(<div></div>)}
						{pairing.decor ? (
              <div>
                <label>
                  <strong>Decor:</strong>
                </label>{" "}
                {pairing.decor}
              </div>
            ):(<div></div>)}
						{recipeOne ? (
              <div>
                <label>
                  <strong>Related Recipe:</strong>
                </label>{" "}
                 <Link to={"/recipes/" + recipeOne.id}>
                  {recipeOne.title}
                </Link>
                <br></br>
                <br></br>
              </div>
            ):(<div></div>)}
            	{pairing.more ? (
              <div>
                <label>
                  <strong>More:</strong>
                </label>{" "}
                {pairing.more}
              </div>
            ):(<div></div>)}
            <Link to={"/pairings/edit/" + currentRecipe.id + "/" + pairing.id}>
							<button>Edit This Recipe Pairing</button>
            </Link>
            <br></br>
            <br></br>
            <button onClick={() => {removePairing(pairing.id)}}>Remove Pairing from This Recipe </button>
            <br></br>
            <br></br>
					</div>
        ):(  
          <div> 
            <h2>Add a Pairing now!</h2>
            <button onClick={goAddPairing}>Add a recipe pairing.</button>
          </div>
        )}
      </div>
    </>
)}

export default PairingViewComponent