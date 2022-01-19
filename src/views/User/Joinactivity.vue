<template>
  <div>
    <div class="color2" align="left">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px"><font color="#FFFFFF">กิจกรรมที่เข้าร่วม</font></h5>
      </ul>
    </div>
    <div v-if="load">
      <div v-if="!join.length == ''">
        <div v-if="join[0].ACTIVEMEMBER == 1">
          <div v-for="item in join" :key="item.ACTIVITY_ID">
            <b-card style="margin: 20px" align="left" class="card1">
              <b-row>
                <b-col cols="12">
                  <h5><b-icon
                        variant="danger"
                        style="width: 18px; height: 18px"
                        icon="arrow-right-circle-fill"
                      ></b-icon><font color="#04bf10">{{' '+ item.ACTIVITY_NAME }}</font></h5>
                </b-col>
                <b-col cols="12">
                  <!-- {{item}} -->
                  บริการให้: {{ item.memact }}
                  {{ item.lasact }}
                </b-col>
                <b-col>
                  ที่อยู่: {{ item.ACTIVITY_ADDRESS }} ต.
                  {{ item.ACTIVITY_SUBDISTRIC }}
                 
                </b-col>
              </b-row>
              <b-row>
                <b-col>วันที่: {{ item.DAYTHAI }}</b-col>
              </b-row>
              <b-row>
                <b-col>ช่วงเวลา: {{ item.ACTIVITY_TIME }}</b-col>
              </b-row>
              <b-row>
                <b-col>เวลานัด : {{ item.APPPOINTMENT_TIME }} น.</b-col>
              </b-row>
              <b-row>
                <b-col>เบอร์โทร: {{ item.ACTIVITY_TELEPHONE }}</b-col>
              </b-row>
              <b-row>
                <b-col>รายละเอียด: {{ item.ACTIVITY_DETAILS }}</b-col>
              </b-row>
              <br />
              <b-button
                block
                pill
                variant="danger"
                @click="showModal(item.ACTIVITY_ID)"
                >ยกเลิกกิจกรรม</b-button
              >
            </b-card>
          </div>
          <b-modal id="bv-modal-example" centered hide-footer>
            <div class="d-block text-center">
              <h5>คุณต้องการยกเลิกใช่หรือไม่</h5>
            </div>
            <b-row>
              <b-col cols="6">
                <div style="margin-left: 10px; margin-right: 10px">
                  <b-button variant="success" block @click="unactivity(setID)"
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
        <h5>คุณยังไม่ได้เข้าร่วมกิจกรรม</h5>
      </div>
    </div>
    <div v-else style="margin-top: 200px">
      <div class="text-center">
        <b-spinner variant="warning" label="Text Centered"></b-spinner>
      </div>
    </div>
    <br><br>
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
      ACTIVITYS: null,
      join: [],
      setID: "",
      load: true,
    };
  },
  methods: {
     back() {
      liff.init({ liffId: "1654799307-GgzVw5B5" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
    showModal(id) {
      this.$bvModal.show("bv-modal-example");
      console.log(id);
      this.setID = id;
    },
    hideModal() {
      this.$bvModal.hide("bv-modal-example");
    },
    unactivity(id) {
      console.log(id);
      axios
        .post(`${api_url.api_url}/joinactivity`, {
          ACTIVE: "0",
          ACTIVITY_ID: id,
        })
        .then((response) => {
          this.joinactivity = response.data;
          this.listactivity();
          this.$bvModal.hide("bv-modal-example");
          this.listactivity(response);
        });
    },
    listactivity() {
      const _this = this;
      _this.load = false;
      liff.init({ liffId: "1654799307-GgzVw5B5" }, function (data) {
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        liff.getProfile().then((p) => {
          console.log(p.userId);
          _this.userlineId = p.userId;
        //  _this.userlineId = "Uf244780152ac6d589a2fe0bb92dfe4a8";
          axios
            .post(`${api_url.api_url}/join`, {
              USERID: _this.userlineId,
            })
            .then((response) => {
              _this.load = true;
              _this.join = response.data;
              console.log(_this.join);
            });
        });
      });
    },
  },
  mounted() {
    // console.log(this);
    this.listactivity();
  },
};
</script>

<style>
.color {
  background-color: rgb(248, 232, 141);
}
</style>