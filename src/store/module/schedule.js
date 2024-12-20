export default {
  state: {
    beanHandler: {}
  },
  mutations: {
    setBeanHandler (state, beanHandler) {
      state.beanHandler = beanHandler;
    }
  },
  getters: {
    getBeanHandler: state => state.beanHandler
  },
  actions: {
    handle_beanHandler(context, beanHandler) {
      context.commit("setBeanHandler", beanHandler);
    }
  }
};
