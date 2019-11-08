const state = {
    products: [
        {
            id: 1,
            name: "Koi First",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in semper ex, tincidunt egestas ligula. Aenean augue lorem, blandit eu urna id, sodales condimentum tellus.",
            units: 20,
            weight: 3.5,
            price: 100.00
        },
        {
            id: 2,
            name: "Koi Second",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in semper ex, tincidunt egestas ligula. Aenean augue lorem, blandit eu urna id, sodales condimentum tellus.",
            units: 15,
            weight: 3.5,
            price: 120.00
        },
        {
            id: 3,
            name: "Koi Third",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in semper ex, tincidunt egestas ligula. Aenean augue lorem, blandit eu urna id, sodales condimentum tellus.",
            units: 22,
            weight: 3.5,
            price: 110.00
        },
        {
            id: 4,
            name: "Koi Fourth",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in semper ex, tincidunt egestas ligula. Aenean augue lorem, blandit eu urna id, sodales condimentum tellus.",
            units: 20,
            weight: 3.5,
            price: 232.00
        },
        {
            id: 5,
            name: "Koi Fifth",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in semper ex, tincidunt egestas ligula. Aenean augue lorem, blandit eu urna id, sodales condimentum tellus.",
            units: 32,
            weight: 3.5,
            price: 150.00
        }
    ]
}
const getters = {
    products: state => state.products
}
const mutations = {
    insertProduct: (state, new_product) => state.products.push(new_product)
}
const actions = {
    addProduct: async ({ commit }, product) => {
        commit("insertProduct", product)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}