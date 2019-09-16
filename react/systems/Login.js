import React from 'react';

import { 
  Text, 
  View, 
  TextInput,
  Button
} from 'react-native';

export default class Login extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
		  <View>
		    <Text>Login</Text>
		    <TextInput/>
		    <Text>Password</Text>
		    <TextInput/>
		    <Button title="Submit!"/>
		  </View>
		)
	}
}