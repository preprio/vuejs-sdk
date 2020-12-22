import fetch from 'node-fetch'
import AbortController from 'abort-controller'

function createPreprClient({ token, baseUrl, timeout = 4000 }) {
  return async (url, { query, sort, limit } = {}, options) => {
    const controller = new AbortController()

    const fetchTimeout = setTimeout(() => {
      controller.abort()
    }, timeout)

    const hasQueryString = queryStringBuilder({ query, sort, limit })

    try {
      const response = await fetch(baseUrl + url + `?${hasQueryString}`, {
        ...options,
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      return data
    } catch (error) {
      throw new Error(error)
    } finally {
      clearTimeout(fetchTimeout)
    }
  }
}

function queryStringBuilder({ query, sort, limit }) {
  const queryString = new URLSearchParams()

  if (query) {
    queryString.append('fields', query.replace(/\s/g, ''))
  }

  if (sort) {
    queryString.append('sort', sort)
  }

  if (limit) {
    queryString.append('limit', limit)
  }

  return queryString.toString()
}

export { createPreprClient, queryStringBuilder }
