import { createPreprClient } from './prepr-client'

const PreprPlugin = {}

PreprPlugin.install = function (Vue, options = {}) {
  const {
    token,
    timeout = 4000,
    baseUrl = 'https://api.eu1.prepr.io',
  } = options

  const preprClient = createPreprClient({
    token,
    baseUrl,
    timeout,
  })

  Vue.prototype.$prepr = async function (
    url,
    { query, sort, limit } = {},
    options,
  ) {
    return await preprClient(url, { query, sort, limit }, options)
  }
}

export { PreprPlugin }
