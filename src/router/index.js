const Live2d = () => import( "../live2d/Live2d.vue")
const VRM =  ()=> import("../vrm/VRM.vue")

import {createRouter, createWebHashHistory} from "vue-router";
const routes = [
    {

    },
    {
        name:"live2d",
        path:"/live2d/:modelName",
        component:Live2d,
        props:true
    },
    {
        name: "vrm",
        path:"/vrm/:modelName",
        component: VRM,
        props: true
    }
]


const  router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router