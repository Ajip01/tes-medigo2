import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Dashboard utama
const menu = () => import('@/view/Menu')

// Menu Utama
const searchDokter = () => import('@/view/Booking/search_dokter')
const detailDokter = () => import('@/view/Booking/detail_dokter')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: menu
        },
        {
          path: 'menu',
          redirect: '/menu/searchDokter',
          name: 'Menu Utama',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'searchDokter',
              name: 'Pilih Jenis Dokter',
              component: searchDokter
            },
            {
              path: 'detailDokter/:id',
              name: 'Detail Dokter',
              component: detailDokter
            }
          ]
        }
      ]
    },
    // {
    //   path: '/pages',
    //   redirect: '/pages/404',
    //   name: 'Pages',
    //   component: {
    //     render (c) { return c('router-view') }
    //   },
    //   children: [
    //     {
    //       path: '404',
    //       name: 'Page404',
    //       component: Page404
    //     },
    //     {
    //       path: '500',
    //       name: 'Page500',
    //       component: Page500
    //     },
    //     {
    //       path: 'login',
    //       name: 'Login',
    //       component: Login
    //     },
    //     {
    //       path: 'register',
    //       name: 'Register',
    //       component: Register
    //     }
    //   ]
    // }
  ]
})
