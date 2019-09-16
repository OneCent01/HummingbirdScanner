const modelTemplate = {
	authenticated: false,
	view: 'products',
	cameraOpen: false,
	products: []
}

let model = {...modelTemplate}
const subscribers = []

const reducers = {
	LOGIN: (state, action) => ({...state, authenticated: true}),
	LOGOUT: (state, action) => ({...modelTemplate}),
	OPEN_CAMERA: (state, action) => ({...state, cameraOpen: true}),
	CLOSE_CAMERA: (state, action) => ({...state, cameraOpen: false}),
	DISPLAY_SETTINGS: (state, action) => ({...state, view: 'settings'}),
	DISPLAY_PRODUCTS: (state, action) => ({...state, view: 'products'}),
	DISPLAY_WARNINGS: (state, action) => ({...state, view: 'warnings'}),
	DISPLAY_ADD_PRODUCT: (state, action) => ({...state, view: 'addProduct'})
}

const reduce = (state, action) => reducers[action.type] ? reducers[action.type](state, action) : state

const modelApi = {
	getState: () => model,
	dispatch: (action) => {
		model = reduce(model, action)
		subscribers.forEach(sub => sub(model))
	},
	subscribe: fn => subscribers.push(fn)
}

export default modelApi