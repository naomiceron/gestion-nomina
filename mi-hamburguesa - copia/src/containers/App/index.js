import './App.css';
import React from 'react';
import Header from '../../components/Header';
import CostViewer from '../../components/CostViewer';
import IngredientsList from '../../components/IngredientsList';
import HamburguerView from '../../components/HamburguerView';
import { Grid, Container, Card, CardContent, Button} from '@material-ui/core';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import appActions from './actions';
import { connect } from 'react-redux';
import withMessageHandler from '../../hoc/withMessageHandler';
import withLoadHandler from '../../hoc/withLoadHandler';

class App extends React.Component {
  constructor(props){
    super(props);
    console.log('El componente se cargó');
   
  }
  
  componentDidMount(){
    console.log('El componente se ha montado');
    const {setIngredients} = this.props;
    setIngredients();
  }


  render(){
    const {addIngredient, ingredients} = this.props;
    return (
      <Container className="App">
        <Header title = 'Mi Hamburguesa'/>
        <Grid container spacing= {2}>
          <Grid item sm={ 12 } md={ 6 } className='ingredients-form'>
              <Card raised>
                <CardContent>
                  <h2>Selecciona un ingrediente</h2>                  
                  <div>
                    {
                      ingredients.map(item =>(
                        <Button
                          key={ item.id } 
                          value={ item.id }
                          onClick={ () => addIngredient(item)}
                          variant = 'contained'
                          color = 'default'
                          size = 'large'
                          className = 'ingredient'
                          >
                            <PlusOneIcon/>  
                            {item.ingredient} 
                        </Button>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
          </Grid> 
          <Grid item sm={ 12 } md={ 6 }>
            <Card raised>
              <CardContent>
                <CostViewer/>
              </CardContent>
            </Card>
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
            <Card raised>
              <CardContent>
                <IngredientsList/>
              </CardContent>
            </Card>
        </Grid>
        <Grid item sm={ 12 } md={ 8 }>
            <Card raised>
              <CardContent>
                <HamburguerView  />
              </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Container>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.app.ingredients
});
const mapDispatchToProps = dispatch => ({
  addIngredient: ingredient => {
    dispatch(appActions.addIngredient(ingredient))
  },
  setIngredients: () => {
    dispatch(appActions.setIngredients())
  }
});

export default withLoadHandler(withMessageHandler(connect(mapStateToProps, mapDispatchToProps) (App)));
