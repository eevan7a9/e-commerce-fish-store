import axios from "axios";

const state = {
    products: []
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
            found_product.image_location = updated_product.image_location;
        }
    },
    setProducts: (state, products) => state.products = products,
    removeProduct: (state, id) => state.products = state.products.filter(product => product.id != id)
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
        // console.log(product);
        return axios.post('/product', formData, {
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
        // console.log(product);
        return axios.post(`/product/${product.id}`, formData, {
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
    },
    deleteProduct: async ({ commit, rootState }, id) => {
        return axios.post(`/product/${id}`, {
            _method: 'delete'
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${rootState.auth.myToken}`
            }
        }).then(res => {
            commit("removeProduct", id);
            return res;
        }).catch(err => {
            return err.response;
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}