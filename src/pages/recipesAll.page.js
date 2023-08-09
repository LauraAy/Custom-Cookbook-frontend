import React, { useState, useEffect } from "react";
import RecipesAll from "../components/recipesAll.component.js";
import RegionRecipesAll from "../components/regionRecipesAll.component.js"

const RecipesAllPage = () => {
  
	const [allView, setAllView] = useState(true)
  const [regionView, setRegionView] = useState(false)
  const [creatorView, setCreatorView] = useState(false)

	const goRecipeView = () => {
		console.log("hi recipe")
		if ( allView === false ) {
			setAllView(true)
		}
		if ( regionView === true ) {
			setRegionView(false)
		}
		if ( creatorView === true) {
			setCreatorView(false)
		}
	}
	
	const goRegionView = () => {
		console.log("hi region")
		if ( allView === true ) {
			setAllView(false)
		}
		if ( regionView === false ) {
			setRegionView(true)
		}
		if ( creatorView === true) {
			setCreatorView(false)
		}
	}

	const goCreatorView = () => {
		console.log("hi creator")
		if ( allView === true ) {
			setAllView(false)
		}
		if ( regionView === true ) {
			setRegionView(false)
		}
		if ( creatorView === false) {
			setCreatorView(true)
		}
	}

  return (
	<>
    <div>
			{ allView && (
				<div>
					<RecipesAll />
					<button onClick={goRegionView}>filter by region</button>
					<button onClick={goCreatorView}>filter by creator</button>
				</div>	
			)}
    </div>
		<div>
			{ regionView && (
			<div>	
				<div>
					<RegionRecipesAll />
				</div>
				<button onClick={goRecipeView}>filter by recipe title</button>
				<button onClick={goCreatorView}>filter by creator</button>
			</div>
			)}
		</div>
		<div>
			{ creatorView && (
			<div>
				<div>
					<h1>Creators</h1>
				</div>
				<button onClick={goRecipeView}>filter by recipe title</button>
				<button onClick={goRegionView}>filter by region</button>
			</div>
			)}
		</div>
	</>
  )
}
    
export default RecipesAllPage