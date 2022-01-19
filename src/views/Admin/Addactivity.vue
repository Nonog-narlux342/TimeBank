<template>
  <div v-if="!loginn == 0 || !loginn == null">
    <Nav />
    <div>
      <div align="left">
        <div style="margin: 10px">
          <div>
            <b-row>
              <b-col cols="1">
                <div align="right">
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/3628/3628905.svg"
                    style="width: 80px"
                    alt=""
                  />
                </div>
              </b-col>
              <b-col cols="11">
                <div align="left" style="margin-top: 45px">
                  <font size="6px">สร้างกิจกรรม</font>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <b-row>
          <b-col cols="6">
            <b-card style="margin-left: 10px; margin-right: 5px">
              <b-row style="padding-top: 10px">
                <b-col cols="2">ชื่อกิจกรรม</b-col>
                <b-col>
                  <!-- <b-form-input v-model="ACTIVITY_NAME"></b-form-input> -->
                  <vue-bootstrap-typeahead
                    :data="items"
                    v-model="ACTIVITY_NAME"
                    :serializer="(s) => s.ACTIVITY_NAME"
                  ></vue-bootstrap-typeahead>
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px">
                <b-col cols="2">เบอร์โทร</b-col>
                <b-col>
                  <b-form-input
                    v-model="ACTIVITY_TELEPHONE"
                    :state="phoneState"
                    aria-describedby=" input-live-phone"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-phone">
                    ป้อนตัวเลข 10 ตัว
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px">
                <b-col cols="2">ที่อยู่</b-col>
                <b-col>
                  <b-form-input v-model="ACTIVITY_ADDRESS"></b-form-input>
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px">
                <b-col cols="2">วันที่</b-col>
                <b-col >
                  <!-- <md-datepicker v-model="ACTIVITY_DAY" md-immediately /> -->
                  <div class="dateactivity">
                    <date-picker v-model="ACTIVITY_DAY"></date-picker>
                  </div>
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px">
                <!-- รหัสไปรษณีย์ -->
                <b-col cols="6">
                  <addressinput-zipcode v-model="ACTIVITY_ZIPCODE" />
                </b-col>
                <!--ตำบล/แขวง -->
                <b-col cols="6">
                  <addressinput-subdistrict v-model="ACTIVITY_SUBDISTRIC" />
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px">
                <!-- อำเภอ/เขต -->
                <b-col cols="6">
                  <addressinput-district v-model="ACTIVITY_DISTRICT" />
                </b-col>
                <!-- จังหวัด -->
                <b-col cols="6">
                  <addressinput-province v-model="ACTIVITY_PROVINCE" />
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <!-- เเยก -->
          <b-col cols="6">
            <b-card style="margin-left: 10px; margin-right: 5px">
              <b-row style="padding-top: 10px">
                <b-col cols="2">จำนวน (คน)</b-col>
                <b-col>
                  <b-form-spinbutton
                    id="sb-default"
                    v-model="ACTIVITY_COUNT"
                  ></b-form-spinbutton>
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px">
                <b-col cols="2">ต้องการผู้ช่วย (เพศ)</b-col>
                <b-col>
                  <b-form-select
                    v-model="ACTIVITY_SEX"
                    :options="options"
                  ></b-form-select>
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px" v-if="member==10||member==11||member==12||member==13||member==14">
                <b-col cols="2">ช่วงเวลา (ชั่วโมง)</b-col>
                <b-col>
                   <b-form-spinbutton id="sb-wrap" v-model="ACTIVITY_TIME" min="1" max="24" placeholder="--"></b-form-spinbutton>
                </b-col>
              </b-row>
              <b-row style="padding-top: 10px" v-else>
                <b-col cols="2">ช่วงเวลา</b-col>
                <b-col>
                   <b-form-select v-model="ACTIVITY_TIME" :options="option"></b-form-select>
                </b-col>
              </b-row>
              <b-row style="padding-top: 10px">
                <b-col cols="2">อุปกรณ์</b-col>
                <b-col>
                  <b-form-select
                    v-model="ACTIVITY_EQUIPMENT"
                    :options="option_EQUIPMENT"
                  ></b-form-select>
                </b-col>
              </b-row>

              <b-row style="padding-top: 10px">
                <b-col cols="2"> เวลานัด </b-col>
                <b-col>
                  <!-- <b-form-timepicker
                    v-model="APPPOINTMENT_TIME"
                    placeholder="เลือกเวลานัด"
                    locale="th"
                  ></b-form-timepicker> -->
                  <b-input v-model="APPPOINTMENT_TIME"></b-input>
                </b-col>
              </b-row>
              <b-row style="padding-top: 10px">
                <b-col sm="2">
                  <label for="textarea-small">รายละเอียด</label>
                </b-col>
                <b-col>
                  <b-form-textarea
                    id="textarea-small"
                    v-model="ACTIVITY_DETAILS"
                  ></b-form-textarea>
                </b-col>
              </b-row>
              <b-row style="margin-top: 10px">
                <b-col sm="2">
                  <label for="textarea-small"
                    >เพิ่มรูปภาพ<br />(ไม่จำเป็น)</label
                  >
                </b-col>
                <b-col sm="10">
                  <b-form-file
                    @change="previewImage"
                    accept="image/*"
                    placeholder="อัพโหลดไฟล์"
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                </b-col>
              </b-row>
              <b-row style="padding-top: 10px">
                <b-col align="right">
                  <div style="padding: 10px" v-if="loadadd">
                    <b-spinner
                      variant="success"
                      style="width: 3rem; height: 3rem"
                      label="Spinning"
                    ></b-spinner>
                  </div>
                  <div style="padding: 10px" v-else>
                    <b-button
                      pill
                      variant="outline-success"
                      style="width: 250px"
                      @click="Request"
                      >สร้างกิจกรรม</b-button
                    >
                  </div>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal centered id="noinsertActivity" hide-footer>
      <div class="d-block text-center">
        <font color="#FF0000"><h5>กรอกข้อมูลไม่ครบ</h5></font>
        <h6>กรุณาตรวจสอบข้อมูล</h6>
      </div>
      <b-button variant="info" block @click="delact">ตกลง</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import QrcodeVue from "qrcode.vue";
const api_url = require("../../../utilities/api");

import moment from "moment";
import DatePicker from "../../../utilities/vue2-datepicker";
import Nav from "../../components/Nav";
export default {
  components: {
    DatePicker,
    Nav,
    VueBootstrapTypeahead,
  },
  computed: {
    phoneState() {
      return this.ACTIVITY_TELEPHONE.length == 10 ? true : false;
    },
  },

  data() {
    return {
      loadadd: false,
      imageData: null,
      picture: null,
      uploadValue: 0,
      items: null,
      loginn: "",
      ACTIVITY_NAME: "",
      ACTIVITY_TELEPHONE: "",
      ACTIVITY_ADDRESS: "",
      ACTIVITY_SUBDISTRIC: "",
      ACTIVITY_DISTRICT: "",
      ACTIVITY_PROVINCE: "",
      ACTIVITY_ZIPCODE: "",
      ACTIVITY_COUNT: "",
      ACTIVITY_IMG: "",
      APPPOINTMENT_TIME: "",
      ACTIVITY_SEX: "",
      options: [
        { value: "", text: "เลือกเพศ" },
        { value: "ชาย", text: "ชาย" },
        { value: "หญิง", text: "หญิง" },
        { value: "ไม่จำกัด", text: "ไม่จำกัด" },
      ],
      ACTIVITY_DAY: "",
      ACTIVITY_TIME: "",
      option: [
        { value: "", text: "เลือกช่วงเวลา" },
        { value: "ช่วงเช้า", text: "ช่วงเช้า" },
        { value: "ช่วงเย็น", text: "ช่วงเย็น" },
        { value: "ทั้งวัน", text: "ทั้งวัน" },
      ],
      ACTIVITY_EQUIPMENT: "",
      option_EQUIPMENT: [
        { value: "", text: "อุปกรณ์" },
        { value: "จัดหาเอง", text: "จัดหาเอง" },
        { value: "ยืมจากธนาคาร", text: "ยืมจากธนาคาร" },
        { value: "เจ้าของเตรียมให้", text: "เจ้าของเตรียมให้" },
        { value: "ไม่ระบุ", text: "ไม่ระบุ" },
      ],
      ACTIVITY_DETAILS: "",
      MEMBERSHIP_ID: "",
      member: null,
    };
  },
  created() {
    this.show();
    axios.post(`${api_url.api_url}/autocomples`).then((response) => {
      this.items = response.data;
      console.log(this.items);
    });
    axios
      .post(`${api_url.api_url}/semember`, {
        MEMBERSHIP_ID: localStorage.getItem("MEMBERSHIP_ID"),
      })
      .then((response) => {
        this.member = response.data[0].TIME_BANK;
        // console.log(this.member);
      });
  },

  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    itemSelected(item) {
      this.item = item;
    },
    setLabel(item) {
      return item.ACTIVITY_NAME;
    },
    inputChange(text) {
      // your search method
      this.items = this.items.filter((item) =>
        item.ACTIVITY_NAME.includes(text)
      );
    },
    show() {
      this.loginn = localStorage.getItem("USER");
      this.ID = localStorage.getItem("MEMBERSHIP_ID");
      console.log(this.ID);
      console.log(this.loginn);
    },
    delact() {
      (this.loadadd = false), this.$bvModal.hide("noinsertActivity");
    },
    Request() {
      this.loadadd = true;
      this.picture = null;
      console.log(this.ACTIVITY_TIME);
      if (this.imageData) {
        const storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.ACTIVITY_IMG = url;
              if (
                this.ACTIVITY_NAME != "" &&
                this.ACTIVITY_TELEPHONE != "" &&
                this.ACTIVITY_ADDRESS != "" &&
                this.ACTIVITY_SUBDISTRIC != "" &&
                this.ACTIVITY_DISTRICT != "" &&
                this.ACTIVITY_PROVINCE != "" &&
                this.ACTIVITY_ZIPCODE != "" &&
                this.ACTIVITY_COUNT != "" &&
                this.ACTIVITY_SEX != "" &&
                this.ACTIVITY_DAY != "" &&
               // this.ACTIVITY_TIME != "" &&
                this.ACTIVITY_DETAILS != "" &&
                this.APPPOINTMENT_TIME != "" &&
                this.ACTIVITY_EQUIPMENT != ""
              ) {
                var data = {
                  ACTIVITY_NAME: this.ACTIVITY_NAME,
                  ACTIVITY_TELEPHONE: this.ACTIVITY_TELEPHONE,
                  ACTIVITY_ADDRESS: this.ACTIVITY_ADDRESS,
                  ACTIVITY_SUBDISTRIC: this.ACTIVITY_SUBDISTRIC,
                  ACTIVITY_DISTRICT: this.ACTIVITY_DISTRICT,
                  ACTIVITY_PROVINCE: this.ACTIVITY_PROVINCE,
                  ACTIVITY_ZIPCODE: this.ACTIVITY_ZIPCODE,
                  ACTIVITY_COUNT: this.ACTIVITY_COUNT,
                  ACTIVITY_SEX: this.ACTIVITY_SEX,
                  ACTIVITY_DAY: moment(this.ACTIVITY_DAY).format("YYYY-MM-DD"),
                  ACTIVITY_TIME: this.ACTIVITY_TIME,
                  ACTIVITY_DETAILS: this.ACTIVITY_DETAILS,
                  MEMBERSHIP_ID: this.ID,
                  ACTIVITY_IMG: url,
                  APPPOINTMENT_TIME: this.APPPOINTMENT_TIME,
                  ACTIVITY_EQUIPMENT: this.ACTIVITY_EQUIPMENT,
                  ACTIVE: "1",
                };
                // console.log(123);
                // var data = {
                //   ACTIVITY_NAME: this.ACTIVITY_NAME,
                //   ACTIVITY_TELEPHONE: this.ACTIVITY_TELEPHONE,
                //   ACTIVITY_ADDRESS: this.ACTIVITY_ADDRESS,
                //   ACTIVITY_SUBDISTRIC: this.ACTIVITY_SUBDISTRIC,
                //   ACTIVITY_DISTRICT: this.ACTIVITY_DISTRICT,
                //   ACTIVITY_PROVINCE: this.ACTIVITY_PROVINCE,
                //   ACTIVITY_ZIPCODE: this.ACTIVITY_ZIPCODE,
                //   ACTIVITY_COUNT: this.ACTIVITY_COUNT,
                //   ACTIVITY_SEX: this.ACTIVITY_SEX,
                //   ACTIVITY_DAY: moment(this.ACTIVITY_DAY).format("YYYY-MM-DD"),
                //   ACTIVITY_TIME: this.ACTIVITY_TIME,
                //   ACTIVITY_DETAILS: this.ACTIVITY_DETAILS,
                //   MEMBERSHIP_ID: this.ID,
                //   ACTIVITY_IMG: url,
                //   APPPOINTMENT_TIME: this.APPPOINTMENT_TIME,
                //   ACTIVITY_EQUIPMENT: this.ACTIVITY_EQUIPMENT,
                //   ACTIVE: "1",
                // };
                console.log(data);
                axios
                  .post(`${api_url.api_url}/insertActivity`, data)
                  .then((response) => {
                    console.log(response);
                    this.$router.push({ path: "/Adminactivity" });
                  });
              } else {
                this.$bvModal.show("noinsertActivity");
              }
            });
          }
        );
      } else {
        if (
          this.ACTIVITY_NAME != "" &&
          this.ACTIVITY_TELEPHONE != "" &&
          this.ACTIVITY_ADDRESS != "" &&
          this.ACTIVITY_SUBDISTRIC != "" &&
          this.ACTIVITY_DISTRICT != "" &&
          this.ACTIVITY_PROVINCE != "" &&
          this.ACTIVITY_ZIPCODE != "" &&
          this.ACTIVITY_COUNT != "" &&
          this.ACTIVITY_SEX != "" &&
          this.ACTIVITY_DAY != "" &&
         // this.ACTIVITY_TIME != "" &&
          this.ACTIVITY_DETAILS != "" &&
          this.APPPOINTMENT_TIME != "" &&
          this.ACTIVITY_EQUIPMENT != ""
        ) {
          var data = {
            ACTIVITY_NAME: this.ACTIVITY_NAME,
            ACTIVITY_TELEPHONE: this.ACTIVITY_TELEPHONE,
            ACTIVITY_ADDRESS: this.ACTIVITY_ADDRESS,
            ACTIVITY_SUBDISTRIC: this.ACTIVITY_SUBDISTRIC,
            ACTIVITY_DISTRICT: this.ACTIVITY_DISTRICT,
            ACTIVITY_PROVINCE: this.ACTIVITY_PROVINCE,
            ACTIVITY_ZIPCODE: this.ACTIVITY_ZIPCODE,
            ACTIVITY_COUNT: this.ACTIVITY_COUNT,
            ACTIVITY_SEX: this.ACTIVITY_SEX,
            ACTIVITY_DAY: moment(this.ACTIVITY_DAY).format("YYYY-MM-DD"),
            ACTIVITY_TIME: this.ACTIVITY_TIME,
            ACTIVITY_DETAILS: this.ACTIVITY_DETAILS,
            MEMBERSHIP_ID: this.ID,
            ACTIVITY_IMG:
              "https://firebasestorage.googleapis.com/v0/b/timebank-544c6.appspot.com/o/imgactivity.png?alt=media&token=bec5d214-4f73-45e8-ace4-451b506c1fd0",
            APPPOINTMENT_TIME: this.APPPOINTMENT_TIME,
            ACTIVITY_EQUIPMENT: this.ACTIVITY_EQUIPMENT,
            ACTIVE: "1",
          };
          console.log(data);
          axios
            .post(`${api_url.api_url}/insertActivity`, data)
            .then((response) => {
              console.log(response);
              this.$router.push({ path: "/Adminactivity" });
            });
        } else {
          this.$bvModal.show("noinsertActivity");
        }
      }
    },
  },
};
</script>

<style>
div.dateactivity input.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 570px;
  height: 34px;
  padding: 6px 30px;
  padding-left: 61px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
</style>