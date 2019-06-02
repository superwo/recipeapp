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
        title: '',
        instructions: '',
        ingredients: []
    };
    recipes.push(newRecipe);
    saveRecipes();
    return id;
}

const updateRecipe = (id, {
    title,
    instructions
}) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex > -1) {
        if (title) {
            recipes[recipeIndex].title = title;
        }
        if (instructions) {
            recipes[recipeIndex].instructions = instructions;
        }
        saveRecipes();
    }
}

const getRecipe = (id) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex > -1) {
        return recipes[recipeIndex];
    } else {
        return null;
    }
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1);
        saveRecipes();
    }
}

const addIngredient = (id, ingName) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex > -1) {
        recipes[recipeIndex].ingredients.push({
            name: ingName,
            avail: false
        });
        saveRecipes();
    }
}

const removeIngredient = (id, ingName) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex > -1) {
        const ingIndex = recipes[recipeIndex].ingredients.findIndex(ing => ing.name === ingName);
        if (ingIndex > -1) {
            recipes[recipeIndex].ingredients.splice(ingIndex, 1);
            saveRecipes();
        }
    }

}

const changeIngrAvail = (id, ingName, isAvail) => {
    const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex > -1) {
        const ingIndex = recipes[recipeIndex].ingredients.findIndex(ing => ing.name === ingName);
        if (ingIndex > -1) {
            recipes[recipeIndex].ingredients[ingIndex].avail = isAvail;
            saveRecipes();
        }
    }
}

recipes = loadRecipes();

export {
    getRecipes,
    createRecipe,
    removeRecipe,
    getRecipe,
    updateRecipe,
    addIngredient,
    removeIngredient,
    changeIngrAvail
}