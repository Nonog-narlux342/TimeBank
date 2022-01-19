<template>
  <div>
    <div class="color2">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px">
          <font color="#FFFFFF">กิจกรรมจิตอาสา</font>
        </h5>
      </ul>
    </div>
    <div v-if="mem != ''">
      <div style="margin: 10px">
        <b-card
          v-for="(item, index) in mem"
          :key="index"
          no-body
          class="overflow-hidden"
          style="max-width: 540px; margin: 10px"
        >
          <b-row no-gutters>
            <b-col cols="6">
              <b-card-img
                :src="item.ACTIVITY_IMG"
                alt="Image"
                style="width: 100%; height: 100%"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col cols="6">
              <b-card-body>
                <h6>
                  <b
                    ><font color="#33CC00">{{ item.ACTIVITY_NAME }}</font></b
                  >
                </h6>
                <div class="PActivity">
                  <p><b>ให้ : </b>{{ item.nameactivity }}</p>
                  <p><b>วันที่ : </b>{{ item.ACTIVITY_DAY }}</p>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
    <div v-else align="center" style="margin-top: 150px">
      <div>
        <b-icon
          icon="box-seam"
          variant="danger"
          style="width: 120px; height: 120px"
        ></b-icon>
      </div>
      <h5>ไม่มีประวัติกิจกรรมจิตอาสา</h5>
    </div>
    <br /><br />
    <div class="footer2">
      <div style="margin-top: 10px; margin-left: 30px" align="left">
        <b-icon
          icon="backspace-fill"
          style="width: 35px; height: 35px"
          @click="back"
          variant="light"
        ></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const api_url = require("../../../utilities/api");
export default {
  data() {
    return {
      mem: null,
    };
  },
  mounted() {
    var _this = this;
    liff.init({ liffId: "1654799307-4Qn0EAOA" }, function (data) {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      liff.getProfile().then((p) => {
        // console.log(p.userId);
        _this.userlineId = p.userId;
        // _this.userlineId = "U5a89ec1b68798a26f886bd6562755210";

        axios
          .post(`${api_url.api_url}/showmemconclude`, {
            USERID: _this.userlineId,
          })
          .then((response) => {
            _this.mem = response.data;
            // console.log(_this.mem);
          });  
      });
    });
  },
  methods: {
    back() {
      liff.init({ liffId: "1654799307-4Qn0EAOA" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
  },
};
</script>

<style>
div.PActivity p {
  margin-top: 0;
  margin-bottom: 0rem;
}
</style>