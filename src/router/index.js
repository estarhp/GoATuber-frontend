import Live2d from "../live2d/Live2d.vue"
import VRM from "../vrm/VRM.vue";
import {createRouter, createWebHashHistory} from "vue-router";
const routes = [
    {
        path:"/live2d",
        component:Live2d
    },
    {
        path:"/vrm",
        component: VRM
    }
]


const  router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router