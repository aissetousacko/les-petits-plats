import { recipes } from "../data/recipes.js";

const ingredientsButton = document.querySelector("#ingredients-button");
const ingredientsInput = document.querySelector("#input-ingredients");
const ingredientsListbox = document.querySelector("#ingredients");
const appliancesButton = document.querySelector("#appliances-button");
const appliancesInput = document.querySelector("#input-appliances");
const appliancesListbox = document.querySelector("#appliances");
const ustensilsButton = document.querySelector("#ustensils-button");
const ustensilsInput = document.querySelector("#input-ustensils");
const ustensilsListbox = document.querySelector("#ustensils");
const arrowIcon = document.querySelector(".arrow");
const searchbar = document.querySelector("#searchbar");
const tagsSection = document.querySelector(".filters__tags");

let allRecipes;
let recipesFiltered = [];
let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];
let ingredientsSelected = [];
let appliancesSelected = [];
let ustensilsSelected = [];
let searchbarValue = "";

/**
 ** Function for manage the dropdown lists
 */
const toggleBox = (button, list, input) => {
	//Display the input
	const openBox = (button, list, input) => {
		button.firstChild.textContent = "";
		list.classList.remove("hidden");
		input.classList.remove("hidden");
		input.focus();
	};

	//Hide the input
	const closeBox = (button, list, input) => {
		list.classList.add("hidden");
		input.classList.add("hidden");
		switch (button) {
			case ingredientsButton:
				button.firstChild.textContent = "Ingrédients";
				break;
			case appliancesButton:
				button.firstChild.textContent = "Appareils";
				break;
			case ustensilsButton:
				button.firstChild.textContent = "Ustensiles";
				break;
		}
	};

	const toggleEvent = (input) => {
		if (input.classList.contains("hidden")) {
			openBox(button, list, input);
		} else {
			closeBox(button, list, input);
		}

		let arrowUp = arrowIcon.classList.toggle("arrow-up");
		if (arrowUp) {
			arrowIcon.classList.replace("fa-angle-down", "fa-angle-up");
		} else {
			arrowIcon.classList.replace("fa-angle-up", "fa-angle-down");
		}
	};

	toggleEvent(input);
};

/**
 ** Takes an array in parameter and put the words in singular
 */
const clearArray = (array) => {
	const result = array.map((str) => {
		if (/[a-z]*s$/.test(str)) {
			const singularStr = str.replace(/s$/, "");
			if (array.includes(singularStr)) {
				return singularStr;
			} else {
				return str;
			}
		} else {
			return str;
		}
	});

	return result;
};

/**
 ** Get and sort the ingredients, appliances and ustensils list
 */
const getFilters = (data) => {
	data.forEach((element) => {
		element.ingredients.forEach((ingredient) => {
			ingredientsList.push(ingredient.ingredient.toLowerCase());
		});

		appliancesList.push(element.appliance.toLowerCase());

		element.ustensils.forEach((ustensil) => {
			ustensilsList.push(ustensil.toLowerCase());
		});
	});

	ingredientsList = clearArray(ingredientsList);
	ingredientsList = [...new Set(ingredientsList)].sort();
	appliancesList = clearArray(appliancesList);
	appliancesList = [...new Set(appliancesList)].sort();
	ustensilsList = clearArray(ustensilsList);
	ustensilsList = [...new Set(ustensilsList)].sort();

	return {
		ingredients: ingredientsList,
		appliances: appliancesList,
		ustensils: ustensilsList,
	};
};

/**
 ** Takes an array in parameters and get recipes whitch match with the input value
 */
const getRecipesFiltered = (recipes) => {
	let result = [];
	for (const recipe of recipes) {
		let title = recipe.name;
		let description = recipe.description;
		let ingredients = recipe.ingredients;

		if (
			title.toLowerCase().includes(searchbarValue.toLowerCase()) ||
			description.toLowerCase().includes(searchbarValue.toLowerCase())
		) {
			result.push(recipe);
		}

		for (let i = 0; i < ingredients.length; i++) {
			if (
				ingredients[i].ingredient
					.toLowerCase()
					.includes(searchbarValue.toLowerCase())
			) {
				result.push(recipe);
			}
		}
	}

	result = [...new Set(result)];

	return result;
};

/**
 ** Display the ingredients, appareils and ustensils items in the listbox
 */
const displayFilterItems = (array, item) => {
	const result = array.map((element) => {
		return `<li class="${item}-item px-2">${
			element.charAt(0).toUpperCase() + element.slice(1)
		}</li>`;
	});

	return result;
};

/**
 ** Get the ingredients items and add an eventListener to create a tag
 */
const getRecipesFilteredByIngredients = (listIngredients) => {
	ingredientsListbox.innerHTML = "";
	let ingredientsListDOM = displayFilterItems(listIngredients, "ingredients");
	ingredientsListbox.innerHTML = ingredientsListDOM.join("");

	ingredientsListbox.querySelectorAll("li").forEach((item) => {
		item.addEventListener("click", () => {
			createTag(item.textContent, "ingredients");
		});
	});
};

/**
 ** Get the appliances items and add an eventListener to create a tag
 */
const getRecipesFilteredByAppliances = (listAppliances) => {
	appliancesListbox.innerHTML = "";
	let appliancesListDOM = displayFilterItems(listAppliances, "appliances");
	appliancesListbox.innerHTML = appliancesListDOM.join("");

	appliancesListbox.querySelectorAll("li").forEach((item) => {
		item.addEventListener("click", () => {
			createTag(item.textContent, "appliances");
		});
	});
};

/**
 ** Get the ustensils items and add an eventListener to create a tag
 */
const getRecipesFilteredByUstensils = (listUstensils) => {
	ustensilsListbox.innerHTML = "";
	let ustensilsListDOM = displayFilterItems(listUstensils, "ustensils");
	ustensilsListbox.innerHTML = ustensilsListDOM.join("");

	ustensilsListbox.querySelectorAll("li").forEach((item) => {
		item.addEventListener("click", () => {
			createTag(item.textContent, "ustensils");
		});
	});
};

/**
 ** Create a tag
 */
const createTag = (text, type) => {
	if (type === "ingredients") {
		ingredientsSelected.push(text.toLowerCase());
		tagsSection.innerHTML += `<span class="${type}-tag px-2 py-1 mx-2" data-type="${type}">${text}<i class="fa-regular fa-circle-xmark close-tag ps-2"></i></span>`;
		displayHandler();
	} else if (type === "appliances") {
		appliancesSelected.push(text.toLowerCase());
		tagsSection.innerHTML += `<span class="${type}-tag px-2 py-1 mx-2" data-type="${type}">${text}<i class="fa-regular fa-circle-xmark close-tag ps-2"></i></span>`;
		displayHandler();
	} else if (type === "ustensils") {
		ustensilsSelected.push(text.toLowerCase());
		tagsSection.innerHTML += `<span class="${type}-tag px-2 py-1 mx-2" data-type="${type}">${text}<i class="fa-regular fa-circle-xmark close-tag ps-2"></i></span>`;
		displayHandler();
	}

	let tagsClose = document.querySelectorAll(".close-tag");
	tagsClose.forEach((tag) => {
		tag.addEventListener("click", closeTag);
	});

	ingredientsInput.value = "";
	appliancesInput.value = "";
	ustensilsInput.value = "";
};

/**
 ** Close a tag
 */
const closeTag = (e) => {
	console.log("close tag");
	let tag = e.target;
	tag.parentNode.remove(tag);

	let tagName = tag.parentNode.textContent.toLowerCase();
	let tagType = tag.parentNode.dataset.type;

	switch (tagType) {
		case "ingredients":
			ingredientsSelected = removeItemFromList(ingredientsSelected, tagName);
			console.log("new ingredients selected", ingredientsSelected);
			displayHandler();
			break;

		case "appliances":
			appliancesSelected = removeItemFromList(appliancesSelected, tagName);
			console.log("new appliances selected", appliancesSelected);
			displayHandler();
			break;

		case "ustensils":
			ustensilsSelected = removeItemFromList(ustensilsSelected, tagName);
			console.log("new ustensils selected", ustensilsSelected);
			displayHandler();
			break;

		default:
			console.log("class not found");
	}
};

/**
 ** When a tag is delete, remove the item form the list of the selected tags
 */
const removeItemFromList = (list, item) => {
	let index = list.indexOf(item.toLowerCase());
	if (index > -1) {
		list.splice(index, 1);
	}

	return list;
};

/**
 ** Displat the recipes in the DOM
 */
const displayRecipes = (data) => {
	const cardDiv = document.querySelector(".recipes__container");
	const cards = data.map((element) => {
		let recipeDom = new RecipeCard(element).recipeDOM();
		return recipeDom;
	});

	cardDiv.innerHTML = cards.join("");

	if (data.length == 0) {
		cardDiv.innerHTML =
			"<p>Aucune recette ne correspond à votre critère…<br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>";
	}
};

/**
 ** Search in the input filters
 */
const inputSearch = (data, input) => {
	let result = data.filter((element) => {
		return element.toLowerCase().includes(input.value.toLowerCase());
	});

	/* if(result.length === 0) {
      listbox.innerHTML = `<li class="px-2">Pas de résultats</li>`
   } */
	return result;
};

/**
 ** Init all the input
 */
const initSearchBar = () => {
	searchbar.addEventListener("input", (e) => {
		searchbarValue = e.target.value;
		displayHandler();
	});

	ingredientsInput.addEventListener("input", (e) => {
		filterIngredients(e.target.value);
	});

	appliancesInput.addEventListener("input", (e) => {
		filterAppliances(e.target.value);
	});

	ustensilsInput.addEventListener("input", (e) => {
		filterUstensils(e.target.value);
	});
};

const filterIngredients = (inputValue) => {
	if (inputValue.length > 0) {
		let ingredientsFiltered = inputSearch(ingredientsList, ingredientsInput);
		getRecipesFilteredByIngredients(ingredientsFiltered);
	} else {
		getRecipesFilteredByIngredients(ingredientsList);
	}
};

const filterAppliances = (inputValue) => {
	if (inputValue.length > 0) {
		let appliancesFiltered = inputSearch(appliancesList, appliancesInput);
		getRecipesFilteredByAppliances(appliancesFiltered);
	} else {
		getRecipesFilteredByAppliances(appliancesList);
	}
};

const filterUstensils = (inputValue) => {
	if (inputValue.length > 0) {
		let ustensilsFiltered = inputSearch(ustensilsList, ustensilsInput);
		getRecipesFilteredByUstensils(ustensilsFiltered);
	} else {
		getRecipesFilteredByUstensils(ustensilsList);
	}
};

/**
 ** Manage the events
 */
const displayHandler = () => {
	if (
		searchbarValue.length < 3 &&
		ingredientsSelected.length === 0 &&
		appliancesSelected.length === 0 &&
		ustensilsSelected.length === 0
	) {
		const { ingredients, appliances, ustensils } = getFilters(allRecipes);
		displayRecipes(allRecipes);
		getRecipesFilteredByIngredients(ingredients);
		getRecipesFilteredByAppliances(appliances);
		getRecipesFilteredByUstensils(ustensils);
		return;
	}

	recipesFiltered = allRecipes;
	if (searchbarValue.length >= 3) {
		recipesFiltered = getRecipesFiltered(allRecipes);
	}

	/**
	 ** For each ingredient tag created, filter the recipes by ingredient
	 */
	ingredientsSelected.forEach((tag) => {
		recipesFiltered = recipesFiltered.filter((recipe) => {
			return recipe.ingredients.some(
				({ ingredient }) => ingredient.toLowerCase() === tag
			);
		});
	});

	/**
	 ** For each appliance tag created, filter the recipes by appliances
	 */
	appliancesSelected.forEach((tag) => {
		recipesFiltered = recipesFiltered.filter((recipe) => {
			return recipe.appliance.toLowerCase() === tag;
		});
	});

	/**
	 ** For each ustensil tag created, filter the recipes by ustensils
	 */
	ustensilsSelected.forEach((tag) => {
		recipesFiltered = recipesFiltered.filter((recipe) => {
			return recipe.ustensils.some(
				(ustensil) => ustensil.toLowerCase() === tag
			);
		});

		console.log("recipesFiltered with ustensils", recipesFiltered);
	});

	const { ingredients, appliances, ustensils } = getFilters(recipesFiltered);
	displayRecipes(recipesFiltered);
	getRecipesFilteredByIngredients(ingredients);
	getRecipesFilteredByAppliances(appliances);
	getRecipesFilteredByUstensils(ustensils);
};

function init() {
	allRecipes = recipes;
	displayRecipes(recipes);

	//*Event toggle for the dropdowns
	ingredientsButton.onclick = () =>
		toggleBox(ingredientsButton, ingredientsListbox, ingredientsInput);
	appliancesButton.onclick = () =>
		toggleBox(appliancesButton, appliancesListbox, appliancesInput);
	ustensilsButton.onclick = () =>
		toggleBox(ustensilsButton, ustensilsListbox, ustensilsInput);

	const { ingredients, appliances, ustensils } = getFilters(recipes);

	initSearchBar();

	getRecipesFilteredByIngredients(ingredients);
	getRecipesFilteredByAppliances(appliances);
	getRecipesFilteredByUstensils(ustensils);
}

init();
