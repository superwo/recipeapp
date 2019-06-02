import {
    removeRecipe,
    updateRecipe,
    addIngredient,
    removeIngredient,
    changeIngrAvail
} from './recipes';
import {
    initializeEdit
} from './views';

const recipeId = location.hash.substring(1);
const recipe = initializeEdit(recipeId);
if (recipe) {
    console.log(recipe);
} else {
    location.assign('/');
}

const removeButton = document.querySelector('.btn-delete');
const title = document.querySelector('.input-title');
const instruction = document.querySelector('.input-desc');
const addIngButton = document.querySelector('.btn-ing');
const inputIng = document.querySelector('.input-ingredient');
const ingrList = document.querySelector('.ingr-list');




removeButton.addEventListener('click', e => {
    removeRecipe(recipeId);
    location.assign('/');
});


title.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
});
instruction.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        instructions: e.target.value
    })
});

addIngButton.addEventListener('click', () => {
    const text = inputIng.value.trim();
    if (text.length > 0) {
        addIngredient(recipeId, text);
        initializeEdit(recipeId);
        inputIng.value = '';
    }
});

ingrList.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        const name = e.target.dataset.name.trim();
        removeIngredient(recipeId, name);
        initializeEdit(recipeId);
    }
})
ingrList.addEventListener('change', e => {
    if (e.target.nodeName === 'INPUT') {
        const ingName = e.target.parentNode.parentNode.querySelector('.ingr-remove').dataset.name;
        changeIngrAvail(recipeId, ingName, e.srcElement.checked);
    }
})