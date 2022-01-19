<template>
  <div>
    <div class="color2">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px"><font color="#FFFFFF">โอนเวลา</font></h5>
      </ul>
    </div>
    <div v-if="CHECKUSER[0].ACTIVEMEMBER == 1">
      <div
        align="left"
        style="margin: 20px"
        v-for="item in CHECKUSER"
        :key="item.MEMBERSHIP_ID"
      >
        <h6><b>บัญชีของ</b></h6>
        <b-card class="card4" style="margin-bottom: 10px">
          <h6>{{ item.name }}</h6>
          <h6>{{ item.MEMBERSHIP_ID }}</h6>
          <h6>แต้มคงเหลือ : {{ item.MEMBERSHIP_POINT }}</h6>
        </b-card>
        <h6><b>ไปยัง</b></h6>
        <h6>เลขบัญชีผู้รับ</h6>
        <b-form-input v-model="search" @keyup="Search()"></b-form-input>
        <div style="margin-top: 10px" v-if="!search == ''">
          <b-form-input
            disabled
            :value="
              searchmembership[0].MEMBERSHIP_FIRFENAME +
              ' ' +
              searchmembership[0].MEMBERSHIP_LASTNAME
            "
          ></b-form-input>
        </div>
        <h6 style="margin-top: 10px">จำนวนเวลา</h6>
        <b-form-input v-model="ACTIVITY_POINT"></b-form-input>
        <br />
        <div v-if="loadadd">
          <b-spinner
            variant="success"
            style="width: 3rem; height: 3rem"
            label="Spinning"
          ></b-spinner>
        </div>
        <div align="right" v-else>
          <b-button
            block
            pill
            variant="success"
            @click="
              checktransfer(
                searchmembership[0].MEMBERSHIP_ID,
                item.MEMBERSHIP_POINT
              )
            "
            >ยืนยัน</b-button
          >
        </div>
      </div>
    </div>
    <div v-else><center>ไม่สามารถใช้งานได้</center></div>
    <br /><br />
    <div class="footer2" style="margin-top: 10px">
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
export default {
  data: () => ({
    loadadd: false,
    CHECKUSER: null,
    MEMBERSHIP_ID: "",
    ACTIVITY_POINT: "",
    search: "",
    searchmembership: "",
  }),
  mounted() {
    // console.log(this);
    var _this = this;
    liff.init({ liffId: "1654799307-Q2BZ1GvG" }, function (data) {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      liff.getProfile().then((p) => {
        console.log(p.userId);
        _this.userlineId = p.userId;
    // _this.userlineId = "U5a89ec1b68798a26f886bd6562755210";

    axios
      .post(`${api_url.api_url}/CHECKUSER`, {
        USERID: _this.userlineId,
      })
      .then((response) => {
        _this.CHECKUSER = response.data;
        console.log(_this.CHECKUSER);
      });

    axios.post(`${api_url.api_url}/MEMBERSHIPsearch`).then((response) => {
      _this.mbsearch = response.data;
      console.log(_this.mbsearch);
    });
      });
    });
  },
  //ถ้าไม่มี MEMBERSHIP_ID จะไม่สมารถโอนได้ ยังไม่ได้ทำ
  methods: {
    back() {
      liff.init({ liffId: "1654799307-Q2BZ1GvG" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
    checktransfer(id, point) {
      this.loadadd = true;
      this.boxTwo = "";
      // console.log(point);
      if (point >= this.ACTIVITY_POINT && this.ACTIVITY_POINT != 0) {
        var data = {
          ACTIVITY_SHOW: "0",
          MEMBERSHIP_ID: id,
          ACTIVITY_POINT: this.ACTIVITY_POINT,
          ACTIVE: "0",
          USERID: this.userlineId,
        };
        axios.post(`${api_url.api_url}/transfer`, data).then((response) => {
          console.log(response);
          this.reset();
          this.loadadd = false;
          this.$bvModal.msgBoxOk("โอนแต้มเสร็จสิ้น", {
            title: "โอนสำเร็จ",
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true,
          });
        });
      } else {
        this.$bvModal.msgBoxOk("แต้มโอนไม่พอ", {
          title: "โอนไม่สำเร็จ",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        });
      }
    },
    reset() {
      axios
        .post(`${api_url.api_url}/CHECKUSER`, {
          USERID: this.userlineId,
        })
        .then((response) => {
          this.CHECKUSER = response.data;
          console.log(this.CHECKUSER);
        });
      this.ACTIVITY_POINT = "";
      this.search = "";
    },
    Search() {
      if (this.search == "") {
        axios.post(`${api_url.api_url}/MEMBERSHIPsearch`).then((response) => {
          this.mbsearch = response.data;
          console.log(_this.mbsearch);
        });
      } else {
        axios
          .post(`${api_url.api_url}/search`, {
            search: this.search,
          })
          .then((response) => {
            console.log(response.data);
            this.searchmembership = response.data;
            // console.log(this.search)
          });
      }
    },
  },
};
</script>

<style>
.card4 {
  background-color: rgb(238, 237, 230) !important;
}
</style>