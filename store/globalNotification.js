export const state = () => ({
  isShown: false,
  color: "success",
  message: "",
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
  show(state, notification) {
    //isShown nilai-nya pasti true pada saat pemanggilan
    state.isShown = true;
    state.color = notification.color ? notification.color : "success";

    let rawMessage = notification.message;
    // if(rawMessage.request){
    //   state.message = 'HTTP Error [' + rawMessage.request.status + ']: ' + rawMessage.request.statusText
    // }else if(rawMessage.response){
    if (rawMessage.response) {
      if (typeof rawMessage.response.data.error == "string") {
        state.message =
          "HTTP Error [" +
          rawMessage.response.status +
          "]: " +
          rawMessage.response.data.error;
      } else {
        state.message =
          "HTTP Error [" +
          rawMessage.response.status +
          "]: " +
          rawMessage.response.statusText;
      }
    } else if (typeof rawMessage == "string") {
      state.message = rawMessage;
    } else {
      state.message = rawMessage.message;
    }
  },
};
