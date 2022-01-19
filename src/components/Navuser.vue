<template>
  <div class="app">
    <b-navbar class="colornav" toggleable="lg" type="dark">
      <b-navbar-brand>ธนาคารเวลา</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item @click="dataactivity">อนุมัติกิจกรรม</b-nav-item>
          <b-nav-item @click="addactivity">สร้างกิจกรรม</b-nav-item>
          <b-nav-item @click="adminactivity">กิจกรรมของธนาคาร</b-nav-item>
          <b-nav-item @click="addmember">สมัครสมาชิก</b-nav-item>
          <b-nav-item @click="datamember">ข้อมูลสมาชิก</b-nav-item>
          <b-nav-item @click="conclude">สรุปผลรายปี</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <b-icon
                icon="person-fill"
                variant="secondary"
                style="width: 25px; height: 25px"
              ></b-icon>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->

            <b-dropdown-item @click="logout">ออกจากระบบ</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
const api_url = require("../../utilities/api");
import axios from "axios";

export default {
  name: "Nav",
  data() {
    return {
      ADMIN_USER: "",
      ADMIN_PASSWORD: "",
      loginn: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    logout() {
      // this.$store.commit("Detail/SET_ADMIN", 0);
      localStorage.clear();
      this.$router.push({ path: "/login" });
    },
    // conclude() {
    //   this.$router.push({ path: "/conclude" });
    // },
    // addmember() {
    //   this.$router.push({ path: "/addmember1" });
    // },
    // addactivity() {
    //   this.$router.push({ path: "/Addactivity" });
    // },
    // datamember() {
    //   this.$router.push({ path: "/Datamember" });
    // },
    // dataactivity() {
    //   this.$router.push({ path: "/Perusemember" });
    // },
    // adminactivity() {
    //   this.$router.push({ path: "/Adminactivity" });
    // },
  },
};
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.colornav {
  background: linear-gradient(
    90deg,
    rgba(240, 78, 185, 1) 0%,
    rgba(243, 102, 252, 1) 50%,
    rgba(254, 200, 219, 1) 100%
  );
}
.navbar-dark .navbar-nav .nav-link {
  color: rgb(255, 255, 255) !important;
}
</style>