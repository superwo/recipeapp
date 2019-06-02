import {
    getRecipes,
    getRecipe
} from './recipes';

const renderRecipes = () => {
    const recipes = getRecipes();
    const searchInput = document.getElementById('search');
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchInput.value.trim().toLowerCase()));
    const contentElement = document.querySelector('.content');
    contentElement.textContent = '';

    if (filteredRecipes.length > 0) {
        const ulElement = document.createElement('ul');
        ulElement.classList.add('recipes');
        for (let recipe of filteredRecipes) {
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
    pElement.textContent = getIngrAvail(recipe.ingredients);

    aElement.appendChild(hElement);
    aElement.appendChild(pElement)
    liElement.appendChild(aElement);

    return liElement;
}

const getIngrAvail = (ingredients) => {
    const availNum = ingredients.reduce((prev, curr) => {
        if (curr.avail) {
            prev = prev + 1;
        }
        return prev;
    }, 0);
    if (availNum === 0) {
        return 'You have none of the ingredients';
    } else if (availNum < ingredients.length) {
        return 'You have some of the ingredients';
    } else {
        return 'You have all the ingredients';
    }
}

const initializeEdit = (recipeId) => {
    const recipe = getRecipe(recipeId);
    const title = document.querySelector('.input-title');
    const instruction = document.querySelector('.input-desc');
    const ingList = document.querySelector('.ingr-list');
    const ingHeader = document.querySelector('.ingr-header');

    ingList.textContent = '';

    if (recipe) {
        title.value = recipe.title;
        instruction.value = recipe.instructions;
        if (recipe.ingredients.length > 0) {
            ingHeader.textContent = 'Ingredients';
            for (let ingredient of recipe.ingredients) {
                ingList.appendChild(createIngredientElement(ingredient));
            }
        } else {
            ingHeader.textContent = 'Add some ingredients';
        }
    }
    return recipe;
}

const createIngredientElement = (ingredient) => {
    const liElement = document.createElement('li');
    const labelElement = document.createElement('label');
    const chElement = document.createElement('input');
    const buttonElement = document.createElement('button');
    chElement.setAttribute('type', 'checkbox');
    if (ingredient.avail) {
        chElement.setAttribute('checked', 'checked');
    }
    labelElement.appendChild(chElement);
    labelElement.append(ingredient.name);
    liElement.appendChild(labelElement);
    buttonElement.classList.add('ingr-remove');
    buttonElement.textContent = 'Remove';
    buttonElement.setAttribute('data-name', ingredient.name);
    liElement.appendChild(buttonElement);
    return liElement;
}

export {
    renderRecipes,
    initializeEdit
};