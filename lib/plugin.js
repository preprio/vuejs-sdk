import { createPreprClient } from '@preprio/nodejs-sdk'

const PreprPlugin = {}

PreprPlugin.install = function (Vue, options = {}) {
  const {
    token,
    timeout = 4000,
    baseUrl = 'https://cdn.prepr.io',
    userId = null,
  } = options

  Vue.prototype.$prepr = createPreprClient({
    token,
    baseUrl,
    timeout,
    userId,
  })
}

export { PreprPlugin }
