export const state = () => ({
  isShown: false,
});

export const getters = {
  isShown: (state) => {
    return state.isShown;
  },
};

export const mutations = {
  hide(state) {
    state.isShown = false;
  },
  show(state) {
    state.isShown = true;
  },
};
