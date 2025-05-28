import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginUser from '../views/LoginUser.vue'
import LoginAdmin from '../views/LoginAdmin.vue'
import Home from '../views/Home.vue'
import Driver from '../views/Driver.vue'
import Vehicle from '@/views/Vehicle.vue'
import Route from '@/views/Route.vue'
import Site from '@/views/Site.vue'
import DriverRating from '@/views/DriverRating.vue'
import Maintenance from '@/views/Maintenance.vue'
import Schedule from '@/views/schedule.vue'
import DriverRatingUser from '@/views/DriverRatingUser.vue'
import ScheduleUser from '@/views/ScheduleUser.vue'
import Driver_Auth from '@/views/Driver_Auth.vue'
import User from '@/views/User.vue'
import store from '../store';
import { Message } from 'element-ui'; // 引入ElementUI的Message组件

Vue.use(VueRouter)

const routes = [
  {
    path: '/loginuser',
    name: 'LoginUser',
    component: LoginUser,
  },
  {
    path: '/',
    name: 'LoginAdmin',
    component: LoginAdmin,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/driver',
    name: 'Driver',
    component: Driver,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/vehicle',
    name: 'Vehicle',
    component: Vehicle,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/route',
    name: 'Route',
    component: Route,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/site',
    name: 'Site',
    component: Site,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/driverrating',
    name: 'DriverRating',
    component: DriverRating,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: Maintenance,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/driverratinguser',
    name: 'DriverRatingUser',
    component: DriverRatingUser,
    meta: { requiresAuth: true, roles: ['user'] }
  },
  {
    path: '/scheduleUser',
    name: 'ScheduleUser',
    component: ScheduleUser,
    meta: { requiresAuth: true, roles: ['user'] }
  },
  {
    path: '/driver_auth',
    name: 'Driver_Auth',
    component: Driver_Auth,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requiresAuth: true, roles: ['user'] }
  }
]

const router = new VueRouter({
  mode: "hash",
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userIsLoggedIn = router.app.$store.getters.getIsLogin;
  const userRole = router.app.$store.getters.getRole;

  if (requiresAuth && !userIsLoggedIn) {
    // 未登录时跳转到登录页
    next({ path: '/' });
    Message.warning('请先登录系统');
  } else if (requiresAuth && userIsLoggedIn) {
    // 检查角色权限
    const allowedRoles = to.matched.some(record => 
      record.meta.roles.includes(userRole)
    );
    
    if (!allowedRoles) {
      // 无权限时保持当前页面并显示提示
      Message.error('您无权访问该页面');
      next(false); // 中断当前导航，保持当前页面
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router