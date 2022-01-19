<template>
  <div v-if="!loginn == 0 || !loginn == null">
    <Nav />
    <div style="margin: 20px">
      <div>
        <b-row>
          <b-col cols="1">
            <div align="right">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/1256/1256661.svg"
                style="width: 80px"
                alt=""
              />
            </div>
          </b-col>
          <b-col cols="11">
            <div align="left" style="margin-top: 45px">
              <font size="6px">ข้อมูลประชาชน</font>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-container fluid>
        <!-- User Interface controls -->
        <!-- <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="ค้นหาข้อมูล"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="ค้นหา"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >ค้นหา</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
</b-row> -->
        <!-- <b-col class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col> -->

        <br />
        <!-- Main table element -->
        <div v-if="totalRows != ''">
          <b-table
            class="table table-striped"
            show-empty
            small
            stacked="md"
            :items="items"
            :fields="fields"
            :filter="filter"
            :filter-included-fields="filterOn"
            @filtered="onFiltered"
          >
            <template v-slot:cell(active)="row">
              <div v-if="row.item.ACTIVEMEMBER == 0">ระงับ</div>
              <div v-if="row.item.ACTIVEMEMBER == 1">ปกติ</div>
            </template>
            <template v-slot:cell(actions)="row">
              <b-button
                size="sm"
                class="mr-1"
                @click="row.toggleDetails"
                variant="success"
                >โปรไฟล์</b-button
              >
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
                variant="info "
                >สมุดบัญชี</b-button
              >
              <b-button
                size="sm"
                @click="into(row.item, row.index, $event.target)"
                class="mr-1"
                variant="warning"
                >เเก้ไขข้อมูล</b-button
              >
            </template>
            <template v-slot:row-details="row">
              <b-card align="left"
                ><div>
                  <b-row>
                    <b-col>
                      <pre>
                      <h6>
                        รหัสสมาชิก : {{row.item.MEMBERSHIP_ID}} <br />
                        ชื่อ : {{row.item.name}} <br />
                        วันเกิด :{{thdate(row.item.MEMBERSHIP_BIRTH)}}
                        <!-- รหัสบัตรประชาชน : {{row.item.MEMBERSHIP_CID}}<br /> -->
                        ที่อยู่ : ต.{{row.item.SUBDISTRIC}} อ.{{row.item.DISTRICT}} จ.{{row.item.PROVINCE}} รหัสไปรษณีย์ {{row.item.ZIPCODE}} <br />
                        เบอร์โทรศัพท์ : {{row.item.MEMBERSHIP_TELEPHONE}}<br />
                        ผู้รับผลประโยชน์ <br />
                        ชื่อ : {{row.item.namema}} <br />
                        ความสัมพันธ์ : {{row.item.CONTACTPERSONS_RELATIONSHIP}} <br />
                        เบอร์โทรศัพท์ : {{row.item.CONTACTPERSONS_TELEPHONE}}<br />
                        แต้ม : {{row.item.MEMBERSHIP_POINT}} <br>
                        สาขาธนาคารเวลา : {{row.item.timebank}}
                      </h6>
                    </pre>
                    </b-col>
                    <b-col style="margin-top: 100px">
                      <img
                        :src="row.item.MEMBERSHIP_IMGE"
                        alt
                        width="300px"
                        height="300px"
                      />
                    </b-col>
                  </b-row>
                </div>
              </b-card>
            </template>
          </b-table>
        </div>
        <div v-else style="margin-top: 200px">
          <div class="text-center">
            <b-spinner variant="warning" label="Text Centered"></b-spinner>
          </div>
        </div>
        <!-- สมุดบัญชี -->
        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          hide-footer
          size="xl"
        >
          <div style="margin: 10px">
            <b-pagination
              v-model="currentPage1"
              :total-rows="totalRows1"
              :per-page="perPage1"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </div>
          <div style="margin: 10px">
            <b-table
              class="table table-striped"
              show-empty
              small
              stacked="md"
              :items="itembook"
              :fields="fieldsbook"
              :per-page="perPage1"
              :current-page="currentPage1"
            >
              <template v-slot:cell(point)="row">
                <!-- {{row.item.TRANSACTIONS_POINT}} -->
                <div v-if="row.item.TRANSACTIONS_POINT < 0">
                  {{ row.item.TRANSACTIONS_POINT }}
                </div>
                <div v-if="row.item.TRANSACTIONS_POINT > 0">
                  {{ "+" + row.item.TRANSACTIONS_POINT }}
                </div>
              </template>
            </b-table>
          </div>
        </b-modal>
        <!-- แก้ไขข้อมูล -->
        <b-modal
          :id="intoModal.id"
          ref="modal-1"
          :title="intoModal.title"
          size="xl"
          hide-footer
        >
          <b-container fluid>
            <b-row>
              <b-col cols="12" align="center">
                <div align="center" style="margin-right: 100px" v-if="loadadd">
                  <b-spinner
                    variant="success"
                    style="width: 3rem; height: 3rem"
                    label="Spinning"
                  ></b-spinner>
                </div>
                <div v-else>
                  <img
                    :src="items[editpro].MEMBERSHIP_IMGE"
                    style=" height: 200px"
                    class="rounded-circle"
                  />
                  <b-form-file
                    @change="previewImage"
                    accept="image/*"
                    placeholder="อัพโหลดไฟล์"
                    plain
                  ></b-form-file>
                </div>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px"
                  >ชื่อ - นามสกุล</label
                >
              </b-col>
              <b-col cols="6">
                <b-input
                  type="text"
                  v-model="items[editpro].MEMBERSHIP_FIRFENAME"
                ></b-input>
              </b-col>
              <b-col cols="6">
                <b-input
                  type="text"
                  v-model="items[editpro].MEMBERSHIP_LASTNAME"
                ></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px">วันเกิด</label>
              </b-col>
              <b-col>
                <div class="daybirth">
                  <date-picker
                    v-model="membirth"
                    :format="momentFormat"
                  ></date-picker>
                </div>
              </b-col>
            </b-row>
            <!-- <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px"
                  >เลขบัตรประชาชน</label
                >
              </b-col>
              <b-col cols="12">
                <b-input
                  type="text"
                  v-model="items[editpro].MEMBERSHIP_CID"
                ></b-input>
              </b-col>
            </b-row> -->

            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px">ที่อยู่</label>
              </b-col>
              <b-col cols="12">
                <b-input
                  type="text"
                  style="margin-top: 5px"
                  v-model="items[editpro].MEMBERSHIP_TELEPHONE"
                ></b-input>
              </b-col>
              <b-col cols="6">
                <addressinput-zipcode
                  style="margin-top: 5px"
                  v-model="items[editpro].ZIPCODE"
                  placeholder="รหัสไปรษณีย์"
                />
              </b-col>
              <b-col cols="6">
                <addressinput-subdistrict
                  style="margin-top: 5px"
                  v-model="items[editpro].SUBDISTRIC"
                  placeholder="ตำบล/แขวง"
                />
              </b-col>
              <b-col cols="6">
                <addressinput-district
                  style="margin-top: 5px"
                  v-model="items[editpro].DISTRICT"
                  placeholder="อำเภอ/เขต"
                />
              </b-col>
              <b-col cols="6">
                <addressinput-province
                  style="margin-top: 5px"
                  v-model="items[editpro].PROVINCE"
                  placeholder="จังหวัด"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px"
                  >เบอร์โทรศัพท์</label
                >
              </b-col>
              <b-col cols="12">
                <b-input
                  type="text"
                  v-model="items[editpro].MEMBERSHIP_TELEPHONE"
                ></b-input>
              </b-col>
            </b-row>
            <br />
            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px"
                  >ผู้รับผลประโยชน์</label
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px">ชื่อ</label>
              </b-col>
              <b-col cols="6">
                <b-input
                  type="text"
                  v-model="items[editpro].CONTACTPERSONS_FIRFENAME"
                ></b-input>
              </b-col>
              <b-col cols="6">
                <b-input
                  type="text"
                  v-model="items[editpro].CONTACTPERSONS_LASTNAME"
                ></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px"
                  >ความสัมพันธ์</label
                >
              </b-col>
              <b-col cols="12">
                <b-input
                  type="text"
                  v-model="items[editpro].CONTACTPERSONS_RELATIONSHIP"
                ></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <label falign="left" style="margin-top: 5px"
                  >เบอร์โทรศัพท์</label
                >
              </b-col>
              <b-col cols="12">
                <b-input
                  type="text"
                  v-model="items[editpro].CONTACTPERSONS_TELEPHONE"
                ></b-input>
              </b-col>
              <b-col cols="12">
                <label falign="left">สถานะระงับ</label>
                <b-form-select
                  v-model="items[editpro].ACTIVEMEMBER"
                  :options="active"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-container>
          <b-button
            class="mt-3"
            variant="warning"
            block
            @click="updatemembership"
            >แก้ไขข้อมูล</b-button
          >
        </b-modal>
      </b-container>
    </div>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
import firebase from "firebase";
import moment from "moment";
// import DatePicker from "vue2-datepicker";
import DatePicker from "../../../utilities/vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/th";
import { format } from "path";
import Nav from "../../components/Nav";
export default {
  components: { DatePicker, Nav },

  data() {
    return {
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
      loadadd: false,
      imageData: null,
      picture: null,
      uploadValue: 0,
      member: "",
      loginn: "",
      editpro: 0,
      itemss: "",
      items: [
        {
          MEMBERSHIP_ID: "",
          ACTIVITY_DAY: "",
          MEMBERSHIP_POINT: "",
          name: "",
        },
      ],
      MEMBERSHIP_FIRFENAME: "",
      MEMBERSHIP_LASTNAME: "",
      MEMBERSHIP_BIRTH: "",
      // MEMBERSHIP_CID: "",
      MEMBERSHIP_EDUCATION: "",
      MEMBERSHIP_EXPERIENCE: "",
      // MEMBERSHIP_DISEASE: "",
      MEMBERSHIP_ADDRESS: "",
      PROVINCE: "",
      DISTRICT: "",
      SUBDISTRIC: "",
      ZIPCODE: "",
      MEMBERSHIP_TELEPHONE: "",
      CONTACTPERSONS_FIRFENAME: "",
      CONTACTPERSONS_LASTNAME: "",
      CONTACTPERSONS_TELEPHONE: "",
      CONTACTPERSONS_RELATIONSHIP: "",
      // MEMBERSHIP_DAY_TIME: "",
      MEMBERSHIP_REQUIREMENTS: "",
      MEMBERSHIP_EXPECTATION: "",
      MEMBERSHIP_IMGE: "",
      ACTIVEMEMBER: "",
      active: [
        { value: "1", text: "ปกติ" },
        { value: "0", text: "ระงับ" },
      ],
      fields: [
        {
          key: "MEMBERSHIP_ID",
          label: "รหัสสมาชิก",
        },
        {
          key: "name",
          label: "ชื่อ",
        },
        // {
        //   key: "ThaiDate",
        //   label: "วันสร้างกิจกรรม (ล่าสุด)",
        // },
        {
          key: "MEMBERSHIP_POINT",
          label: "แต้ม",
        },
        { key: "active", label: "สถานะ" },
        { key: "actions", label: "การจัดการ" },
      ],
      filter: null,
      filterOn: [],
      itembook: null,
      fieldsbook: [
        {
          key: "ThaiDate",
          label: "วันที่ล่าสุด",
        },
        {
          key: "ACTIVITY_NAME",
          label: "รายการ",
        },
        { key: "point", label: "สถานะ" },
      ],
      totalRows1: 1,
      currentPage1: 1,
      perPage1: 10,
      infoModal: {
        id: "info-modal",
        title: "",
      },
      // totalRows: 1,
      // currentPage: 1,
      // perPage: 11,

      intoModal: {
        id: "into-modal",
        title: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    membirth: {
      get() {
        return this.format_datetime1(
          this.$store.getters["Detail/MEMBERSHIP_BIRTH"]
        );
      },
      set(value) {
        this.$store.commit("Detail/SET_MEMBERSHIP_BIRTH", value);
      },
    },
  },
  async mounted() {
    await axios
      .post(`${api_url.api_url}/semember`, {
        MEMBERSHIP_ID: localStorage.getItem("MEMBERSHIP_ID"),
      })
      .then((response) => {
        this.member = response.data;
        // console.log(this.member);
      });
    // console.log(this.member[0].TIME_BANK);
    await axios
      .post(`${api_url.api_url}/MEMBERSHIP`, {
        TIME_BANK: this.member[0].TIME_BANK,
      })
      .then((response) => {
        //  console.log(response.data);
        this.items = response.data;
        this.totalRows = this.items.length;
        // console.log(response.data[0].MEMBERSHIP_BIRTH);

        // this.$store.commit(
        //   "Detail/SET_MEMBERSHIP_BIRTH",
        //   response.data[0].MEMBERSHIP_BIRTH
        // );
      });
    //   await axios.post(`${api_url.api_url}/MEMBERSHIPdata`,
    //  {
    //    TIME_BANK:this.member[0].TIME_BANK
    //  }).then((response) => {
    //     //  console.log(response.data);
    //     this.itemmem = response.data;
    //     this.totalRows = this.itemmem.length;
    //     // console.log(response.data[0].MEMBERSHIP_BIRTH);

    //     // this.$store.commit(
    //     //   "Detail/SET_MEMBERSHIP_BIRTH",
    //     //   response.data[0].MEMBERSHIP_BIRTH
    //     // );

    //   });
  },
  created() {
    this.show();
  },
  methods: {
    format_datetime1(data) {
      // console.log(data);
      var dm = moment(data).format("MM-DD-YYYY");
      return new Date(dm);
    },
    show() {
      this.loginn = localStorage.getItem("USER");
      // console.log(this.loginn);
      // console.log(localStorage.getItem("MEMBERSHIP_ID"));
    },
    thdate(x) {
      console.log(x);
      var newformat = moment(x).add("year", 543).locale("th").format("LL");
      return newformat;
    },
    info(item, button) {
      // console.log(item.MEMBERSHIP_ID);
      //  var data = {
      // };
      // console.log(data);
      axios
        .post(`${api_url.api_url}/bookbankmember`, {
          MEMBERSHIP_ID: item.MEMBERSHIP_ID,
        })
        .then((response) => {
          this.itembook = response.data;
          // console.log(this.itembook);
        });
      this.infoModal.title =
        `สมุดบัญชี ` +
        item.MEMBERSHIP_FIRFENAME +
        " " +
        item.MEMBERSHIP_LASTNAME;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    into(item, index, button) {
      console.log(index);
      this.editpro = index;
      this.intoModal.title = `รหัสสมาชิก : ` + item.MEMBERSHIP_ID;
      console.log(item.MEMBERSHIP_BIRTH);
      this.$store.commit("Detail/SET_MEMBERSHIP_BIRTH", item.MEMBERSHIP_BIRTH);
      this.intoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.intoModal.id, button);
    },
    previewImage(event) {
      this.loadadd = true;
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
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
            this.loadadd = false;
            this.items[this.editpro].MEMBERSHIP_IMGE = url;
            // console.log(url);
            // console.log(this.items[this.editpro].MEMBERSHIP_IMGE);
          });
        }
      );
    },
    updatemembership() {
      // console.log(this.items[this.editpro].MEMBERSHIP_IMGE);
      let e = this.editpro;
      console.log([this.editpro]);
      var data = {
        MEMBERSHIP_FIRFENAME: this.items[this.editpro].MEMBERSHIP_FIRFENAME,
        MEMBERSHIP_LASTNAME: this.items[this.editpro].MEMBERSHIP_LASTNAME,
        MEMBERSHIP_BIRTH: moment(this.membirth).format("YYYY-MM-DD"),
        MEMBERSHIP_EDUCATION: this.items[this.editpro].MEMBERSHIP_EDUCATION,
        MEMBERSHIP_EXPERIENCE: this.items[this.editpro].MEMBERSHIP_EXPERIENCE,
        // MEMBERSHIP_DISEASE: this.items[this.editpro].MEMBERSHIP_DISEASE,
        MEMBERSHIP_TELEPHONE: this.items[this.editpro].MEMBERSHIP_TELEPHONE,
        MEMBERSHIP_ADDRESS: this.items[this.editpro].MEMBERSHIP_ADDRESS,
        ZIPCODE: this.items[this.editpro].ZIPCODE,
        PROVINCE: this.items[this.editpro].PROVINCE,
        DISTRICT: this.items[this.editpro].DISTRICT,
        SUBDISTRIC: this.items[this.editpro].SUBDISTRIC,
        CONTACTPERSONS_FIRFENAME: this.items[this.editpro]
          .CONTACTPERSONS_FIRFENAME,
        CONTACTPERSONS_LASTNAME: this.items[this.editpro]
          .CONTACTPERSONS_LASTNAME,
        CONTACTPERSONS_TELEPHONE: this.items[this.editpro]
          .CONTACTPERSONS_TELEPHONE,
        CONTACTPERSONS_RELATIONSHIP: this.items[this.editpro]
          .CONTACTPERSONS_RELATIONSHIP,
        MEMBERSHIP_REQUIREMENTS: this.items[this.editpro]
          .MEMBERSHIP_REQUIREMENTS,
        // MEMBERSHIP_DAY_TIME: this.items[this.editpro].MEMBERSHIP_DAY_TIME,
        MEMBERSHIP_EXPECTATION: this.items[this.editpro].MEMBERSHIP_EXPECTATION,
        MEMBERSHIP_IMGE: this.items[this.editpro].MEMBERSHIP_IMGE,
        MEMBERSHIP_ID: this.items[this.editpro].MEMBERSHIP_ID,
        ACTIVEMEMBER: this.items[this.editpro].ACTIVEMEMBER,
      };
      console.log(data);
      axios.post(`${api_url.api_url}/updatemember`, data).then((response) => {
        console.log(response);
        this.$refs["modal-1"].hide();
        // axios.post(`${api_url.api_url}/MEMBERSHIP`).then((response2) => {
        //   // this.itemss = response2.data;
        //   console.log(response2);
        // });
        location.reload();
      });
    },
  },
};
</script>
<style>
.md-datepicker-dialog {
  z-index: 9999 !important;
}
div.daybirth .mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 203px;
  height: 34px;
  padding: 6px 32px;
  padding-left: 37px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.mx-icon-calendar,
.mx-icon-clear {
  /* width: 30px; */
  position: absolute;
  top: 50%;
  left: 170px;
  /* -webkit-transform: translateY(-50%); */
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.5);
  /* vertical-align: middle; */
}
div .mx-datepicker svg {
  width: 1em !important;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/* div.daybirth .mx-datepicker svg {
  width: 23em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
} */
</style>