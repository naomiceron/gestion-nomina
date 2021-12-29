import axios from '../../axios';

const appActions = {
    addIngredient: ingredient => {
        return {
            type: "ADD_INGREDIENT",
            ingredient
        };
    },
    startOver: () =>{
        return{
            type: "START_OVER"
        }
    },
    deleteIngredient: position => {
        return{
            type: "DELETE_INGREDIENT",
            position
        }
    },
    changePosition: (index, move) =>{
        return{
            type: "CHANGE_POSITION",
            index, move
        }
    },
    setIngredients: () => (
        (dispatch) => {
            axios.get('/ingredients')
            .then(res => {
                dispatch({
                    type: "SET_INGREDIENTS",
                    ingredients:  res.data
                  });
            })
        }
    )
};

export default appActions;