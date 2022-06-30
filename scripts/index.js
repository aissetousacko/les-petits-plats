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
const inputFilters = document.querySelectorAll(".filters__input");

let ingredientsList = []
let appliancesList = []
let ustensilsList = []
let selectedTagsList = []


//? FILTRES

/**
 * * Permet d'afficher l'input de recherche des filtres avec
 * * la listbox des ingrédients, appareils et ustensiles
 * @param {*} button 
 * @param {array} list 
 * @param {*} input 
 */
const toggleBox = (button, list, input) => {
   // Fonction pour afficher l'input
   const openBox = (button, list, input) => {
      //console.log("click open")
      button.firstChild.textContent = ""
      list.classList.remove("hidden")
      input.classList.remove("hidden")
      //arrowIcon.classList.replace("fa-angle-down", "fa-angle-up")
   }

   const closeBox = (button, list, input) => {
      //console.log("click close")
      list.classList.add("hidden")
      input.classList.add("hidden")
      //arrowIcon.classList.replace("fa-angle-up", "fa-angle-down")
      switch(button) {
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
   }

   const toggleEvent = (input) => {
      if(input.classList.contains("hidden")){
         openBox(button, list, input)
      } else {
         closeBox(button, list, input)
      }
   }

   toggleEvent(input)
}


/**
 * * Permet de mettre tous les mots de l'array au pluriel au singulier
 * @param {array} array 
 */
const clearArray = (array) => {
   const result = array.map(str => {
      if (/[a-z]*s$/.test(str)) {
         const singularStr = str.replace(/s$/, '');
         if (array.includes(singularStr)) {
            return singularStr;
         } else {
            return str;
         }
     } else {
         return str;
     }
   })

   return result;
}



/**
 * * Permet de récupérer la liste des ingrédients, appareils et ustensils
 * * triée
 * @param {array} data 
 * @returns 
 */
const getFilters = (data) => {
   //pour chaque recette
   data.forEach(element => {
      //on ajoute dans le tableau la liste des ingrédients
      /* ingredientsList.push(...new Filter(element).getIngredients())
      appliancesList.push(new Filter(element).getAppliances())
      ustensilsList.push(...new Filter(element).getUstensils()) */
      element.ingredients.forEach(ingredient => {
         ingredientsList.push(ingredient.ingredient.toLowerCase())
      })

      appliancesList.push(element.appliance.toLowerCase())

      element.ustensils.forEach(ustensil => {
         ustensilsList.push(ustensil.toLowerCase())
      })
   })

   ingredientsList = clearArray(ingredientsList)
   appliancesList = clearArray(appliancesList)
   ustensilsList = clearArray(ustensilsList)

   /* console.log([...new Set(ingredientsList)].sort())
   console.log([...new Set(appliancesList)].sort())
   console.log([...new Set(ustensilsList)].sort()) */
   
   return {
      ingredients: [...new Set(ingredientsList)].sort(),
      appliances: [...new Set(appliancesList)].sort(),
      ustensils: [...new Set(ustensilsList)].sort()
   }
}

/**
 * * Affiche la liste les ingrédients, appareils et ustensiles dans les listbox
 * @param {array} array 
 * @returns 
 */
const displayFilterItems = (array, item) => {
   const result =  array.map(element => {
      return `<li class="${item}-item px-2">${element.charAt(0).toUpperCase() + element.slice(1)}</li>`
   })

   return result.join("")  
}


//? TRIER LES RECETTES

/**
 * * Retourne les recettes filtrés par rapport à l'input et prend en paramètres le tableau
 * * qui contient toutes les recettes
 * @param {array} recipes 
 */
const getRecipesFiltered = (recipes) => {
   const result = recipes.filter(element => {
      //* Je récupère le titre, les ingrédients et la description de la recette
      let title = element.name;
      let description = element.description;
      let ingredients = element.ingredients

      /**
       ** on regarde dans le titre, les ingrédients et la description si 
       ** la valeur saisie correspond
       */
      //console.log(searchbar.value)
      let resultTitle = title.toLowerCase().includes(searchbar.value.toLowerCase())
      let resultDescription = description.toLowerCase().includes(searchbar.value.toLowerCase())
      let resultIngredients = ingredients.map(el => {
         //console.log(el.ingredient)
         el.ingredient.toLowerCase().includes(searchbar.value.toLowerCase())
      })
      if(resultIngredients.includes(true)) return element

      return resultTitle, resultDescription
   })

   //console.log(result)
   displayRecipes(result)
}

/**
 * TODO : crée une fonction qui récupère dans une table les filtres sélectionnés,
 * TODO : puis chercher dans toutes les recettes celles qui correspondent aux éléments fitrés
 * TODO : pour ensuite les afficher.
 */


/**
 ** Fonction de recherche des input des filtres
 * @param {array} data 
 */
const inputSearch = (data, inputIndex, listbox, item) => {
   let result = data.filter(element => {
      return element.toLowerCase().includes(inputFilters[inputIndex].value.toLowerCase())
   })
   //console.log(result)
   listbox.innerHTML = displayFilterItems(result, item);
}

//Fonction qui prend en parametres l'array des ingredients... 
//1-eventlistener sur chaque item
const getRecipesFilteredByTags = (filterArray, recipes) => {
   let filtersArrayDOM = Array.from(document.querySelectorAll(".ingredients-item"))
   //console.log(filtersArrayDOM)
   filtersArrayDOM.forEach(item => {
      //console.log(item)
      item.addEventListener("click", () => {
         console.log(item.textContent)
         let result = recipes.filter(element => {
            //on récupère les ingrédients de la recette actuelle
            let ingredients = filterArray
            //on parcourt le tableau de touts les ingrédients et on regarde si l'ingrédient selectionné est
            //dans le tableau 
            //console.log(ingredients)
            let resultIngredients = ingredients.map(el => {
               //console.log(el)
               return el.toLowerCase().includes(item.textContent.toLowerCase())
            })
            console.log(resultIngredients)
            if(resultIngredients.includes(true)) return element
         })
         //displayRecipes(result)
      })
   })
}


/**
 ** Affiche toutes les recettes sur la page
 ** data est un array contenant les recettes à afficher
 */
 const displayRecipes = (data) => {
   const cardDiv = document.querySelector(".recipes__container")
   // La méthode map() renvoie un tableau et 
   //la méthode join() ne s'éxécute qu"avec un tableau
   const cards = data.map(element => {
      let recipeDom = new RecipeCard(element).recipeDOM()
      return recipeDom
   })

   cardDiv.innerHTML = cards.join("")

   if(data.length == 0) {
      cardDiv.innerHTML = "<p>Aucune recette ne correspond à votre critère…<br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>"
   }
}


/**
 ** Fonction qui appelle les autres fonctions et qui initialise l'algo
 */
async function init() {

   //Event toggle pour affichage des listes
   //* prend en paramètres button, list, input
   ingredientsButton.onclick = () => toggleBox(ingredientsButton, ingredientsListbox, ingredientsInput)
   appliancesButton.onclick = () => toggleBox(appliancesButton, appliancesListbox, appliancesInput)
   ustensilsButton.onclick = () => toggleBox(ustensilsButton, ustensilsListbox, ustensilsInput)

   //TODO : affiche toutes les recettes
   /* const cardDiv = document.querySelector(".recipes__container")
   // La méthode map() renvoie un tableau et 
   //la méthode join() ne s'éxécute qu"avec un tableau
   const cards = recipes.map(element => {
      let recipeDom = new RecipeCard(element).recipeDOM()
      return recipeDom
   })

   cardDiv.innerHTML = cards.join("") */

   //* Affiche toutes les recettes
   displayRecipes(recipes)

   //TODO : affiche les recettes filtrées
   searchbar.addEventListener("input", (e) => {
      e.preventDefault()
      if(e.target.value.length >= 3) {
         getRecipesFiltered(recipes)
      } else {
         displayRecipes(recipes)
      }
   })

   //TODO : affiche la liste des filtres
   const { ingredients, appliances, ustensils } = getFilters(recipes)
   //console.log(ingredients)
   ingredientsListbox.innerHTML = displayFilterItems(ingredients, "ingredients")
   appliancesListbox.innerHTML = displayFilterItems(appliances, "appliances")
   ustensilsListbox.innerHTML = displayFilterItems(ustensils, "ustensils")
   
   //TODO: pour chaque input des filtres, affiche les recettes filtrées
	inputFilters.forEach(input => {
      input.addEventListener("input", (e) => {
         e.preventDefault()
         inputSearch(ingredients, 0, ingredientsListbox, "ingredients");
         inputSearch(appliances, 1, appliancesListbox, "appliances");
         inputSearch(ustensils, 2, ustensilsListbox, "ustensils");
      })
   })

   getRecipesFilteredByTags(ingredients, recipes)
}

init();
