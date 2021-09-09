import axios from "axios";

const headers = (token, multipart = false) => ({
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
    ...(multipart && {"content-type": "multipart/form-data"})
})

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
        try {
            const res = await axios.get('/product');
            commit("setProducts", res.data.products);
        } catch (error) {
            alert.log(error);
        }
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
        try {
            const res = await axios.post('/product', formData, {
                headers: headers(rootState.auth.myToken, true)
            });
            commit("insertProduct", res.data);
            return res;
        } catch (error) {
            console.log(error)
            return error.response;
        }
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
        try {
            const res = await axios.post(`/product/${product.id}`, formData, {
                headers: headers(rootState.auth.myToken, true)
            });
            commit("updateProduct", res.data);
            return res
        } catch (error) {
            return error;
        }
    },
    deleteProduct: async ({ commit, rootState }, id) => {
        try {
            const res = await axios.post(`/product/${id}`, {
                _method: 'delete'
            }, {
                headers: headers(rootState.auth.myToken)
            });
            commit("removeProduct", id);
            return res;
        } catch (error) {
            return error.response;
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}