import React from 'react';
import { connect } from 'react-redux';


const CostViewer = props => {
    const {allMyIngredients} = props;
    return (
        <div className = 'cost-viewer'>
            <h2>Costo Final</h2>
            <h1>
                $
                {
                    allMyIngredients.length > 0
                    ? allMyIngredients.map(ingredient => ingredient.cost).reduce((a,b) => a + b)
                    : '0.00'
                }
            </h1>
        </div>
    );
}

const mapStateToProps = state => ({
    allMyIngredients: state.app.allMyIngredients
   });
   const mapDispatchToProps = dispatch => ({
 
   });
 
 export default connect(mapStateToProps, mapDispatchToProps) (CostViewer);