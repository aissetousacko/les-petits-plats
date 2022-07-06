class RecipeCard {
   constructor(data) {
      this.name = data.name;
      this.time = data.time;
      this.description = data.description;
      this.ingredients = data.ingredients;
   }

   getIngredients() {
      const result = this.ingredients.map(element => {
         const { ingredient, quantity, unit } = element;
         if(quantity && unit) {
            return `<li><span class="fw-bold">${ingredient}: </span>${quantity} ${unit}</li>`
         } else if (quantity && !unit) {
            return `<li><span class="fw-bold">${ingredient}: </span>${quantity}</li>`
         } else {
            return `<li><span class="fw-bold">${ingredient}</span></li>`
         }
      }).join("")
      return result
   }

   recipeDOM() {
      const article = `<div class="col">
      <div class="recipe__card card my-2">
         <img src="./assets/images/image.png" class="card-img-top" alt="...">
         <div class="card-body m-0">
            <div class="d-flex justify-content-between">
               <h5 class="card-title m-0">${this.name}</h5>
                 <p class="fw-bold"><i class="fa-regular fa-clock"></i> ${this.time} min</p>
            </div>
            <div class="card-text row">
               <ul class="recipe__ingredients col-6">
                  ${this.getIngredients()}
               </ul>
               <div class="recipe_description col-6">
                  ${this.description}
               </div>
            </div>
         </div>
      </div>
   </div>`;
   
      return article;
   }
}
