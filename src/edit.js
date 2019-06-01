import {
    removeRecipe
} from './recipes';
import {
    initializeEdit
} from './views';

const recipeId = location.hash.substring(1);
const recipe = initializeEdit(recipeId);
if (recipe) {
    console.log(recipe);
    console.log('horoso');
} else {
    location.assign('/');
}

const removeButton = document.querySelector('.btn-delete');



removeButton.addEventListener('click', e => {
    removeRecipe(recipeId);
    location.assign('/');
});