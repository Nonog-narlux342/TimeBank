<template>
  <div>
    <!-- v-if="!loginn == 0 || !loginn == null" -->
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
          <br />
          <b>ข้อมูลส่วนตัว</b>
        </b-col>
        <b-col cols="1">
          <div style="margin-top: 15px">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/545/545682.svg"
              style="width: 30px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/3203/3203076.svg"
            style="width: 50px"
            alt=""
          />
          <br />
          <b>วันเวลาทำงาน</b>
        </b-col>
        <b-col cols="1">
          <div style="margin-top: 15px">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/545/545682.svg"
              style="width: 30px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/2833/2833577.svg"
            style="width: 50px"
            alt=""
          />
          <br />
          <b>ความสามารถ</b>
        </b-col>
        <b-col cols="1">
          <div style="margin-top: 15px">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/545/545682.svg"
              style="width: 30px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/1828/1828710.svg"
            style="width: 50px"
            alt=""
          />
          <br />
          <b>เสร็จสิ้น</b>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </div>
    <b-card style="margin: 10px">
      <div>
        <b-row style="margin-top: 10px">
          <b-col cols="6"
            ><h5>สาขาธนาคารเวลา</h5>
            <b-form-select v-model="TIME_BANK">
              <b-form-select-option
                v-for="(timeback, index) in timeback"
                :key="index"
                v-model="timeback.TIME_BANK"
                :value="timeback.BANK_NAME"
                >{{ timeback.BANK_NAME }}</b-form-select-option
              >
            </b-form-select></b-col
          >
          <b-col cols="6"
            ><h5>แต้มกิจกรรม</h5>
            <b-form-select v-model="TRANSACTIONS_POINT" :options="point">
            </b-form-select
          ></b-col>
        </b-row>
      </div>
    </b-card>
    <div>
      <b-row>
        <b-col cols="6">
          <b-card style="margin-left: 10px">
            <h5>ข้อมูลส่วนตัว</h5>
            <b-row style="margin-top: 10px">
              <b-col cols="1">ชื่อ:</b-col>
              <b-col cols="5"
                ><b-form-input
                  v-model="MEMBERSHIP_FIRFENAME"
                  style="width=100px"
                ></b-form-input
              ></b-col>
              <b-col cols="2">นามสกุล:</b-col>
              <b-col cols="4"
                ><b-form-input v-model="MEMBERSHIP_LASTNAME"></b-form-input
              ></b-col>
            </b-row>

            <b-row style="margin-top: 10px">
              <!-- <b-col cols="2">เลขบัตรปชช:</b-col>
              <b-col cols="4">
                <b-form-input
                  v-model="MEMBERSHIP_CID"
                  :state="cidState"
                  aria-describedby=" input-live-CID"
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-CID">
                  ป้อนตัวเลข 13 ตัว
                </b-form-invalid-feedback>
              </b-col> -->
              <b-col cols="2">ระดับการศึกษา:</b-col>
              <b-col cols="4">
                <b-form-select
                  v-model="MEMBERSHIP_EDUCATION"
                  :options="education"
                ></b-form-select>
                <!-- <b-form-input v-model="MEMBERSHIP_EDUCATION"></b-form-input> -->
              </b-col>
            </b-row>

            <b-row style="margin-top: 10px"
              ><b-col cols="2">เกิดวันที่:</b-col>
              <b-col cols="4">
                <div class="dateaddmember">
                  <date-picker v-model="MEMBERSHIP_BIRTH"></date-picker>
                </div>
              </b-col>
              <b-col cols="2">ที่อยู่:</b-col>
              <b-col cols="4">
                <b-form-input v-model="MEMBERSHIP_ADDRESS"></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <!-- รหัสไปรษณีย์ -->
              <b-col cols="6">
                <div class="address">
                  <addressinput-zipcode v-model="ZIPCODE" />
                </div>
              </b-col>
              <!--ตำบล/แขวง -->
              <b-col cols="6">
                <div class="address">
                  <addressinput-subdistrict v-model="SUBDISTRIC" />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <!-- อำเภอ/เขต -->
              <b-col cols="6">
                <div class="address">
                  <addressinput-district v-model="DISTRICT" />
                </div>
              </b-col>
              <!-- จังหวัด -->
              <b-col cols="6">
                <div class="address">
                  <addressinput-province v-model="PROVINCE" />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2">เบอร์โทร:</b-col>
              <b-col cols="4">
                <b-form-input
                  v-model="MEMBERSHIP_TELEPHONE"
                  :state="phoneState"
                  aria-describedby=" input-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  ป้อนตัวเลข 10 ตัว
                </b-form-invalid-feedback>
              </b-col>
              <b-col cols="2">สถานะ:</b-col>
              <b-col cols="4">
                <b-form-select
                  v-model="MEMBERSHIP_TYPE"
                  :options="option"
                ></b-form-select>
              </b-col>
            </b-row>
            <div v-if="MEMBERSHIP_TYPE == 'Admin'" style="margin-top: 20px">
              <b-card>
                <b-row>
                  <b-col cols="6">
                    <label>ชื่อผู้ใช้งาน:</label>
                    <b-form-input v-model="ADMIN_USER"></b-form-input
                  ></b-col>
                  <b-col cols="6">
                    <label>รหัสผ่าน:</label>
                    <b-form-input v-model="ADMIN_PASSWORD"></b-form-input
                  ></b-col>
                </b-row>
              </b-card>
            </div>
          </b-card>
        </b-col>
        <!-- เเยก -->
        <b-col cols="6">
          <b-card style="margin-right: 10px">
            <b-row style="margin-top: 10px">
              <b-col cols="3">ความต้องการปฏิบัติงานของสมาชิกธนาคารเวลา:</b-col>
              <b-col cols="9">
                <b-form-select
                  v-model="MEMBERSHIP_REQUIREMENTS"
                  :options="requirements"
                ></b-form-select>
              </b-col>
            </b-row>

            <b-row style="margin-top: 10px">
              <b-col cols="4"
                >สิ่งที่คาดหวังจากการเข้าร่วมเป็นสมาชิกธนาคารเวลา:</b-col
              >
              <b-col cols="8">
                <b-form-input v-model="MEMBERSHIP_EXPECTATION"></b-form-input>
              </b-col>
            </b-row>

            <b-row style="margin-top: 10px">
              <b-col cols="3">อัพโหลดรูปภาพโปรไฟล์ :</b-col>
              <b-col cols="9">
                <b-form-file
                  @change="previewImage"
                  v-model="MEMBERSHIP_IMGE"
                  accept="image/*"
                  placeholder="อัพโหลดไฟล์"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-col>
            </b-row>

            <h5>รายชื่อผู้รับผลประโยชน์</h5>

            <b-row style="margin-top: 10px">
              <b-col cols="1">ชื่อ:</b-col>
              <b-col cols="5">
                <b-form-input v-model="CONTACTPERSONS_FIRFENAME"></b-form-input>
              </b-col>
              <b-col cols="2">นามสกุล:</b-col>
              <b-col cols="4">
                <b-form-input v-model="CONTACTPERSONS_LASTNAME"></b-form-input>
              </b-col>
            </b-row>

            <b-row style="margin-top: 10px">
              <b-col cols="2">เบอร์โทร:</b-col>
              <b-col cols="4">
                <b-form-input
                  v-model="CONTACTPERSONS_TELEPHONE"
                  :state="phoneCaState"
                  aria-describedby=" input-live-phone"
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-phone">
                  ป้อนตัวเลข 10 ตัว
                </b-form-invalid-feedback>
              </b-col>
              <b-col cols="2">ความสัมพันธ์:</b-col>
              <b-col cols="4">
                <b-form-input
                  v-model="CONTACTPERSONS_RELATIONSHIP"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row style="margin-top: 15px">
              <b-col>
                <p>
                  ข้าพเจ้ายินดีปฏิบัติตามกฎระเบียบโครงการธนาคารเวลาของประเทศไทย
                </p>
                <p>
                  *
                  ทั้งนี้ข้อมูลส่วนตัวของท่านจะถูกเก็บเป็นความลับอย่างเข้มงวดตลอดเวลา
                </p>
              </b-col>
            </b-row>
          </b-card>
          <b-row
            style="margin-right: 20px; margin-top: 20px; margin-bottom: 20px"
          >
            <b-col align="right">
              <div align="right" style="margin-right: 100px" v-if="loadadd">
                <b-spinner
                  variant="success"
                  style="width: 3rem; height: 3rem"
                  label="Spinning"
                ></b-spinner>
              </div>
              <div v-else>
                <b-button
                  pill
                  style="width: 250px"
                  variant="outline-success"
                  @click="Addmember1"
                  v-b-modal.modal-center
                  >ถัดไป <b-icon icon="arrow-right"></b-icon
                ></b-button>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
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
const api_url = require("../../../utilities/api");
import moment from "moment";
import DatePicker from "../../../utilities/vue2-datepicker";
import Nav from "../../components/Nav";
export default {
  components: {
    DatePicker,
    Nav,
  },
  computed: {
    phoneState() {
      return this.MEMBERSHIP_TELEPHONE.length == 10 ? true : false;
    },
    phoneCaState() {
      return this.CONTACTPERSONS_TELEPHONE.length == 10 ? true : false;
    },
    // cidState() {
    //   return this.MEMBERSHIP_CID.length == 13 ? true : false;
    // },
  },
  data() {
    return {
      loadadd: false,
      education: [
        { value: "", text: "กรุณาเลือกระดับการศึกษา" },
        { value: "ต่ำกว่าประถมศึกษา", text: "ต่ำกว่าประถมศึกษา" },
        { value: "ประถมศึกษา", text: "ประถมศึกษา" },
        { value: "ม.ต้น", text: "ม.ต้น" },
        { value: "ม.ปลาย/ปวช.", text: "ม.ปลาย/ปวช." },
        { value: "อนุปริญญา/ปวส.", text: "อนุปริญญา/ปวส." },
        { value: "ป.ตรี", text: "ป.ตรี" },
        { value: "ป.โท", text: "ป.โท" },
        { value: "ป.เอก", text: "ป.เอก" },
        { value: "อื่น", text: "อื่น" },
      ],
      requirements: [
        { value: "", text: "วันที่ต้องการ" },
        { value: "1", text: "เสาร์" },
        { value: "2", text: "อาทิตย์" },
        { value: "3", text: "เสาร์/อาทิตย์" },
        { value: "4", text: "จันทร์ - ศุกร์" },
        { value: "5", text: "วันหยุดนักขัตฤกษ์" },
        { value: "6", text: "ตามสะดวก" },
        { value: "7", text: "ได้ทุกเวลา" },
      ],
      point: [
        { value: "5", text: "5 คะเเนน" },
        { value: "10", text: "10 คะเเนน" },
        { value: "15", text: "15 คะเเนน" },
        { value: "20", text: "20 คะเเนน" },
      ],
      // timeback: [
      //   { value: "", text: "กรุณาเลือกสาขาธนาคารเวลา" },
      //   { value: "1", text: "ธนาคารเวลา ออมเวลาปันด้วยใจ ให้ด้วยรัก" },
      //   { value: "2", text: "ธนาคารเวลา รวมพลังใจรัก ตำบลต้นเปา" },
      //   { value: "3", text: "ธนาคารเวลา รวมใจรัก ตำบลยางคราม" },
      //   { value: "4", text: "ธนาคารเวลา ตำบลป่าตุ้ม" },
      //   { value: "5", text: "ธนาคารเวลา บ้านสันละลึก" },
      //   { value: "6", text: "ธนาคารเวลา บ้านห้วยโป่ง" },
      //   { value: "7", text: "ธนาคารเวลา ตำบลแม่แฝกใหม่" },
      //   { value: "8", text: "ธนาคารเวลา ฮอมใจ๋ ใส่เวลา อำเภอเวียงแหง" },
      //   { value: "9", text: "ธนาคารเวลา บ้านกู่ฮ้อสามัคคี" },
      //   // { value: "10", text: "ธนาคารเวลา บ้านกู่ฮ้อสามัคคี" },
      // ],
      option: [
        { value: "", text: "เลือกสถานะ" },
        { value: "User", text: "ผู้ใช้งาน" },
        { value: "Admin", text: "ผู้ดูเเลระบบ" },
      ],
      loginn: "",
      // admin:null,
      Qrcode: "https://line.me/R/oaMessage/@503kjvna/?signup_",

      imageData: null,
      picture: null,
      uploadValue: 0,
      TIME_BANK: "",
      MEMBERSHIP_FIRFENAME: "",
      MEMBERSHIP_LASTNAME: "",
      // MEMBERSHIP_CID: "",
      MEMBERSHIP_EDUCATION: "",
      MEMBERSHIP_BIRTH: "",
      MEMBERSHIP_ADDRESS: "",
      ZIPCODE: "",
      SUBDISTRIC: "",
      DISTRICT: "",
      PROVINCE: "",
      MEMBERSHIP_TELEPHONE: "",
      MEMBERSHIP_TYPE: "",
      ADMIN_USER: "",
      ADMIN_PASSWORD: "",
      MEMBERSHIP_REQUIREMENTS: "",
      MEMBERSHIP_EXPECTATION: "",
      MEMBERSHIP_IMGE: "",

      CONTACTPERSONS_FIRFENAME: "",
      CONTACTPERSONS_LASTNAME: "",
      CONTACTPERSONS_TELEPHONE: "",
      CONTACTPERSONS_RELATIONSHIP: "",
      USERID: "",
      TRANSACTIONS_POINT: "",
      size: 300,
      bank: null,
      timeback: null,
    };
  },

  mounted() {
    axios.post(`${api_url.api_url}/selectbank`).then((response) => {
      console.log(response);
      this.timeback = response.data;
    });
  },
  created() {
    this.show();
  },

  // beforeMount() {
  //   this.GetProfileLine();
  // },
  // created() {
  //   this.showadmin();
  // },

  methods: {
    show() {
      // console.log(this.$store.getters["Detail/ADMIN"]);
      // this.loginn = this.$store.getters["Detail/ADMIN"];
      // console.log(this.loginn);
      // return this.$store.getters["Detail/ADMIN"];
      this.loginn = localStorage.getItem("USER");
      // console.log(this.loginn);
    },
    onChange(date, dateString) {
      // console.log(date, dateString);
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    delact() {
      (this.loadadd = false), this.$bvModal.hide("noinsertActivity");
    },
    Addmember1() {
      this.loadadd = true;
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
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture = url;
              if (
                this.TIME_BANK != "" &&
                this.TRANSACTIONS_POINT != "" &&
                this.MEMBERSHIP_FIRFENAME != "" &&
                this.MEMBERSHIP_LASTNAME != "" &&
                this.MEMBERSHIP_EDUCATION != "" &&
                this.MEMBERSHIP_BIRTH != "" &&
                this.MEMBERSHIP_ADDRESS != "" &&
                this.ZIPCODE != "" &&
                this.MEMBERSHIP_TELEPHONE != "" &&
                this.MEMBERSHIP_TYPE != "" &&
                this.MEMBERSHIP_REQUIREMENTS != "" &&
                this.MEMBERSHIP_EXPECTATION != "" &&
                this.MEMBERSHIP_IMGE != "" &&
                this.CONTACTPERSONS_FIRFENAME != "" &&
                this.CONTACTPERSONS_LASTNAME != "" &&
                this.CONTACTPERSONS_TELEPHONE != "" &&
                this.CONTACTPERSONS_RELATIONSHIP != ""
              ) {
                var data = {
                  TIME_BANK: this.TIME_BANK,
                  TRANSACTIONS_POINT: this.TRANSACTIONS_POINT,
                  MEMBERSHIP_FIRFENAME: this.MEMBERSHIP_FIRFENAME,
                  MEMBERSHIP_LASTNAME: this.MEMBERSHIP_LASTNAME,
                  // MEMBERSHIP_CID: this.MEMBERSHIP_CID,
                  MEMBERSHIP_BIRTH: moment(this.MEMBERSHIP_BIRTH).format(
                    "YYYY-MM-DD"
                  ),
                  MEMBERSHIP_EDUCATION: this.MEMBERSHIP_EDUCATION,
                  MEMBERSHIP_EXPERIENCE: this.MEMBERSHIP_EXPERIENCE,
                  MEMBERSHIP_TYPE: this.MEMBERSHIP_TYPE,
                  PROVINCE: this.PROVINCE,
                  DISTRICT: this.DISTRICT,
                  SUBDISTRIC: this.SUBDISTRIC,
                  ZIPCODE: this.ZIPCODE,
                  MEMBERSHIP_ADDRESS: this.MEMBERSHIP_ADDRESS,
                  MEMBERSHIP_TELEPHONE: this.MEMBERSHIP_TELEPHONE,
                  CONTACTPERSONS_FIRFENAME: this.CONTACTPERSONS_FIRFENAME,
                  CONTACTPERSONS_LASTNAME: this.CONTACTPERSONS_LASTNAME,
                  CONTACTPERSONS_TELEPHONE: this.CONTACTPERSONS_TELEPHONE,
                  CONTACTPERSONS_RELATIONSHIP: this.CONTACTPERSONS_RELATIONSHIP,
                  MEMBERSHIP_REQUIREMENTS: this.MEMBERSHIP_REQUIREMENTS,
                  MEMBERSHIP_EXPECTATION: this.MEMBERSHIP_EXPECTATION,
                  MEMBERSHIP_IMGE: url,
                  ADMIN_USER: this.ADMIN_USER,
                  ADMIN_PASSWORD: this.ADMIN_PASSWORD,
                  // ADMIN_ID: this.admin[0].ADMIN_ID,
                };
                console.log(data);
                axios
                  .post(`${api_url.api_url}/insertMembership`, data)
                  .then((response) => {
                    // console.log(response.data);
                    // this.datas = response.data;
                    //  console.log(response.data[0].me);
                    this.$store.commit(
                      "Detail/SET_MEMBERSHIP_ID",
                      response.data[0].me
                    );
                    // console.log(this.$store.getters["Detail/MEMBERSHIP_ID"]);
                    this.$router.push({ path: "/addmember2" });
                  });
              } else {
                this.$bvModal.show("noinsertActivity");
              }
            });
          }
        );
      } 
    },
  },
};
</script>
<style>
div.dateaddmember input.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 210px;
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
div .address input.th-address-input {
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
</style>