import {
    getRecipes
} from './recipes';

const renderRecipes = () => {
    const recipes = getRecipes();
    const contentElement = document.querySelector('.content');
    contentElement.textContent = '';

    if (recipes.length > 0) {
        const ulElement = document.createElement('ul');
        ulElement.classList.add('recipes');
        for (let recipe of recipes) {
            const liElement = document.createElement('li');
            liElement.textContent = recipe.title;
            ulElement.appendChild(liElement);
        }
        contentElement.appendChild(ulElement);
    } else {
        const p = document.createElement('p');
        p.textContent = 'No recipes';
        contentElement.appendChild(p);
    }
}

export {
    renderRecipes
};