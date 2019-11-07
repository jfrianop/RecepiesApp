import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Recepies from './pages/Recepies'
import NewRecepie from './pages/NewRecepie'
import NewIngridient from './pages/NewIngridient'
import RecepieDetails from './pages/RecepieDetails'
import Register from './pages/Register'
import Login from './pages/Login'

const Routes = createStackNavigator({
  login: Login,
  register: Register,
  recepies: Recepies,
  newRecepie: NewRecepie,
  newIngridient: NewIngridient,
  recepieDetails: RecepieDetails,
});

const AppContainer = createAppContainer(Routes);

export default function App() {
  return (
    <AppContainer />
  );
}