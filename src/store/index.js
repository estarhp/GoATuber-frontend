import { createStore } from 'vuex'
import actions from "./actions.js";
import mutations from "./mutations.js";
import state from "./state.js";


const store = createStore({
    actions,
    mutations,
    state
});

export default store