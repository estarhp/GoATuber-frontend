const mutations = {
    getModelType(state,modelType){
        state.modelType = modelType
    },
    setLoading(state,loadingInstance){
        state.loading = loadingInstance
    },
    closeLoading(state){
        state.loading.close()
    }
}

export default mutations