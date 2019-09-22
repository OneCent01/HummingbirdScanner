const host = 'http://192.168.1.196:3000'

const ajax = (method, url, payload=undefined) => new Promise((resolve, reject) => {
	console.log('payload: ', payload)
	fetch(url, {
		method: method,
		body: payload,
		headers: {
		  Accept: 'application/json',
		  'Content-Type': 'application/json',
		}
	})
	.then(r => r.json()) 
	.then(resolve)
	.catch(reject)
})

const ping = () => ajax('GET', host) 

const addUser = (email, password) => new Promise((resolve, reject) => {
	const userData = JSON.stringify({ 
		email: email, 
		password: password
	})
	
	ajax('POST', `${host}/add-user`, userData)
	.then(resolve)
	.catch(reject)
})

const authUser = (email, password) => new Promise((resolve, reject) => {
	const userData = JSON.stringify({ 
		email: email, 
		password: password
	})
	
	ajax('POST', `${host}/auth-user`, userData)
	.then(resolve)
	.catch(reject)
})

const getUser = (data) => new Promise((resolve, reject) => {
	const param = data.email ? 'email' : 'id'

	const value = (
		data.email ? data.email 
		: data.index ? data.index 
		: 1
	)

	ajax('GET', `${host}/get-user?${param}=${value}`)
	.then(resolve)
	.catch(reject)
})

const scanProduct = barcode => new Promise((resolve, reject) => {
	ajax('GET', `${host}/scan-product?barcode=${barcode}`)
	.then(resolve)
	.catch(reject)
})

const serverApi = {
	ping,
	addUser,
	getUser,
	authUser,
	scanProduct
}

export default serverApi