import { createStore } from "vuex";

export const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    setCount(state, value) {
      state.count = value;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    },
    setCount(context, value) {
      context.commit('setCount', value)
    }
  }
});
