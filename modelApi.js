const modelTemplate = {
	authenticated: false,
	view: 'products',
	cameraOpen: false,
	products: [],
	errors: [],
	alerts: []
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
	DISPLAY_ADD_PRODUCT: (state, action) => ({...state, view: 'addProduct'}),
	ADD_ERROR: (state, action) => ({...state, errors: [...state.errors, action.error]}),
	DISMISS_ERROR: (state, action) => ({...state, errors: state.errors.filter(error=>error.category !== action.category)}),
	ADD_ALERT: (state, action) => ({...state, alerts: [...state.alerts, action.alert]}),
	DISMISS_ALERT: (state, action) => ({...state, alerts: state.alerts.filter(alert=>alert.category !== action.category)}),

}

const reduce = (state, action) => reducers[action.type] ? reducers[action.type](state, action) : state

const modelApi = {
	getState: () => model,
	dispatch: (action) => {
		console.log(`${action.type}: `, action)
		model = reduce(model, action)
		subscribers.forEach(sub => sub(model))
	},
	subscribe: fn => subscribers.push(fn)
}

export default modelApi