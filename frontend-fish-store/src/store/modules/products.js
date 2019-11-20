import axios from "axios";

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
    insertProduct: (state, new_product) => state.products = [new_product, ...state.products],
    updateProduct: (state, updated_product) => {
        const found_product = state.products.find(product => product.id == updated_product.id);
        if (found_product) {
            found_product.name = updated_product.name;
            found_product.description = updated_product.description;
            found_product.weight = updated_product.weight;
            found_product.units = updated_product.units;
            found_product.price = updated_product.price;
        }
    },
    setProducts: (state, products) => state.products = products
}
const actions = {
    getProducts: async ({ commit }) => {
        axios.get('/product')
            .then(res => {
                commit("setProducts", res.data.products);
            })
            .catch(err => {
                alert(err);
            })
    },
    addProduct: async ({ commit, rootState }, product) => {
        let formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('weight', product.weight);
        formData.append('units', product.units);
        if (product.image) {
            formData.append('image', product.image);
        }
        console.log(product);
        return axios.post('/product', formData,{
            headers: {
                "Accept": "application/json",
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${rootState.auth.myToken}`,
            }
        }).then(res => {
            // console.log(res);
            commit("insertProduct", res.data);
            return res;
        }).catch(err => {
            // console.log(err.response);
            return err.response;
        })
    },
    editProduct: async ({ commit, rootState }, product) => {
        let formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('weight', product.weight);
        formData.append('units', product.units);
        if (product.image) {
            formData.append('image', product.image);
        }
        console.log(product);
        return axios.post(`/product/${product.id}`, formData,{
            headers: {
                "Accept": "application/json",
                "content-type": "multipart/form-data",
                "Authorization": `Bearer ${rootState.auth.myToken}`
            }
        }).then(res => {
            // console.log(res)
            commit("updateProduct", res.data);
            return res
        }).catch(err => {
            // console.log(err.response);
            return err;
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}