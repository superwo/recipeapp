import {
    getRecipes,
    getRecipe
} from './recipes';

const renderRecipes = () => {
    const recipes = getRecipes();
    const contentElement = document.querySelector('.content');
    contentElement.textContent = '';

    if (recipes.length > 0) {
        const ulElement = document.createElement('ul');
        ulElement.classList.add('recipes');
        for (let recipe of recipes) {
            let liElement = createDomElement(recipe);
            ulElement.appendChild(liElement);
        }
        contentElement.appendChild(ulElement);
    } else {
        const p = document.createElement('p');
        p.textContent = 'No recipes';
        contentElement.appendChild(p);
    }
};

const createDomElement = (recipe) => {
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');
    const hElement = document.createElement('h4');
    const pElement = document.createElement('p');

    liElement.classList.add('recipe');
    aElement.setAttribute('href', `/edit.html#${recipe.id}`);
    aElement.classList.add('recipe__link');
    hElement.classList.add('recipe__title');
    hElement.textContent = recipe.title;
    pElement.textContent = 'You have all the ingredients';

    aElement.appendChild(hElement);
    aElement.appendChild(pElement)
    liElement.appendChild(aElement);

    return liElement;
}

const initializeEdit = (recipeId) => {
    const recipe = getRecipe(recipeId);
    return recipe;
}

export {
    renderRecipes,
    initializeEdit
};