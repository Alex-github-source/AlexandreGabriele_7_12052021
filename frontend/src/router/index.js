import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import WallofPosts from '../views/WallofPosts.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/wall',
    name: 'WallofPosts',
    component: WallofPosts
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode:"history",
  base: "groupo_db",
  routes
})

export default router
