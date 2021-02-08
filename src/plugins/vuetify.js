import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        primary: "#65B32E",
        secondary: "#353637",
        accent: "#7C1F22",
        error: "#D90C0C",
        info: "#0565B7",
        success: "#4A9A4A",
        warning: "#FFAC33"
      },
      dark: {
        primary: "#008FBB",
        secondary: "#353637",
        accent: "#7C1F22",
        error: "#D90C0C",
        info: "#0565B7",
        success: "#4A9A4A",
        warning: "#FFAC33"
      }
    }
  }
});
