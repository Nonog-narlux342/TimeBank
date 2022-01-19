<template>
  <div>
    <div class="color2" align="left">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px"><font color="#FFFFFF">กิจกรรม</font></h5>
      </ul>
    </div>
    <div v-if="!checkuser == ''">
      <div v-if="checkuser != ''">
        <div v-if="checkuser[0].ACTIVEMEMBER == 1">
          <div v-for="(item, index) in checkuser" :key="index">
            <!-- <div v-if=" i <= item.ACTIVITY_COUNT">5555</div> -->
            <div class="cardproduct">
              <b-card
                style="margin-top: 20px; margin-left: 30px; margin-right: 30px"
                align="left"
                class="card1"
              >
                <div style="margin-bottom: 10px" align="center">
                  <b-card-img :src="item.ACTIVITY_IMG"> </b-card-img>
                </div>
                <p>
                  <b-row>
                    <b-col cols="12">
                      <h5>
                        <b-icon
                          variant="danger"
                          style="width: 18px; height: 18px"
                          icon="arrow-right-circle-fill"
                        ></b-icon>
                        <font color="#04bf10">{{
                          " " + item.ACTIVITY_NAME
                        }}</font>
                      </h5>
                    </b-col>
                  </b-row>
                  <b-row>
                    <!-- <b-col
                      >ผู้ขอความช่วยเหลือ: {{ item.MEMBERSHIP_FIRFENAME }}
                      {{ " " + item.MEMBERSHIP_LASTNAME }}
                    </b-col> -->
                     <b-col
                      >ผู้ขอความช่วยเหลือ: {{ item.NAME }}
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      >ที่อยู่: {{ item.ACTIVITY_ADDRESS }} ต.{{
                        item.ACTIVITY_SUBDISTRIC
                      }}
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>เบอร์โทร: {{ item.ACTIVITY_TELEPHONE }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col>รายละเอียด: {{ item.ACTIVITY_DETAILS }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col>วันที่ : {{ item.ACTIVITY_DAY }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col>เพศที่เข้าร่วม : {{ item.ACTIVITY_SEX }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col>ช่วงเวลา : {{ item.ACTIVITY_TIME }}</b-col>
                  </b-row>
                  <b-row>
                    <b-col>เวลานัด : {{ item.APPPOINTMENT_TIME }} น.</b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      >ต้องการ : {{ item.ACTIVITY_COUNT }} คน เข้าร่วมเเล้ว :
                      {{ item.sumactivity }} คน</b-col
                    >
                  </b-row>
                </p>

                <div v-if="userline != item.USERID">
                  <!-- <div align="right" v-if="item.detail.length == ''"> -->
                  <div align="right" v-if="item.detail.length == 0" >
                    <div align="right" v-if="loadadd">
                      <b-spinner
                        variant="success"
                        style="width: 3rem; height: 3rem"
                        label="Spinning"
                      ></b-spinner>
                    </div>
                    <div align="right" v-else>
                      <b-button
                        pill
                        variant="outline-success"
                        @click="showModal(item.ACTIVITY_ID)"
                        >เข้าร่วมกิจกรรม</b-button
                      >
                    </div>
                  </div>
                  <!-- <div align="right" v-else style="margin: 20px"> -->
                  <div align="right" v-else  style="margin: 20px">
                    เข้าร่วมกิจกรรมนี้แล้ว
                    <b-iconstack font-scale="2">
                      <b-icon variant="success" stacked icon="square"></b-icon>
                      <b-icon variant="success" stacked icon="check"></b-icon>
                    </b-iconstack>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
          <br />
          <b-modal id="bv-modal-example" centered hide-footer>
            <div class="d-block text-center">
              <h5>คุณต้องเข้าร่วมกิจกรรมนี้ใช่หรือไม่</h5>
            </div>
            <b-row>
              <b-col cols="6">
                <div style="margin-left: 10px; margin-right: 10px">
                  <b-button
                    variant="success"
                    block
                    @click="addjoinactivity(setID)"
                    >ใช่</b-button
                  >
                </div>
              </b-col>
              <b-col cols="6">
                <div style="margin-left: 10px; margin-right: 10px">
                  <b-button variant="danger" block @click="hideModal"
                    >ไม่ใช่</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </b-modal>
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
        <h5>ไม่มีกิจกรรม</h5>
      </div>
    </div>
    <div v-else style="margin-top: 200px">
      <div class="text-center">
        <b-spinner variant="warning" label="Text Centered"></b-spinner>
      </div>
    </div>

    <br /><br /><br />
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
const api_url = require("../../../utilities/api");

export default {
  data() {
    return {
      loadadd: false,
      checkuser: null,
      setID: "",
      userline: "",
    };
  },
  async created() {
    var _this = this;
    // liff.init({ liffId: "1654799307-GygPKXnX" }, function (data) {
    //   if (!liff.isLoggedIn()) {
    //     liff.login();
    //     return;
    //   }
    //   liff.getProfile().then(async (p) => {
    //     _this.userline = p.userId;
        // _this.userline = "Ua0e88a4d0518fe246c5d8a601cdf35d0";
         _this.userline = "U125007b1097657b4614ee6de3648baa5";
        // console.log(_this.userline);
       let dataNew  = await axios.post(`${api_url.api_url}/new-activity-query`, {
          USERID: _this.userline,
        });
        // console.log(dataNew.data);
        _this.checkuser =dataNew.data
        var order = [];
        for (let index = 0; index < dataNew.data.length; index++) {
          const element = dataNew.data[index];
          // console.log(element.ACTIVITY_ID);
          order.push(element);
          var b = await axios.post(`${api_url.api_url}/checkuseractivity`, {
            ACTIVITY_ID: element.ACTIVITY_ID,
            USERID: _this.userline,
          });
          // console.log('----------------b.data');
          // console.log(b.data);
          order[index].detail = b.data;
          //จำนวนคน
          var c = await axios.post(`${api_url.api_url}/checksumactivity`, {
            ACTIVITY_ID: element.ACTIVITY_ID,
          });
          // console.log('-------------------c.data.length');
          // console.log(c.data.length);
          order[index].sumactivity = c.data.length;
        }
        // console.log(order);
        _this.checkuser = order;
      // });
    // });
  },
  methods: {
    back() {
      liff.init({ liffId: "1654799307-GygPKXnX" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
    showModal(id) {
      this.$bvModal.show("bv-modal-example");
      // console.log(id);
      this.setID = id;
    },
    hideModal() {
      this.$bvModal.hide("bv-modal-example");
    },
  async  addjoinactivity(id) {
      var _this = this;
      _this.loadadd = true;
      var data = {
        ACTIVITY_ID: id,
        USERID: _this.userline,
      };
    await  axios.post(`${api_url.api_url}/joinatc`, data).then((response) => {
        _this.reset(response);
        _this.$store.commit("Detail/SET_ACTIVITY_ID", id);
        _this.$bvModal.hide("bv-modal-example");
        _this.loadadd = false;
      });
    },
    async reset() {
       var _this = this;
        let dataNew  = await axios.post(`${api_url.api_url}/new-activity-query`, {
          USERID: _this.userline,
        });
        // console.log(dataNew.data);
        _this.checkuser =dataNew.data
        var order = [];
        for (let index = 0; index < dataNew.data.length; index++) {
          const element = dataNew.data[index];
          // console.log(element.ACTIVITY_ID);
          order.push(element);
          var b = await axios.post(`${api_url.api_url}/checkuseractivity`, {
            ACTIVITY_ID: element.ACTIVITY_ID,
            USERID: _this.userline,
          });
          // console.log(b.data);
          order[index].detail = b.data;
          //จำนวนคน
          var c = await axios.post(`${api_url.api_url}/checksumactivity`, {
            ACTIVITY_ID: element.ACTIVITY_ID,
          });
          // console.log(c.data.length);
          order[index].sumactivity = c.data.length;
        }
        // console.log(order);
        _this.checkuser = order;
        
    },
  },
};
</script>

<style>
.cardproduct img:not(.md-image) {
  object-fit: cover;
  object-position: center;
  height: 180px;
  width: 200px;
}

.card1 {
  background-color: rgb(238, 237, 230) !important;
}
.color2 {
  background: linear-gradient(
    180deg,
    rgba(240, 98, 146, 1) 0%,
    rgba(244, 132, 170, 1) 35%,
    rgba(254, 200, 219, 1) 100%
  );
}
</style>