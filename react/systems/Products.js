import React from 'react';

import { 
  Text, 
  View, 
  TextInput,
  Button
} from 'react-native';

import modelApi from '../../modelApi.js'

export default class Products extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
			<View>
				<Text>PRODUCTS</Text>
				<Button onPress={() => modelApi.dispatch({type: 'OPEN_CAMERA'})} title="ADD PRODUCT!"/>
			</View>
		)
	}
}