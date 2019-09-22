import React from 'react';

import { 
  Text, 
  View, 
  TextInput,
  Button
} from 'react-native';

import server from '../../server/serverApi.js'

import modelApi from '../../modelApi.js'

export default class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			pass: '',
			passConfirm: '',
			view: 'login'
		}

		this.submitLogin = () => {
			// console.log('server: ', server)
			server.authUser(this.state.email, this.state.pass)
			.then(res => {
				console.log('res: ', res)
				
				res.success 
				? modelApi.dispatch({
					type: 'LOGIN'
				}) 
				: modelApi.dispatch({
					type: 'ADD_ERROR', 
					error: {
						category: 'login_password', 
						value: 'invalid_credentials'
					}
				})
			})
			.catch(err => modelApi.dispatch({type: 'ADD_ALERT', alert: {category: 'login', title: 'Login Failed', body: 'Connection error'}}))
		}

		this.submitSignup = () => {
			server.addUser(this.state.email, this.state.pass)
			.then(res => console.log('res: ', res))
			.catch(err => console.log('err: ', err))
		}

		this.setSignupView = () => this.setState({
			view: 'signup'
		})

		this.setLoginView = () => this.setState({
			view: 'login'
		})
	}

	renderPassConfirmInput() {
		return ([
			<Text>Password Confirm</Text>,
			<TextInput onChangeText={text => this.setState({passConfirm: text})}/>,
		])
	}

	render() {
		const view = this.state.view
		return (
			<View>
				<Text>{view === 'signup' ? 'Signup' : 'Login'}</Text>
				<Text>Email</Text>
				<TextInput onChangeText={text => this.setState({email: text})}/>
				<Text>Password</Text>
				<TextInput onChangeText={text => this.setState({pass: text})}/>
				{ 
					view === 'signup' 
					? this.renderPassConfirmInput() 
					: null 
				}
				<Button onPress={view === 'login' ? this.submitLogin : this.submitSignup} title="Submit!"/>
				<Button onPress={view === 'login' ? this.setSignupView : this.setLoginView} title={view === 'login' ? 'Signup' : 'Back'}/>
			</View>
		)
	}
}