const state = {
	app_Loader: 0,
}
const getters = {
	appLoader: state => state.app_Loader
}
const mutations = {
	setLoader: state => state.app_Loader = !state.app_Loader
}
const actions = {
	toggleLoader: ({ commit }) => commit('setLoader')
}

export default {
	state,
	getters,
	mutations,
	actions
}