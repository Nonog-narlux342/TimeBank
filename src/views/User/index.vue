<template>
  <div>
    <div class="color2" align="left">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px"><font color="#FFFFFF">ข้อมูลส่วนตัว</font></h5>
      </ul>
    </div>
    <br />
    <!-- {{userdata}} -->
    <div v-for="member in userdata" :key="member.MEMBERSHIP_ID">
      <div>
        <center>
          <b-img
            :src="member.MEMBERSHIP_IMGE"
            class="rounded-circle"
            style="
              margin-top: 10px;
              margin-bottom: 10px;
              width: 100px;
              height: 100px;
            "
          ></b-img>
        </center>
      </div>
      <div>
        <b-container>
          <b-row style="margin: 10px">
            <b-col>
              <b>ข้อมูลของฉัน</b>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <label for="input-none">ชื่อบัญชี :</label>
            </b-col>
            <b-col>
              <b-input type="text" :value="member.NAME" disabled></b-input>
            </b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>เลขที่บัญชี:</p>
            </b-col>
            <b-col>
              <b-input
                type="text"
                :value="member.MEMBERSHIP_ID"
                disabled
              ></b-input
            ></b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>วันเกิด:</p>
            </b-col>
            <b-col>
              <b-input
                :value="member.ThaiDate"
                disabled
              ></b-input
            ></b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>แต้ม:</p>
            </b-col>
            <b-col>
              <b-input
                type="text"
                :value="member.MEMBERSHIP_POINT"
                disabled
              ></b-input
            ></b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>เบอร์โทร:</p>
            </b-col>
            <b-col>
              <b-input
                type="text"
                :value="member.MEMBERSHIP_TELEPHONE"
                disabled
              ></b-input
            ></b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>ระดับการศึกษา:</p>
            </b-col>
            <b-col>
              <b-input
                type="text"
                :value="member.MEMBERSHIP_EDUCATION"
                disabled
              ></b-input
            ></b-col>
          </b-row>

          <b-row style="margin: 10px">
            <b-col>
              <b>ผู้รับผลประโยชน์</b>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>ชื่อ:</p>
            </b-col>
            <b-col>
              <b-input type="text" :value="member.namema" disabled></b-input>
            </b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>ความสัมพันธ์:</p>
            </b-col>
            <b-col
              ><b-input
                type="text"
                :value="member.CONTACTPERSONS_RELATIONSHIP"
                disabled
              ></b-input
            ></b-col>
          </b-row>
          <b-row style="margin: 10px">
            <b-col cols="4">
              <p>ธนาคารเวลาสาขา:</p>
            </b-col>
            <b-col
              ><b-input type="text" :value="member.timebank" disabled></b-input
            ></b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <br /><br /><br>
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
const api_url = require("../../../utilities/api");
import axios from "axios";
import moment from "moment";
export default {
  data: () => ({
    userdata: null,
  }),
  created() {
    const _this = this;
    liff.init({ liffId: "1654799307-gOzp78D8" }, function (data) {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      liff.getProfile().then((p) => {
        console.log(p.userId);
        _this.profile(p.userId);
      });
    });
    // _this.userId = "U5a89ec1b68798a26f886bd6562755210";
    // _this.profile(_this.userId);
    // console.log(_this.profile);
  },

  methods: {
    // format_datetime1(data) {
    //   // console.log(data);
    //   var dm = moment(data).format("DD-MM-YYYY");
    //   return dm;
    // },
    back() {
      liff.init({ liffId: "1654799307-gOzp78D8" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
    profile(userId) {
      const _this = this;
      console.log(userId);
      axios
        .post(`${api_url.api_url}/CHECKUSER`, {
          USERID: userId,
        })
        .then((response) => {
          _this.userdata = response.data;
          console.log(_this.userdata);
        });
    },
  },
};
</script>


<style>
.color {
  background-color: rgb(248, 232, 141);
}
</style>