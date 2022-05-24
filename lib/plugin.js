import { createPreprClient } from "@preprio/nodejs-sdk";

const PreprPlugin = {
  install(Vue, options) {
    const {
      token,
      timeout = 4000,
      baseUrl = "https://cdn.prepr.io",
      userId = null,
    } = options;

    const version = Number(Vue.version.split(".")[0]);
    if (version >= 3) {
      Vue.config.globalProperties.$prepr = createPreprClient({
        token,
        baseUrl,
        timeout,
        userId,
      });
    } else {
      Vue.prototype.$prepr = createPreprClient({
        token,
        baseUrl,
        timeout,
        userId,
      });
    }
  },
};

export { PreprPlugin };