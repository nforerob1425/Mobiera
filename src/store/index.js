import Vue from "vue";
import Vuex from "vuex";
import { license } from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workspaceId:0,
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    license
  }
});
