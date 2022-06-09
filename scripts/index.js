import { recipes } from "../data/recipes.js";

const ingredientsButton = document.querySelector("#ingredients-button");
const ingredientsInput = document.querySelector("#input-ingredients");
const ingredientsList = document.querySelector("#ingredients");
const appliancesButton = document.querySelector("#appliances-button");
const appliancesInput = document.querySelector("#input-appliances");
const appliancesList = document.querySelector("#appliances");
const ustensilsButton = document.querySelector("#ustensils-button");
const ustensilsInput = document.querySelector("#input-ustensils");
const ustensilsList = document.querySelector("#ustensils");


const toggleBox = (button, list, input) => {
   // Fonction pour afficher l'input
   const openBox = (button, list, input) => {
      //console.log("click open")
      button.firstChild.textContent = ""
      list.classList.remove("hidden")
      input.classList.remove("hidden")
   }

   const closeBox = (button, list, input) => {
      //console.log("click close")
      list.classList.add("hidden")
      input.classList.add("hidden")
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
   /* return {toggleEvent } */
}

/**
 * * Fonction qui appelle les autres fonctions
 * ! Important
 * ? Question
 * TODO : A faire
 */
async function init() {

   //Event toggle pour affichage des listes
   // * prends en paramètres button, list, input
   ingredientsButton.onclick = () => toggleBox(ingredientsButton, ingredientsList, ingredientsInput)
   appliancesButton.onclick = () => toggleBox(appliancesButton, appliancesList, appliancesInput)
   ustensilsButton.onclick = () => toggleBox(ustensilsButton, ustensilsList, ustensilsInput)

   const cardDiv = document.querySelector(".recipes__container")
   // La méthode map() renvoie un tableau et 
   //la méthode join() ne s'éxécute qu"avec un tableau
   const cards = recipes.map(element => {
      let recipeDom = new RecipeCard(element).recipeDOM()
      return recipeDom
   })

   cardDiv.innerHTML = cards.join("")
	
}

init();
