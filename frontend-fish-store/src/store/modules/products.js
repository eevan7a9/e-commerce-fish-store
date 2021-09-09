import axios from "axios";

const headers = (token, multipart = false) => ({
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
    ...(multipart && {"content-type": "multipart/form-data"})
})

const state = {
    products: [{
            "id": 1,
            "name": "TAISHO SANKE",
            "description": "Taisho Sanke, or Sanke for short, are koi with a solid white base overlaid by patterns of both red and black. It is commonly said that a high quality Sanke pattern begins with a great Kohaku pattern, to which the black is a welcome complement.",
            "price": "120.50",
            "weight": "3.28",
            "units": 21,
            "image_location": "https://ik.imagekit.io/wr5lnrww0q8/koistore/catalog/TAISHO_SANKE_Sv9moOuSj.jpeg?updatedAt=1631180441306",
            "created_at": "2019-11-08 14:36:56",
            "updated_at": "2019-12-01 09:53:43",
            "deleted_at": null,
            "image": "1575244423.jpg"
        },
        {
            "id": 6,
            "name": "HARIWAKE",
            "description": "Hariwake display a solid metallic-white base coupled with bright, vibrant patterns of yellow or orange. The bright, luminous white of Hariwake differs from the softer, matte-white of Kohaku and Sanke. Hariwake with a bright yellow pattern are commonly referred to as Lemon Hariwake.",
            "price": "320.50",
            "weight": "2.50",
            "units": 50,
            "image_location": "https://ik.imagekit.io/wr5lnrww0q8/koistore/catalog/HARIWAKE_LTyMsgOJtqg.jpeg?updatedAt=1631180440889",
            "created_at": "2019-11-07 13:36:56",
            "updated_at": "2019-12-01 09:54:03",
            "deleted_at": null,
            "image": "1575244443.jpg"
        },
        {
            "id": 4,
            "name": "SHIRO UTSURI",
            "description": "Shiro Utsuri are koi with a black base overlain by areas of white. A high quality Shiro Utsuri will combine clean white patterns with a deep, lacquer-like black.",
            "price": "120.50",
            "weight": "2.25",
            "units": 15,
            "image_location": "https://ik.imagekit.io/wr5lnrww0q8/koistore/catalog/SHIRO_UTSURI_U4HzS0HH3.jpeg?updatedAt=1631180437330",
            "created_at": "2019-11-06 12:36:56",
            "updated_at": "2019-12-01 09:54:18",
            "deleted_at": null,
            "image": "1575244458.jpg"
        },
        {
            "id": 5,
            "name": "HI UTSURI",
            "description": "Hi Utsuri combine the lacquer-black base color with patterns of deep red or orange. Red Hi Utsuri are superior to orange. Many Hi Utsuri will display a dull orange pattern at a young age, which may develop into a brighter and more desirable red pattern as the koi grows and matures.",
            "price": "120.50",
            "weight": "3.15",
            "units": 32,
            "image_location": "https://ik.imagekit.io/wr5lnrww0q8/koistore/catalog/HI_UTSURI_qUxyDxRkl.jpeg?updatedAt=1631180438577",
            "created_at": "2019-11-06 11:36:56",
            "updated_at": "2019-12-01 09:55:20",
            "deleted_at": null,
            "image": "1575244520.jpg"
        },
        {
            "id": 2,
            "name": "KOHAKU",
            "description": "Kokaku, the oldest and most well known variety of koi, have a solid white base with patterns of red overlaid on top of the white. Top quality Kohaku display a bright, blemish-free white combined with deep, vibrant red tones. The even distribution of the pattern along the body is also very important.",
            "price": "220.50",
            "weight": "2.25",
            "units": 30,
            "image_location": "https://ik.imagekit.io/wr5lnrww0q8/koistore/catalog/KOHAKU_vIElSTGYE.jpeg?updatedAt=1631180437774",
            "created_at": "2019-11-06 11:26:56",
            "updated_at": "2019-12-01 09:54:34",
            "deleted_at": null,
            "image": "1575244474.jpg"
        },
        {
            "id": 3,
            "name": "TANCHO",
            "description": "Tancho is a hugely popular variation of Kohaku, in which the only red pattern appears as a single red dot on the head. The symmetry and placement of the Tancho mark are main factors in determining the quality of any particular koi.",
            "price": "220.50",
            "weight": "1.25",
            "units": 30,
            "image_location": "https://ik.imagekit.io/wr5lnrww0q8/koistore/catalog/TANCHO_UWPTbDWef.jpeg?updatedAt=1631180440005",
            "created_at": "2019-11-05 14:16:56",
            "updated_at": "2019-12-01 09:54:52",
            "deleted_at": null,
            "image": "1575244492.jpg"
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