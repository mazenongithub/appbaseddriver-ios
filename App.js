import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import combinedReducer from './components/reducers';
import { Provider } from 'react-redux';
import AppBasedDriver from './components'
const store = createStore(combinedReducer, {}, applyMiddleware(reduxThunk));


class App extends Component {

  render() {

    return(<Provider store={store}><AppBasedDriver /></Provider>)
  
  }
}

export default App;


