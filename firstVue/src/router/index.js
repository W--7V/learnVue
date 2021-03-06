import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/page/index'
import Content from '@/page/content'
import Profile from '@/page/profile'
import Post from '@/page/post'
import Table from '@/page/table'
import member from '@/page/member'

Vue.use(Router)

const Home = { template: '<div>Home</div>' }

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }, {
      path: '/index/:id',
      component: Index,
      children: [
        {
          path: '',
          component: Home
        }, {
          path: 'priofile',
          component: Profile
        }, {
          path: 'post',
          component: Post
        }
      ]
    }, {
      path: '/content/:id',
      component: Content
    }, {
      path: '/redirectToIndex', redirect: '/index/content'
    }, {
      path: '/table',
      component: Table
    }, {
      path: '/member',
      component: member
    }
  ]
})
