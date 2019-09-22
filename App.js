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

    this.state = modelApi.getState()

    modelApi.subscribe(state => this.setState(state))
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {
          this.state.cameraOpen ? (<Camera {...this.state}/>)
          : !this.state.authenticated ? (<Login {...this.state}/>)
          : this.state.view === 'products' ? (<Products {...this.state}/>)
          : this.state.view === 'settings' ? (<Settings {...this.state}/>)
          : this.state.view === 'warnings' ? (<Warnings {...this.state}/>)
          : this.state.view === 'addProduct' ? (<Warnings {...this.state}/>)
          : null
        }
      </TouchableWithoutFeedback>
    )
  }
}
