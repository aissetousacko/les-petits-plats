/* class Filter {
   constructor(data) {
      this.ingredients = data.ingredients;
      this.appliances = data.appliance;
      this.ustensils = data.ustensils;
   }

   getIngredients() {
      const ingredient = this.ingredients.map(element => {
         return `<li class="dropdown-item">${element.ingredient}</li>`
      })
      //console.log(ingredient)
      return ingredient
   }

   getAppliances() {
      return `<li class="dropdown-item">${this.appliances}</li>`
   }

   getUstensils() {
      const ustensil = this.ustensils.map(element => {
         return `<li class="dropdown-item">${element}</li>`
      }) 
      return ustensil
   }
} */