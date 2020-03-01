import Vue from "vue";
import Vuex from "vuex";
import User from "./user";
import TagsView from "./tagsView";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    TagsView
  }
});
