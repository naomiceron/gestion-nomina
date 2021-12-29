import React from 'react';
import { connect } from 'react-redux';

const HamburguerView = props => {
    const {allMyIngredients} = props;
    return (
        <div className='hamburguer-view'>
            <h2> Mi Hamburguesa</h2>
            <ul className='burger'>
                {
                    allMyIngredients.map((ingredient, index) =>{
                        return(
                        <li key={'ingredients' + ingredient.id + index } className={ingredient.classes}></li>
                    )})
                }
            </ul>
            <h3>
                Calorías Totales: 
                {
                    allMyIngredients.length > 0
                    ? allMyIngredients.map(ingredient => ingredient.calories).reduce((a,b) => a+b)
                    : '0'
                } Kcal.
            </h3>
        </div>
    );
}

const mapStateToProps = state => ({
    allMyIngredients: state.app.allMyIngredients
  });
  const mapDispatchToProps = dispatch => ({

  });

export default connect(mapStateToProps, mapDispatchToProps) (HamburguerView);