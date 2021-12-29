import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import appActions from '../containers/App/actions';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const IngredientsList = props =>{
    const {allMyIngredients, startOver, deleteIngredient, changePosition} = props;
    return(
        <div className= 'ingredientes-list'>
            <h2>Lista de Ingredientes</h2>
            <div>
                {
                    allMyIngredients.map((ingredient, index) => (
                        <div key={'ingredients' + ingredient.id + index }><div class="row">                         
                        <div class="col-md-5">{ingredient.ingredient } </div>
                        <div class="col-md-4"><Button onClick={ () => deleteIngredient(index)}> <HighlightOffIcon/> </Button> <Button onClick={() => changePosition(index, "up")}><KeyboardArrowUpIcon/></Button><Button onClick={()=> changePosition(index, "down")}><KeyboardArrowDownIcon/></Button></div >
                        </div ></div >
                    ))
                }
            </div>
            <Button
                onClick={startOver}
                variant = 'contained'
                color = 'default'
                size = 'large'
                className = 'ingredient'
            >
              Volver a iniciar
            </Button>
        </div>
    );
}

const mapStateToProps = state => ({
    allMyIngredients: state.app.allMyIngredients
  });
  const mapDispatchToProps = dispatch => ({
    startOver: () => {
        dispatch(appActions.startOver())
      },
    deleteIngredient: position => {
        dispatch(appActions.deleteIngredient(position))
    },
    changePosition: (index, move) => {
        dispatch(appActions.changePosition(index, move))
    }
  });

export default connect(mapStateToProps, mapDispatchToProps) (IngredientsList);