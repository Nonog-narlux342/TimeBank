<template>
  <div>
    <div class="color2" align="left">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px"><font color="#FFFFFF">สร้างกิจกรรม</font></h5>
      </ul>
    </div>
    <div v-if="user[0].ACTIVEMEMBER == 1">
      <div style="margin: 20px" align="left">
        <b-row style="margin-top: 10px">
          <b-col>
            <label falign="left">ชื่อกิจกรรม (*จำเป็น)</label>
            <vue-bootstrap-typeahead
              :data="items"
              v-model="ACTIVITY_NAME"
              :serializer="(s) => s.ACTIVITY_NAME"
            ></vue-bootstrap-typeahead>
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px">
          <b-col>
            <label falign="left">เบอร์โทร (*จำเป็น)</label>
            <b-form-input
              v-model="ACTIVITY_TELEPHONE"
              :state="phoneState"
              aria-describedby=" input-live-phone"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px">
          <b-col>
            <label falign="left">ที่อยู่</label>
            <b-form-input
              :state="addressState"
              v-model="ACTIVITY_ADDRESS"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px">
          <!-- รหัสไปรษณีย์ -->
          <b-col>
            <div class="addresss">
              <addressinput-zipcode v-model="ACTIVITY_ZIPCODE" />
            </div>
          </b-col>
          <!--ตำบล/แขวง -->
        </b-row>
        <b-row>
          <b-col>
            <div class="addresss">
              <addressinput-subdistrict v-model="ACTIVITY_SUBDISTRIC" />
            </div>
          </b-col>
        </b-row>
        <!-- อำเภอ/เขต -->
        <b-row>
          <br />
          <b-col>
            <div class="addresss">
              <addressinput-district v-model="ACTIVITY_DISTRICT" />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <!-- จังหวัด -->
          <b-col>
            <div class="address">
              <addressinput-province v-model="ACTIVITY_PROVINCE" />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label falign="left">จำนวน (คน) (*จำเป็น)</label>
            <b-form-spinbutton
              id="sb-default"
              v-model="ACTIVITY_COUNT"
            ></b-form-spinbutton>
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px">
          <b-col
            ><label falign="left">ต้องการผู้ช่วย (เพศ)</label>
            <b-form-radio-group
              v-model="ACTIVITY_SEX"
              :options="options"
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-radio-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <label falign="left">วันที่ (*จำเป็น)</label>
            <br />
            <!-- <md-datepicker v-model="ACTIVITY_DAY" md-immediately /> -->
            <div class="date">
              <date-picker v-model="ACTIVITY_DAY"></date-picker>
            </div>
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px" v-if="member==10||member==11||member==12||member==13||member==14">
          <b-col>
            <label falign="left">ช่วงเวลา (ชั่วโมง)</label>
            <b-form-spinbutton id="sb-wrap" v-model="ACTIVITY_TIME" min="1" max="24" placeholder="--"></b-form-spinbutton>
            <!-- <b-form-select
              v-model="ACTIVITY_TIME"
              :options="option"
            ></b-form-select> -->
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px" v-else>
          <b-col>
            <label falign="left">ช่วงเวลา</label>
            <b-form-select v-model="ACTIVITY_TIME">
              <b-form-select-option :value="null"
               disabled >เลือกช่วงเวลา</b-form-select-option
              >
              <b-form-select-option value="ช่วงเช้า"
                >ช่วงเช้า</b-form-select-option
              >
              <b-form-select-option value="ช่วงบ่าย"
                >ช่วงบ่าย</b-form-select-option
              >
              <b-form-select-option value="ทั้งวัน"
                >ทั้งวัน</b-form-select-option
              >
            </b-form-select>
            <!-- <b-form-select
              v-model="ACTIVITY_TIME"
              :options="option"
            ></b-form-select> -->
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px">
          <b-col>
            <label falign="left">เวลานัด</label>
            <!-- <b-input
            :state="timeState"
              type="text"
              placeholder="08:00"
              v-model="APPPOINTMENT_TIME"
            ></b-input> -->
            <b-input v-model="APPPOINTMENT_TIME"></b-input>
          </b-col>
        </b-row>
        <b-row style="padding-top: 10px">
          <b-col>
            <label falign="left">อุปกรณ์</label>
            <!-- <b-form-select
              v-model="ACTIVITY_EQUIPMENT"
              :options="option_EQUIPMENT"
            ></b-form-select> -->
             <b-form-select v-model="ACTIVITY_EQUIPMENT">
              <b-form-select-option :value="null"
               disabled >เลือกอุปกรณ์</b-form-select-option
              >
              <b-form-select-option value="จัดหาเอง"
                >จัดหาเอง</b-form-select-option
              >
              <b-form-select-option value="ยืมจากธนาคาร"
                >ยืมจากธนาคาร</b-form-select-option
              >
              <b-form-select-option value="เจ้าของเตรียมให้"
                >เจ้าของเตรียมให้</b-form-select-option
              >
              <b-form-select-option value="ไม่ระบุ"
                >ไม่ระบุ</b-form-select-option
              >
            </b-form-select>
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px">
          <b-col sm="2">
            <label for="textarea-small">รายละเอียด (*จำเป็น)</label>
          </b-col>
          <b-col sm="10">
            <b-form-textarea
              :state="detailState"
              id="textarea-small"
              v-model="ACTIVITY_DETAILS"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px">
          <b-col sm="2">
            <label for="textarea-small">เพิ่มรูปภาพ(ไม่จำเป็น)</label>
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
        <b-row>
          <b-col align="right">
            <div style="padding: 10px" v-if="loadadd">
              <b-spinner
                variant="success"
                style="width: 3rem; height: 3rem"
                label="Spinning"
              ></b-spinner>
            </div>
            <div style="padding: 10px" v-else>
              <b-button pill variant="outline-success" @click="Request"
                >สร้างกิจกรรม</b-button
              >
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <div v-else><center>ไม่สามารถใช้งานได้</center></div>
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
const api_url = require("../../../utilities/api");
import axios from "axios";
import firebase from "firebase";
import DatePicker from "../../../utilities/vue2-datepicker";
import moment from "moment";
export default {
  components: {
    VueBootstrapTypeahead,
  },
  computed: {
    phoneState() {
      return this.ACTIVITY_TELEPHONE.length == 10 ? true : false;
    },
    addressState() {
      return this.ACTIVITY_ADDRESS.length > 2 ? true : false;
    },
    timeState() {
      return this.APPPOINTMENT_TIME.length > 2 ? true : false;
    },
    detailState() {
      return this.ACTIVITY_DETAILS.length > 2 ? true : false;
    },
  },
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      items: null,
      user: null,
      loadadd: false,
      ACTIVITY_NAME: "",
      ACTIVITY_TELEPHONE: "",
      ACTIVITY_ADDRESS: "",
      ACTIVITY_SUBDISTRIC: "",
      ACTIVITY_DISTRICT: "",
      ACTIVITY_PROVINCE: "",
      ACTIVITY_ZIPCODE: "",
      ACTIVITY_COUNT: "",
      ACTIVITY_SEX: "",
      ACTIVITY_IMG: "",
      APPPOINTMENT_TIME: "",
      options: [
        { item: "ชาย", name: "ชาย" },
        { item: "หญิง", name: "หญิง" },
        { item: "ไม่จำกัด", name: "ไม่จำกัด" },
      ],
      ACTIVITY_DAY: "",
      ACTIVITY_TIME: "",
      option: [
        { value: "ช่วงเช้า", text: "ช่วงเช้า" },
        { value: "ช่วงบ่าย", text: "ช่วงบ่าย" },
        { value: "ทั้งวัน", text: "ทั้งวัน" },
      ],
      ACTIVITY_EQUIPMENT: "",
      option_EQUIPMENT: [
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
  components: {
    DatePicker,
  },
  created() {
    var _this = this;
    // liff.init({ liffId: "1654799307-oE5d1bLb" }, function (data) {
    //   if (!liff.isLoggedIn()) {
    //     liff.login();
    //     return;
    //   }
    //   liff.getProfile().then((p) => {
    //     // console.log(p.userId);
    //     _this.userlineId = p.userId;
    _this.userlineId = "Ua0e88a4d0518fe246c5d8a601cdf35d0";

    axios
      .post(`${api_url.api_url}/CHECKUSER`, {
        USERID: _this.userlineId,
        // _this.userlineId,
      })
      .then((response) => {
        _this.user = response.data;
        // console.log(response.data);
      });
    // });
    axios.post(`${api_url.api_url}/autocomples`).then((response) => {
      _this.items = response.data;
      // console.log(_this.items);
    });
    // });
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
    back() {
      liff.init({ liffId: "1654799307-oE5d1bLb" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    delact() {
      (this.loadadd = false), this.$bvModal.hide("noinsertActivity");
    },

    Request() {
      this.loadadd = true;
      this.$store.commit(
        "Detail/SET_USERID",
        this.$store.getters["Detail/USERID"]
      );
      console.log(this.ACTIVITY_TIME);
      this.picture = null;
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
            // console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.ACTIVITY_IMG = url;
              if (
                this.ACTIVITY_NAME != "" &&
                this.ACTIVITY_TELEPHONE != "" &&
                this.ACTIVITY_ADDRESS != "" &&
              //   this.ACTIVITY_SUBDISTRIC != "" &&
              //   this.ACTIVITY_DISTRICT != "" &&
              //   this.ACTIVITY_PROVINCE != "" &&
              //   this.ACTIVITY_ZIPCODE != "" &&
                this.ACTIVITY_COUNT != "" &&
              //   this.ACTIVITY_SEX != "" &&
                this.ACTIVITY_DAY != "" &&
              //   this.ACTIVITY_TIME != "" &&
                this.ACTIVITY_DETAILS != "" 
              //   this.APPPOINTMENT_TIME != "" &&
                // this.ACTIVITY_EQUIPMENT != ""
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
                  MEMBERSHIP_ID: this.user[0].MEMBERSHIP_ID,
                  ACTIVITY_IMG: url,
                  APPPOINTMENT_TIME: this.APPPOINTMENT_TIME,
                  ACTIVITY_EQUIPMENT: this.ACTIVITY_EQUIPMENT,
                  ACTIVE: "1",
                };

                // console.log(this.user[0].MEMBERSHIP_ID);
                axios
                  .post(`${api_url.api_url}/insertActivity`, data)
                  .then((response) => {
                    // console.log(response);
                    this.$router.push({ path: "/Activity" });
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
        //   this.ACTIVITY_SUBDISTRIC != "" &&
        //   this.ACTIVITY_DISTRICT != "" &&
        //   this.ACTIVITY_PROVINCE != "" &&
        //   this.ACTIVITY_ZIPCODE != "" &&
          this.ACTIVITY_COUNT != "" &&
        //   this.ACTIVITY_SEX != "" &&
          this.ACTIVITY_DAY != "" &&
        //   this.ACTIVITY_TIME != "" &&
          this.ACTIVITY_DETAILS != "" 
        //   this.APPPOINTMENT_TIME != "" &&
          // this.ACTIVITY_EQUIPMENT != ""
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
            MEMBERSHIP_ID: this.user[0].MEMBERSHIP_ID,
            ACTIVITY_IMG:
              "https://firebasestorage.googleapis.com/v0/b/timebank-544c6.appspot.com/o/imgactivity.png?alt=media&token=bec5d214-4f73-45e8-ace4-451b506c1fd0",
            APPPOINTMENT_TIME: this.APPPOINTMENT_TIME,
            ACTIVITY_EQUIPMENT: this.ACTIVITY_EQUIPMENT,
            ACTIVE: "1",
          };

          // console.log(this.user[0].MEMBERSHIP_ID);
          axios
            .post(`${api_url.api_url}/insertActivity`, data)
            .then((response) => {
              // console.log(response);
              this.$router.push({ path: "/Activity" });
            }).catch((err)=>{
              console.log(err);
              alert(err)
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
div .addresss input.th-address-input {
  background-color: #fff;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  color: #666;
  display: inline-block;
  font-size: 16px;
  height: 40px;
  line-height: 38px;
  padding: 8px 6px;
  transition-property: border;
  transition: 0.2s ease-in-out;
  width: 330px;
}
.color {
  background-color: rgb(248, 232, 141);
}
div.date input.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 62px;
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

div .mx-datepicker svg {
  width: 21em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>