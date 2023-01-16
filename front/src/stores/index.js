import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { markRaw } from 'vue'
import router from '@/router'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  const pinia = createPinia()

  pinia.use(({ store }) => { // Use router in pinia stores
    store.router = markRaw(router)
  })

  pinia.use(piniaPluginPersistedstate) // Persist Pinia through refresh via local storage

  return pinia
})
