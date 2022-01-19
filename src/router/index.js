import Vue from "vue";
import VueRouter from "vue-router";


import conclude from "../views/Admin/conclude.vue";
import Datamember from "../views/Admin/Datamember.vue";
import Login from "../views/Admin/Login.vue";
import Perusemember from "../views/Admin/Perusemember.vue";
import Addactivity from "../views/Admin/Addactivity.vue";
import addmember1 from "../views/Admin/addmember1.vue";
import addmember2 from "../views/Admin/addmember2.vue";
import addmember3 from "../views/Admin/addmember3.vue";
import addmember4 from "../views/Admin/addmember4.vue";
import Adminactivity from "../views/Admin/Adminactivity.vue";
import centralbank from "../views/Admin/Centralbank.vue";

import showconclude from "../views/User/showconclude.vue";
import User from "../views/User/index.vue";
import Request from "../views/User/Request.vue";
import Bookbank from "../views/User/Bookbank.vue";
import Activity from "../views/User/Activity.vue";
import Myactivity from "../views/User/Myactivity.vue";
import Myactivity1 from "../views/User/Myactivity1.vue";
import Joinactivity from "../views/User/Joinactivity.vue";
import Transfer from "../views/User/Transfer.vue";

Vue.use(VueRouter);
const routes = [

  {
    path: "/centralbank",
    name: "centralbank",
    component: centralbank
  },
  {
    path: "/showconclude",
    name: "showconclude",
    component: showconclude
  },
  {
    path: "/conclude",
    name: "conclude",
    component: conclude
  },
  {
    path: "/addmember1",
    name: "addmember1",
    component: addmember1
  },
  {
    path: "/addmember2",
    name: "addmember2",
    component: addmember2
  },
  {
    path: "/addmember3",
    name: "addmember3",
    component: addmember3
  },
  {
    path: "/addmember4",
    name: "addmember4",
    component: addmember4
  },
  {
    path: "/Datamember",
    name: "Datamember",
    component: Datamember
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/Perusemember",
    name: "Perusemember",
    component: Perusemember
  },
  {
    path: "/Addactivity",
    name: "Addactivity",
    component: Addactivity
  },
  {
    path: "/Adminactivity",
    name: "Adminactivity",
    component: Adminactivity
  },
  {
    path: "/",
    name: "User",
    component: User
  },
  {
    path: "/Request",
    name: "Request",
    component: Request
  },
  {
    path: "/Bookbank",
    name: "Bookbank",
    component: Bookbank
  },
  {
    path: "/Activity",
    name: "Activity",
    component: Activity
  },
 
  {
    path: "/Myactivity",
    name: "Myactivity",
    component: Myactivity
  },
  {
    path: "/Myactivity1",
    name: "Myactivity1",
    component: Myactivity1
  },
  {
    path: "/Joinactivity",
    name: "Joinactivity",
    component: Joinactivity
  },
  {
    path: "/Transfer",
    name: "Transfer",
    component: Transfer
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem("USER") === null) {
//     // console.log("true")
//     console.log(to.fullPath)
//     next({
//       // path: "/login",
//       params: {
//         nextUrl: to.fullPath
//       }
//     })
//   } else {
//     console.log(to.fullPath)
//     // console.log("1234");
//     next()
//   }
//   console.log(localStorage.getItem('USER'));
//   // console.log(next)
//   // console.log(to)
//   // console.log(to.path)
// })
export default router;
