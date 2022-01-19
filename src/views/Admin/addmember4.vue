<template>
  <div>
    <Nav />
        <div style="margin: 10px">
      <b-row>
        <b-col cols="1">
          <div align="right">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/2972/2972531.svg"
              style="width: 80px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="11">
          <div style="padding-top: 20px; padding-right: 20px" align="">
            <font size="5px">ยินดีต้อนรับสู่ธนาคารเวลา</font>
            <div style="padding-top: 5px">
              <font size="3px"
                >"ธนาคารเวลา ออมเวลา ปันสุข" ร่วมกันเเข่งปันเวลา
                เพื่อสร้างรอยยิ้มให้สังคม</font
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div align="center" style="margin: 10px">
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/752/752326.svg"
            style="width: 50px"
            alt=""
          />
          <br>
          <b>ข้อมูลส่วนตัว</b>
        </b-col>
        <b-col cols="1">
          <div style="margin-top: 15px">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/545/545783.svg"
              style="width: 30px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/3203/3203184.svg"
            style="width: 50px"
            alt=""
          />
          <br>
          <b>วันเวลาทำงาน</b>
        </b-col>
        <b-col cols="1">
          <div style="margin-top: 15px">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/545/545783.svg"
              style="width: 30px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/2833/2833614.svg"
            style="width: 50px"
            alt=""
          />
          <br>
          <b>ความสามารถ</b>
        </b-col>
        <b-col cols="1">
          <div style="margin-top: 15px">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/545/545783.svg"
              style="width: 30px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1828/1828651.svg"
            style="width: 50px"
            alt=""
          />
          <br>
          <b>เสร็จสิ้น</b>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </div>
    <div align="center" style="margin: 20px">
      <b-card style="width: 400px">
        <div align="center">
          <!-- {{Qrcode + mbcid[0].MEMBERSHIP_CID}} -->
          <qrcode-vue
            :value="Qrcode + mbcid[0].MEMBERSHIP_ID"
            :size="size"
            level="H"
            align="center"
          ></qrcode-vue>
          <div></div>
          <h6><b>สมัครสมาชิกเสร็จเรียบร้อย</b></h6>
          <b-button
            pill
            style="width: 250px"
            variant="outline-success"
            @click="Addmember4"
            v-b-modal.modal-center
            >กลับไปหน้าเเรก</b-button
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const api_url = require("../../../utilities/api");
import Nav from "../../components/Nav";
import QrcodeVue from "qrcode.vue";
export default {
  components: {
    QrcodeVue,
    Nav,
  },
  data() {
    return {
      mbcid: null,
      size: 300,
      Qrcode: "https://line.me/R/oaMessage/@503kjvna/?signup_",
    };
  },
  created() {
    this.showmemid();
  },
  beforeMount() {
    this.GetProfileLine();
  },
  methods: {
    GetProfileLine() {
      // console.log("1654799307-gl1y9NPN", "ffff");

      function initializeLiff(myLiffId) {
        liff
          .init({
            liffId: myLiffId,
          })
          .then(() => {
            liff.getProfile().then((p) => {
              // alert(p.userId)
              this.USERID = p.userId;
            });
          });
      }
      initializeLiff("1654799307-gl1y9NPN");
    },
    Addmember4() {
      this.$router.push({ path: "/addmember1" });
    },
    showmemid() {
      console.log(this.$store.getters["Detail/MEMBERSHIP_ID"]);
      axios
        .post(`${api_url.api_url}/selectmemcid`, {
          MEMBERSHIP_ID: this.$store.getters["Detail/MEMBERSHIP_ID"],
        })
        .then((response) => {
          console.log(response.data);
          this.mbcid = response.data;
        });
      return this.$store.getters["Detail/MEMBERSHIP_ID"];
    },
  },
};
</script>

<style>
</style>