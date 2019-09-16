/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Login from './react/systems/Login'
import Products from './react/systems/Products'
import Settings from './react/systems/Settings'
import Warnings from './react/systems/Warnings'
import AddProduct from './react/systems/AddProduct'
import Camera from './react/systems/Camera'

import { 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button
} from 'react-native';

import modelApi from './modelApi'

export default class App extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const state = modelApi.getState()
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {
          state.cameraOpen ? (<Camera {...state}/>)
          : !state.authenticated ? (<Login {...state}/>)
          : state.view === 'products' ? (<Products {...state}/>)
          : state.view === 'settings' ? (<Settings {...state}/>)
          : state.view === 'warnings' ? (<Warnings {...state}/>)
          : state.view === 'addProduct' ? (<Warnings {...state}/>)
          : null
        }
      </TouchableWithoutFeedback>
    )
  }
}
