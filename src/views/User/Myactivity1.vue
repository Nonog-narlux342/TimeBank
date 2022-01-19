<template>
  <div>
    <div class="color2">
      <ul class="nav nav-tabs">
        <h5 style="margin: 20px"><font color="#FFFFFF">กิจกรรมของฉัน</font></h5>
      </ul>
    </div>
    <b-card style="margin: 20px" align="left" class="card1">
      <!-- <b-card class="card3">
        <b-row>
          <b-col cols="3">
            <b-img
              :src="this.$store.getters['Detail/MEMBERSHIP_IMGE']"
              style="width: 80%; hight: 80%"
              rounded="circle"
            ></b-img>
          </b-col>
          <b-col>
            <div style="margin-top: 10px">
              <h6>
                <b
                  >{{ this.$store.getters["Detail/MEMBERSHIP_FIRFENAME"] }}
                  {{ this.$store.getters["Detail/MEMBERSHIP_LASTNAME"] }}</b
                >
              </h6>
            </div>
          </b-col>
        </b-row>
      </b-card> -->
      <b-row>
        <b-col cols="8"></b-col>
        <b-col cols="4">
          <div>
            <b-icon
              variant="warning"
              @click="updateact()"
              style="width: 30px; height: 30px; margin-right: 10px"
              icon="pencil-square"
            ></b-icon>
            <b-icon
              variant="danger"
              @click="deleteact(activity[0].ACTIVITY_ID)"
              style="width: 30px; height: 30px"
              icon="trash-fill"
            ></b-icon>
          </div>
        </b-col>
      </b-row>

      <b-modal id="updateact" title="เเก้ไขข้อมูล" hide-footer>
        <b-row>
          <b-col cols="12">
            <h6 style="margin-top: 5px">ชื่อกิจกรรม</h6>
          </b-col>
          <b-col cols="12">
            <b-input type="text" v-model="Actname" disabled></b-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <h6 style="margin-top: 5px">วันที่</h6>
          </b-col>
          <b-col>
            <div>
              <date-picker
                v-model="actdate"
                :format="momentFormat"
              ></date-picker>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <h6 style="margin-top: 5px">จำนวน (ผู้เข้าร่วม)</h6>
          </b-col>
          <b-col cols="6"><h6 style="margin-top: 5px">เพศ</h6> </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-input type="text" v-model="Count"></b-input>
          </b-col>
          <b-col cols="6">
            <b-form-select v-model="Sex" :options="optionsex"></b-form-select
          ></b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <h6 style="margin-top: 5px">ช่วงเวลา</h6>
          </b-col>
          <b-col cols="6"><h6 style="margin-top: 5px">เวลา</h6> </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-select v-model="Time" :options="option"></b-form-select>
          </b-col>
          <b-col cols="6">
            <b-input type="text" v-model="APPtime"></b-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <h6 style="margin-top: 5px">รายละเอียด</h6>
          </b-col>
          <b-col cols="12">
            <b-input type="text" v-model="Deta"></b-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <h6 style="margin-top: 5px">เบอร์โทรศัพท์</h6>
          </b-col>
          <b-col cols="12">
            <b-input type="text" v-model="Phone"></b-input>
          </b-col>
        </b-row>
        <b-button variant="warning" class="mt-3" block @click="updateactivity()"
          >เเก้ไขข้อมูล</b-button
        >
      </b-modal>
      <b-modal id="deleteact" centered hide-footer>
        <div class="d-block text-center">
          <h5>คุณต้องการลบใช่หรือไม่</h5>
        </div>
        <b-row>
          <b-col cols="6">
            <div style="margin-left: 10px; margin-right: 10px">
              <b-button
                variant="success"
                block
                @click="deleteactivity(setIDACT)"
                >ใช่</b-button
              >
            </div>
          </b-col>
          <b-col cols="6">
            <div style="margin-left: 10px; margin-right: 10px">
              <b-button
                variant="danger"
                block
                @click="$bvModal.hide('deleteact')"
                >ไม่ใช่</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-modal>
      <div style="margin-top: 15px">
        <h5>
          <b-icon
            variant="danger"
            style="width: 20px; height: 20px; margin-right: 5px"
            icon="tools"
          ></b-icon>
          {{ this.$store.getters["Detail/ACTIVITY_NAME"] }}
        </h5>
        <p>
          จำนวน : {{ this.$store.getters["Detail/ACTIVITY_COUNT"] }} คน<br />
          เพศ :{{ this.$store.getters["Detail/ACTIVITY_SEX"] }} <br />
          วันที่ :
          {{ this.format_datetime(this.$store.getters["Detail/ACTIVITY_DAY"]) }}
          <br />
          ช่วงเวลา : {{ this.$store.getters["Detail/ACTIVITY_TIME"] }} <br />
          เวลานัด : {{ this.$store.getters["Detail/APPPOINTMENT_TIME"] }} น.
          <br />
          รายละเอียด : {{ this.$store.getters["Detail/ACTIVITY_DETAILS"] }}
        </p>

        <div>
          <b-form-file
            id="file-small"
            @change="previewImage"
            accept="image/*"
            placeholder="อัพโหลดไฟล์"
            multiple
            size="sm"
          >
            <template slot="file-name" slot-scope="{ names }">
              <b-badge variant="dark">{{ names[0] }}</b-badge>
              <b-badge v-if="names.length > 1" variant="dark" class="ml-1"
                >+ {{ names.length - 1 }} รูป</b-badge
              >
            </template>
          </b-form-file>
        </div>
        <div style="margin-top: 10px"></div>
        <b-button v-b-toggle.collapse-1 block variant="outline-primary"
          >จิตอาสา</b-button
        >
        <b-collapse id="collapse-1" class="mt-2">
          <div style="margin-top: 10px">
            <h6>จิตอาสา</h6>
            <div>
              <b-form-tags
                v-model="VolunteerMEMBER"
                no-outer-focus
                class="mb-2"
              >
                <template
                  v-slot="{
                    tags,
                    inputAttrs,
                    inputHandlers,
                    addTag,
                    removeTag,
                  }"
                >
                  <b-input-group aria-controls="my-custom-tags-list">
                    <input
                      v-bind="inputAttrs"
                      v-on="inputHandlers"
                      placeholder="รหัสผู้ใช้งาน"
                      class="form-control"
                    />
                    <b-input-group-append>
                      <b-button @click="addTag()" variant="primary"
                        >Add</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                  <ul
                    id="my-custom-tags-list"
                    class="list-unstyled d-inline-flex flex-wrap mb-0"
                    aria-live="polite"
                    aria-atomic="false"
                    aria-relevant="additions removals"
                  >
                    <b-card
                      v-for="tag in tags"
                      :key="tag"
                      :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
                      tag="li"
                      class="mt-1 mr-1"
                      body-class="py-1 pr-2 text-nowrap"
                    >
                      <strong>{{ tag + " " }}</strong>
                      <b-icon
                        icon="trash-fill"
                        variant="danger"
                        @click="removeTag(tag)"
                        :aria-controls="`my-custom-tags-tag_${tag.replace(
                          /\s/g,
                          '_'
                        )}_`"
                      ></b-icon>
                    </b-card>
                  </ul>
                </template>
              </b-form-tags>
            </div>
          </div>
        </b-collapse>
        <div style="margin-top: 10px"></div>
        <b-button v-b-toggle.collapse-2 block variant="outline-success"
          >คนที่เข้าร่วม</b-button
        >
        <b-collapse id="collapse-2" class="mt-2">
          <div v-if="load1">
            <div v-for="member in userdata" :key="member.ACTIVITY_ID">
              <b-card style="margin: 5px">
                <div>
                  {{ member.NAMEMEMBER }}
                  {{ member.MEMBERSHIP_ID }}

                  <b-button
                    pill
                    variant="danger"
                    @click="del(member.ACTIVITY_ID, member.MEMBERSHIP_ID)"
                  >
                    ไม่มา
                  </b-button>
                </div>
              </b-card>
            </div>
          </div>
          <div v-else>
            <div class="text-center">
              <b-spinner variant="warning" label="Text Centered"></b-spinner>
            </div>
          </div>
        </b-collapse>
        <!-- Myactivity1(userdata[0].ACTIVITY_ID) -->
        <div style="margin-top: 10px" align="right">
          <b-button
            style="width: 150px"
            pill
            variant="success"
            @click="showModal(userdata[0].ACTIVITY_ID)"
            >ยืนยัน</b-button
          >
        </div>
        <b-modal id="bv-modal-example" centered hide-footer>
          <div class="d-block text-center">
            <h5>ยืนยันผู้เข้าร่วมกิจกรรม</h5>
          </div>
          <div align="right" style="margin-right: 100px" v-if="loadadd">
            <b-spinner
              variant="success"
              style="width: 3rem; height: 3rem"
              label="Spinning"
            ></b-spinner>
          </div>
          <div v-else>
            <b-row>
              <b-col cols="6">
                <div style="margin-left: 10px; margin-right: 10px">
                  <b-button
                    variant="success"
                    block
                    @click="AddMyactivity1(setID)"
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
          </div>
        </b-modal>
      </div>
    </b-card>
    <br /><br />
    <div class="footer2">
      <div style="margin-top: 10px; margin-left: 30px" align="left">
        <b-icon
          icon="arrow-left-circle-fill"
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
import moment from "moment";
import DatePicker from "../../../utilities/vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/th";
export default {
  components: { VueBootstrapTypeahead, DatePicker },

  data() {
    return {
      loadadd: false,
      momentFormat: {
        // Date to String
        stringify: (date) => {
          return date
            ? moment(date).add(543, "year").locale("th").format("LL")
            : "";
        },
        // String to Date
        parse: (value) => {
          return value ? moment(value, "LL").toDate() : null;
        },
      },
      optionsex: [
        { value: "ชาย", text: "ชาย" },
        { value: "หญิง", text: "หญิง" },
        { value: "ไม่จำกัด", text: "ไม่จำกัด" },
      ],
      option: [
        { value: "ช่วงเช้า", text: "ช่วงเช้า" },
        { value: "ช่วงเย็น", text: "ช่วงเย็น" },
        { value: "ทั้งวัน", text: "ทั้งวัน" },
      ],

      setID: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      ACTIVITYS: null,
      IMG_NAME: "",
      userdata: null,
      ACTIVE: "",
      MEMBERSHIP_ID: "",
      activityid: null,
      load: true,
      load1: true,
      mbsearch: null,
      VolunteerMEMBER: [],
      //---------
      activity: null,
      setIDACT: "",
      //---------
      setIDID: "",
      setNAME: "",
      // setDate: "",
      setTime: "",
      setACTTIME: "",
      IMG: [],
    };
  },
  created() {
    this.showDetail();
    this.showmember();
    this.load = false;
  },
  mounted() {
    axios.post(`${api_url.api_url}/MEMBERSHIPsearch`).then((response) => {
      this.mbsearch = response.data;
      // console.log(this.mbsearch);
    });
  },
  computed: {
    actdate: {
      get() {
        console.log(new Date(this.$store.getters["Detail/ACTIVITY_DAY"]));
        return new Date(this.$store.getters["Detail/ACTIVITY_DAY"]);
      },
      set(value) {
        console.log("%c" + value, "color:green;font-weight:600");
        this.$store.commit("Detail/SET_ACTIVITY_DAY", value);
      },
    },
  },

  methods: {
    updateactivity() {
      console.log(moment(this.actdate).format("YYYY-MM-DD"));
      // alert(moment(date).format("YYYY-MM-DD"));
      var data = {
        ACTIVITY_ID: this.Actid,
        ACTIVITY_NAME: this.Actname,
        ACTIVITY_DAY: moment(this.actdate).format("YYYY-MM-DD"),
        ACTIVITY_TIME: this.Time,
        APPPOINTMENT_TIME: this.APPtime,

        ACTIVITY_COUNT:this.Count,
        ACTIVITY_SEX:this.Sex,
        ACTIVITY_DETAILS:this.Deta,
        ACTIVITY_TELEPHONE:this.Phone

      };
      console.log(data);
      axios.post(`${api_url.api_url}/updateactivity`, data).then((response) => {
        console.log(response.data);
        this.showmember(response);
        this.$bvModal.hide("updateact");
        this.$router.push({ path: "/Myactivity" });
      });
    },
    deleteactivity(id) {
      console.log(id);
      var data = {
        ACTIVITY_ID: id,
      };
      axios.post(`${api_url.api_url}/delateactivity`, data).then((response) => {
        console.log(response);
        this.$router.push({ path: "/Myactivity" });
      });
    },
    // format_datetime1(data) {
    //   console.log(data);
    //   var dm = moment(data).format("MM-DD-YYYY");
    //   return new Date(dm);
    // },
    format_datetime(data) {
      var dm = moment(data).add(543, "year").locale("th").format("DD-MM-YYYY");
      console.log(dm);
      return dm;
    },
    deleteact(actid) {
      this.setIDACT = actid;
      console.log(actid);
      this.$bvModal.show("deleteact");
    },
    updateact() {
      // this.setIDID = act[0].ACTIVITY_ID;
      // this.setNAME = act[0].ACTIVITY_NAME;
      // this.setTime = act[0].APPPOINTMENT_TIME;
      // this.setACTTIME = act[0].ACTIVITY_TIME;
      // console.log(act);
      this.$bvModal.show("updateact");
    },
    showModal(id) {
      this.$bvModal.show("bv-modal-example");
      console.log(id);
      this.setID = id;
    },
    hideModal() {
      this.$bvModal.hide("bv-modal-example");
    },
    back() {
      this.$router.push({ path: "/myactivity" });
    },
    del(ACTIVITY_I, MEMBER_I) {
      //  console.log(ACTIVITY_I, MEMBER_I);
      var data = {
        ACTIVE: 3,
        MEMBERSHIP_ID: MEMBER_I,
        ACTIVITY_ID: ACTIVITY_I,
      };
      console.log(data);
      axios.post(`${api_url.api_url}/updel`, data).then((response) => {
        console.log(response);
        this.reset(response);
      });
    },
    reset() {
      const _this = this;
      _this.load1 = false;
      axios
        .post(`${api_url.api_url}/showmemberactivity`, {
          ACTIVITY_ID: _this.$store.getters["Detail/ACTIVITY_ID"],
        })
        .then((response) => {
          _this.load1 = true;
          _this.userdata = response.data;
          console.log(_this.userdata);
        });
    },
    showmember() {
      const _this = this;
      axios
        .post(`${api_url.api_url}/showmemberactivity`, {
          ACTIVITY_ID: _this.$store.getters["Detail/ACTIVITY_ID"],
        })
        .then((response) => {
          _this.userdata = response.data;
          console.log(_this.userdata);
        });
      axios
        .post(`${api_url.api_url}/showactivityy`, {
          ACTIVITY_ID: _this.$store.getters["Detail/ACTIVITY_ID"],
        })
        .then((response) => {
          _this.activity = response.data;
          console.log(_this.activity[0].ACTIVITY_DAY);
          // this.$store.commit(
          //   "Detail/SET_ACTIVITY_DAY",
          //   _this.activity[0].ACTIVITY_DAY
          // );
        });
    },
    showDetail() {
      this.Actid = this.$store.getters["Detail/ACTIVITY_ID"];
      this.Actname = this.$store.getters["Detail/ACTIVITY_NAME"];
      this.Dates = this.$store.getters["Detail/ACTIVITY_DAY"];
      this.Time = this.$store.getters["Detail/ACTIVITY_TIME"];
      this.APPtime = this.$store.getters["Detail/APPPOINTMENT_TIME"];

      this.Address = this.$store.getters["Detail/ACTIVITY_ADDRESS"];
      this.Count = this.$store.getters["Detail/ACTIVITY_COUNT"];
      this.Sex = this.$store.getters["Detail/ACTIVITY_SEX"];
      this.Deta = this.$store.getters["Detail/ACTIVITY_DETAILS"];
      this.Phone = this.$store.getters["Detail/ACTIVITY_TELEPHONE"];
      return;
      this.$store.getters["Detail/ACTIVITY_ID"];
      this.$store.getters["Detail/ACTIVITY_NAME"];
      this.$store.getters["Detail/ACTIVITY_ADDRESS"];
      this.$store.getters["Detail/ACTIVITY_SUBDISTRIC"];
      this.$store.getters["Detail/ACTIVITY_DISTRICT"];
      this.$store.getters["Detail/ACTIVITY_PROVINCE"];
      this.$store.getters["Detail/ACTIVITY_ZIPCODE"];
      this.$store.getters["Detail/ACTIVITY_TELEPHONE"];
      this.$store.getters["Detail/ACTIVITY_COUNT"];
      this.$store.getters["Detail/ACTIVITY_SEX"];
      this.$store.getters["Detail/ACTIVITY_DAY"];
      this.$store.getters["Detail/ACTIVITY_TIME"];
      this.$store.getters["Detail/ACTIVITY_DETAILS"];
      this.$store.getters["Detail/APPPOINTMENT_TIME"];
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files;
      console.log(this.imageData.length);
    },
    promiseImg() {
      this.picture = null;
      this.IMG = [];
      return new Promise((resolve, reject) => {
        console.log(this.imageData);
        for (let index = 0; index < this.imageData.length; index++) {
          const storageRef = firebase
            .storage()
            .ref(`${this.imageData[index].name}`)
            .put(this.imageData[index]);
          storageRef.on(
            `state_changed`,
            (snapshot) => {
              this.uploadValue =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
              reject(error.message);
            },
            () => {
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                // this.IMGCOMMENT.push(url);
                // this.IMGCOMMENT = url;
                this.IMG.push({ id: "", url: url });
                //console.log(this.IMG);
                resolve(this.IMG);
                //   console.log(this.imageData.length);
                // if (this.imageData.length == this.IMG.length) {
                //console.log("this test to run");
                // }
              });
            }
          );
        }
      });
    },
    async AddMyactivity1(ACTIVITY_I) {
      this.loadadd = true;
      var step1 = await this.promiseImg();
      await this.Myactivity1(ACTIVITY_I, step1);
    },
    async Myactivity1(ACTIVITY_I, step1) {
      console.log(ACTIVITY_I);
      console.log(step1);
      await axios
        .post(`${api_url.api_url}/upmember`, {
          ACTIVITY_ID: ACTIVITY_I,
        })
        .then((response) => {
          console.log(response);
        });
      for (let index = 0; index < step1.length; index++) {
        await axios
          .post(`${api_url.api_url}/upIMG`, {
            ACTIVITY_ID: this.$store.getters["Detail/ACTIVITY_ID"],
            url: step1[index].url,
            id: step1[index].id,
          })
          .then((response) => {
            console.log(response);
          });
      }

      console.log(this.VolunteerMEMBER.length);
      for (let index = 0; index < this.VolunteerMEMBER.length; index++) {
        await axios
          .post(`${api_url.api_url}/insertVolunteer`, {
            ACTIVITY_ID: ACTIVITY_I,
            MEMBERSHIP_ID: this.VolunteerMEMBER[index],
          })
          .then((response) => {
            console.log(response);
          });
      }

      this.$router.push({ path: "/Myactivity" });
    },
  },
};
</script>

<style>
.footer2 {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999999 !important;
  height: 60px;
  background-color: #f06292;
  text-align: center;
}
</style>
