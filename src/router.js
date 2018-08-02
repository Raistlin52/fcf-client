import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'
import FCFBet from '@/components/FCFBet'
// import PastWeek from '@/components/PastWeek'
// import AppHome from '@/components/AppHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/week/:week_num',
      name: 'Week',
      component: FCFBet
    },
    {
      path: '/',
      redirect: '/week/1'
    }
    /* {
      path: '/oldhome',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    } */
  ]
})
