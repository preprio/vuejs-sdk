# Prepr SDK for Vue.js

This is the official Prepr SDK for Vue.js. It provided a standardized way for your team to communicate with the Prepr API.

## Getting started

### Installation

Getting started is simple. Scaffoled a Vue.js project.

`npx create-vue-app prepr-demo`

And navigate to your new site.

`cd prepr-demo`

Once you've done that, you can simply install the plugin by running.

`npm i @preprio/vuejs-sdk`

### Configuration

Okay, now we can register the plugin inside `src/index.js` and modify the default settings.

```js
// src/index.js

import Vue from 'vue'
import App from './components/App.vue'
import { PreprPlugin } from '@preprio/vuejs-sdk'

Vue.use(PreprPlugin, {
  token: null,
  baseUrl: 'https://cdn.prepr.io',
  timeout: 4000,
  userId: null,
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
})
```

By default, the base url will be `https://cdn.prepr.io` and the timeout before the request fails `4000` ms. The two values are not required. However. The `token` is required in order to make API calls. You can obtain the API token from the Prepr Dashboard.

## Usage

Let's make that plugin do some work.

```js
<script>
export default {
  data() {
    return {
      publications: {}
    }
  },

  async mounted() {
    const publication = await $prepr
      .path(`/publications/${id}`)
      .query('...')
      .fetch();

    this.publications = publications
  },
}
</script>
```

By default, Vue.js doesn't ship with a router. To resolve data based on route parameters, we suggest using [Vue Router](https://router.vuejs.org/). You can install Vue Router easily by running `npm install vue-router` in your project or `vue add router` if you're using [Vue CLI](https://cli.vuejs.org/). Now you should be able to access data by id or slug.

```js
<script>
export default {
  data() {
    return {
      publication: {}
    }
  },

  async mounted() {
    const id = $route.params.id

    const publication = await this.$prepr
      .path(`/publications/${id}`)
      .fetch()

    this.publication = publication
  },
}
</script>
```

## More info

Want to know all available methods? Read more at [@preprio/nodejs-sdk](https://prepr.dev/docs/technologies/v1/introduction-node) or join our community on [Slack](https://slack.prepr.io). 
