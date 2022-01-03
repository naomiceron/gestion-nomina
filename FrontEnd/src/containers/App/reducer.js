const initalState = {
    allMyIngredients: [],
    ingredients: []
};

let currentIngredients = [];
const appReducer = (state = initalState, action) => {
    switch (action.type){
        case 'ADD_INGREDIENT':
            currentIngredients = state.allMyIngredients;
            currentIngredients.push(action.ingredient);
            return {
                ...state,
                allMyIngredients: [...currentIngredients]
            };
        case 'START_OVER':
            return{
                ...state,
                allMyIngredients: []
            };
        case 'DELETE_INGREDIENT':
            currentIngredients = state.allMyIngredients;
            currentIngredients.splice(action.position,1);
            return{
                ...state,
                allMyIngredients: [...currentIngredients]
            };            
        case 'CHANGE_POSITION':
            currentIngredients = state.allMyIngredients;
            var moving = currentIngredients[action.index];
            if(action.move === "up"){
                currentIngredients.splice(action.index,1);
                currentIngredients.splice(action.index - 1, 0, moving);
            }
            else{
                currentIngredients.splice(action.index,1);
                currentIngredients.splice(action.index + 1, 0, moving);
            }
            return{
                ...state,
                allMyIngredients: [...currentIngredients]
            };
        case 'SET_INGREDIENTS':
            return {
                ...state,
                ingredients: [...action.ingredients]
            };    
        default: return state;
    }
};

export default appReducer;