<template>
  <div>
    <div class="color2">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px">
          <font color="#FFFFFF">กิจกรรมที่ฉันขอความช่วยเหลือ</font>
        </h5>
      </ul>
    </div>
    <div>
      <b-tabs content-class="mt-3" justified>
        <b-tab title="ขอความช่วยเหลือ" active>
          <div>
            <div v-if="!activityuser == ''">
              <div v-if="activityuser != ''">
                <div v-if="activityuser[0].ACTIVEMEMBER == 1">
                  <div v-for="item in activityuser" :key="item.ACTIVITY_ID">
                    <!-- {{ item.ACTIVITY_ID }} -->
                    <b-card style="margin: 20px" align="left" class="card1">
                      <p>
                        <b-container>
                          <b-row style="margin-bottom: 10px">
                            <b-col cols="12">
                              <h5>
                                <b-icon
                                  variant="danger"
                                  style="width: 20px; height: 20px"
                                  icon="arrow-right-circle-fill"
                                ></b-icon>
                                {{ item.ACTIVITY_NAME }}
                              </h5>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col>
                              ที่อยู่ : {{ item.ACTIVITY_ADDRESS }} ต.{{
                                item.ACTIVITY_SUBDISTRIC
                              }}
                              อ.{{ item.ACTIVITY_DISTRICT }} จ.{{
                                item.ACTIVITY_PROVINCE
                              }}
                              รหัสไปรษณีย์ {{ item.ACTIVITY_ZIPCODE }}
                              <br />
                              เบอร์โทร : {{ item.ACTIVITY_TELEPHONE }}
                            </b-col></b-row
                          >
                        </b-container>
                      </p>
                      <b-button
                        block
                        pill
                        variant="success"
                        @click="Detailsactivity(item)"
                        >ดูรายละเอียด</b-button
                      >
                    </b-card>
                  </div>
                </div>
                <div v-else align="center" style="margin-top: 150px">
                  <b-icon
                    icon="exclamation-circle-fill"
                    style="width: 120px; height: 120px"
                    variant="warning"
                  ></b-icon>
                  <h5>ไม่สามารถใช้งานได้</h5>
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
                <h5>ไม่มีกิจกรรมที่สร้าง</h5>
              </div>
            </div>
            <div v-else style="margin-top: 200px">
              <div class="text-center">
                <b-spinner variant="warning" label="Text Centered"></b-spinner>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="ประวัติขอความช่วยเหลือ">
          <div>
            <div v-if="activityuser3 != ''">
              <div v-for="item in activityuser3" :key="item.ACTIVITY_ID">
                <!-- {{ item.ACTIVITY_ID }} -->
                <b-card style="margin: 10px" align="left" class="card1">
                  <b-container>
                    <b-row>
                      <b-col cols="12">
                        <h5>
                          <b-icon
                            variant="danger"
                            style="width: 20px; height: 20px"
                            icon="arrow-right-circle-fill"
                          ></b-icon>
                          {{ item.ACTIVITY_NAME }}
                        </h5>
                      </b-col></b-row
                    >
                    <b-row>
                      <b-col>
                        ที่อยู่ : {{ item.ACTIVITY_ADDRESS }} ต.{{
                          item.ACTIVITY_SUBDISTRIC
                        }}
                        อ.{{ item.ACTIVITY_DISTRICT }} จ.{{
                          item.ACTIVITY_PROVINCE
                        }}
                        รหัสไปรษณีย์ {{ item.ACTIVITY_ZIPCODE }}
                        <br />
                        เบอร์โทร : {{ item.ACTIVITY_TELEPHONE }}
                        <br />
                        วันที่ : {{ format_datetime1(item.CREATE_DATE) }}
                        <br />
                        จำนวน : {{ item.ACTIVITY_COUNT }} คน
                      </b-col></b-row
                    >
                  </b-container>
                </b-card>
              </div>
            </div>
            <div v-else align="center" style="margin-top: 150px">
              <!-- <div class="text-center">
                <b-spinner variant="warning" label="Text Centered"></b-spinner>
              </div> -->
              <div>
                <b-icon
                  icon="box-seam"
                  variant="danger"
                  style="width: 120px; height: 120px"
                ></b-icon>
              </div>
              <h5>ไม่มีประวัติกิจกรรม</h5>
            </div>
          </div>
        </b-tab>
      </b-tabs>
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
import firebase from "firebase";
import moment from "moment";
import { format } from "path";
const api_url = require("../../../utilities/api");
export default {
  data() {
    return {
      activityuser: null,
      load: true,
      activityuser3: null,
    };
  },
  mounted() {
    // console.log(this);
    var _this = this;
    // liff.init({ liffId: "1654799307-Zad09vLv" }, function (data) {
    //   if (!liff.isLoggedIn()) {
    //     liff.login();
    //     return;
    //   }
    //   liff.getProfile().then((p) => {
    //     console.log(p.userId);
    //     _this.userlineId = p.userId;
    _this.userlineId = "Ua0e88a4d0518fe246c5d8a601cdf35d0";
    // _this.load = false;
    axios
      .post(`${api_url.api_url}/activityuser`, {
        USERID: _this.userlineId,
      })
      .then((response) => {
        // _this.load = true;
        _this.activityuser = response.data;
        console.log(_this.activityuser);
      });
    axios
      .post(`${api_url.api_url}/activityuser3`, {
        USERID: _this.userlineId,
      })
      .then((response) => {
        // _this.load = true;
        _this.activityuser3 = response.data;
        console.log(_this.activityuser3);
      });
    //   });
    // });
  },
  methods: {
    format_datetime1(data) {
      console.log(data);
      var dm = moment(data).format("MM-DD-YYYY");
      return dm;
    },
    back() {
      liff.init({ liffId: "1654799307-Zad09vLv" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
    Detailsactivity(item) {
      //   //การส่งข้อมูลไปอีกหน้า

      this.$store.commit(
        "Detail/SET_MEMBERSHIP_FIRFENAME",
        item.MEMBERSHIP_FIRFENAME
      );
      this.$store.commit(
        "Detail/SET_MEMBERSHIP_LASTNAME",
        item.MEMBERSHIP_LASTNAME
      );
      this.$store.commit("Detail/SET_MEMBERSHIP_IMGE", item.MEMBERSHIP_IMGE);
      this.$store.commit("Detail/SET_ACTIVITY_ID", item.ACTIVITY_ID);
      this.$store.commit("Detail/SET_ACTIVITY_NAME", item.ACTIVITY_NAME);
      this.$store.commit(
        "Detail/SET_APPPOINTMENT_TIME",
        item.APPPOINTMENT_TIME
      );
      this.$store.commit("Detail/SET_ACTIVITY_ADDRESS", item.ACTIVITY_ADDRESS);
      this.$store.commit(
        "Detail/SET_ACTIVITY_SUBDISTRIC",
        item.ACTIVITY_SUBDISTRIC
      );
      this.$store.commit(
        "Detail/SET_ACTIVITY_DISTRICT",
        item.ACTIVITY_DISTRICT
      );
      this.$store.commit(
        "Detail/SET_ACTIVITY_PROVINCE",
        item.ACTIVITY_PROVINCE
      );
      this.$store.commit("Detail/SET_ACTIVITY_ZIPCODE", item.ACTIVITY_ZIPCODE);
      this.$store.commit(
        "Detail/SET_ACTIVITY_TELEPHONE",
        item.ACTIVITY_TELEPHONE
      );
      this.$store.commit("Detail/SET_ACTIVITY_COUNT", item.ACTIVITY_COUNT);
      this.$store.commit("Detail/SET_ACTIVITY_SEX", item.ACTIVITY_SEX);
      this.$store.commit("Detail/SET_ACTIVITY_DAY", item.ACTIVITY_DAY);
      this.$store.commit("Detail/SET_ACTIVITY_TIME", item.ACTIVITY_TIME);
      this.$store.commit("Detail/SET_ACTIVITY_DETAILS", item.ACTIVITY_DETAILS);
      // router ไปหน้าที่เราต้องการให้ไป
      this.$router.push({ path: "/Myactivity1" });
    },
  },
};
</script>

<style>
.container {
  /* height: 100vh; */
  height: 100%;
  align-content: center;
}
.color {
  background-color: rgb(248, 232, 141);
}

.md-theme-default a:not(.md-button) {
  color: #980000 !important;
}
</style>