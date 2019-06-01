import uuidv4 from 'uuid/v4';

let recipes = [];

const loadRecipes = () => {
    const recipesJson = localStorage.getItem('recipes');

    return recipesJson ? JSON.parse(recipesJson) : [];
}

const getRecipes = () => recipes;

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

const createRecipe = () => {
    const id = uuidv4();
    const newRecipe = {
        id: id,
        title: 'Recipe',
        instructions: 'Instruction1 Instruction2',
        ingredients: [{
            name: '',
            avail: false
        }]
    };
    recipes.push(newRecipe);
    saveRecipes();
    return id;
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1);
        saveRecipes();
    }
}

recipes = loadRecipes();

export {
    getRecipes,
    createRecipe,
    removeRecipe
}