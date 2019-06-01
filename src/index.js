import {
    createRecipe
} from './recipes';
import {
    renderRecipes
} from './views';

renderRecipes();

document.getElementById('addRecipe').addEventListener('click', e => {
    const id = createRecipe();
    // renderRecipes();
    location.assign(`/edit.html#${id}`);
});