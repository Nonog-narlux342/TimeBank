<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  //
  created() {
  if (this.$workbox) {
    this.$workbox.addEventListener("waiting", () => {
      this.showUpdateUI = true;
    });
    } 
  },
  async accept() {
  this.showUpdateUI = false;
  await this.$workbox.messageSW({ type: "SKIP_WAITING" });
  },
  //
  methods: {
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  },
  components: {},
  mounted() {
    window.onpopstate = function () {
      window.location.reload();
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
