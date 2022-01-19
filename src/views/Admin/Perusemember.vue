<template>
  <div v-if="!loginn == 0 || !loginn == null">
    <Nav />
    <div style="margin: 20px">
      <div>
        <b-row>
          <b-col cols="1">
            <div align="right">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/3628/3628894.svg"
                style="width: 80px"
                alt=""
              />
            </div>
          </b-col>
          <b-col cols="11">
            <div align="left" style="margin-top: 45px">
              <font size="6px">อนุมัติกิจกรรมที่เสร็จสิ้น</font>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
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
          <b-col class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
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
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            @filtered="onFiltered"
          >
            <template v-slot:cell(actions)="row">
              <b-button
                size="sm"
                class="mr-1"
                @click="row.toggleDetails"
                variant="success"
                >รายละเอียด</b-button
              >

              <b-button
                size="sm"
                @click="info(row.item, row.item.ACTIVITY_ID)"
                class="mr-1"
                variant="info "
                >รูปภาพ</b-button
              >
              <!-- okay1(row.item, row.item.ACTIVITY_ID, (submitted = true)) -->
              <b-button
                size="sm"
                @click="okay1(row.item, row.item.ACTIVITY_ID)"
                :disabled="submitted"
                class="mr-1"
                variant="warning"
                >อนุมัติกิจกรรม</b-button
              >
            </template>
            <template v-slot:row-details="row">
              <b-card align="left">
                <b-row>
                  <b-col>
                    <pre>
                    <h6>
             รหัสกิจกรรม : {{row.item.ACTIVITY_ID}} <br />
             ชื่อ : {{row.item.ACTIVITY_NAME}} <br />
             ที่อยู่ : ต.{{row.item.ACTIVITY_SUBDISTRIC}} อ.{{row.item.ACTIVITY_DISTRICT}} จ.{{row.item.ACTIVITY_PROVINCE}} รหัสไปรษณีย์ {{row.item.ACTIVITY_ZIPCODE}} <br />
             เบอร์โทรศัพท์ : {{row.item.ACTIVITY_TELEPHONE}}<br />
             ความต้องการ <br />
             เพศ : {{row.item.ACTIVITY_SEX}} <br />
             จำนวน : {{row.item.ACTIVITY_COUNT}} คน <br />
             วันที่ : {{row.item.ACTIVITY_DAY}} <br />
             ช่วงเวลา : {{row.item.ACTIVITY_TIME}} <br />
             รายละเอียด : {{row.item.ACTIVITY_DETAILS}}</h6>
             </pre>
                  </b-col>
                  <!-- <b-col>
                  <img :src="row.item.MEMBERSHIP_IMGE" alt width="400px" height="400px" />
                </b-col>-->
                </b-row>
              </b-card>
            </template>
          </b-table>
        </div>
        <div v-else style="margin-top: 200px">
          <div class="text-center">
            <b-icon
              icon="box-seam"
              variant="danger"
              style="width: 120px; height: 120px"
            ></b-icon>
          </div>
          <div align="center"><h5>ไม่มีกิจกรรมให้อนุมัติ</h5></div>
        </div>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" title="ภาพกิจกรรม" size="lg" hide-footer>
          <b-container>
            <b-row>
              <div
                v-for="items in item"
                :key="items.IMG_ID"
                style="margin: 10px; margin-left: 50px"
              >
                <b-img
                  width="300"
                  height="300"
                  :src="items.IMG_NAME"
                  alt="Circle image"
                ></b-img>
              </div>
            </b-row>
          </b-container>
        </b-modal>
        <!-- อนุมัติ -->
        <b-modal id="bv-modal-ok" hide-footer>
          <div class="d-block text-center">
            <h5>ต้องการอนุมัติใช่หรือไม่</h5>
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
                  <b-button variant="success" block @click="okay(setACTID)"
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
      </b-container>
    </div>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
import firebase from "firebase";
import Nav from "../../components/Nav";

export default {
  components: {
    Nav,
  },
  data() {
    return {
      loadadd: false,
      member: "",
      loginn: "",
      submitted:true,
      item: null,
      items: [
        {
          ACTIVITY_ID: "",
          ACTIVITY_NAME: "",
          ACTIVITY_POINT: "",
          ACTIVITY_DETAILS: "",
        },
      ],
      fields: [
        {
          key: "ACTIVITY_ID",
          label: "รหัสกิจกรรม",
        },
        {
          key: "name",
          label: "ชื่อ",
        },
        { key: "ACTIVITY_NAME", label: "ชื่อกิจกรรม" },
        {
          key: "ACTIVITY_POINT",
          label: "แต้ม",
        },

        { key: "actions", label: "การจัดการ" },
      ],
      setACTID: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 12,
      sortBy: "",
      sortDesc: false,
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
      },
      infoModal1: {
        id: "info-modal1",
        title: "",
      },
    };
  },
  async created() {
    this.show();
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
      .post(`${api_url.api_url}/showactivty`, {
        TIME_BANK: this.member[0].TIME_BANK,
      })
      .then((response) => {
        this.items = response.data;
        this.totalRows = this.items.length;
        if (response.data) {
          this.submitted = false;
        }
        // console.log(this.items);
      });
  },
  mounted() {
    this.totalRows = this.items.length;
  },
  methods: {
    show() {
      this.loginn = localStorage.getItem("USER");
      // console.log(this.loginn);
      // console.log(localStorage.getItem("MEMBERSHIP_ID"));
    },
    hideModal() {
      this.$bvModal.hide("bv-modal-ok");
    },
    okay1(item, ACTIVITY_ID, button) {
      this.setACTID = ACTIVITY_ID;
      // console.log(ACTIVITY_ID);
      this.$bvModal.show("bv-modal-ok");
    },
    okay(item) {
      this.loadadd = true;
      // console.log(item);
      var data = {
        ACTIVITY_ID: item,
        ACTIVE: 2,
      };
      axios.post(`${api_url.api_url}/okay`, data).then((response) => {
        this.item = response.data;
        this.$bvModal.hide("bv-modal-ok");
        this.listactivity();
      });
    },
    listactivity() {
      axios
        .post(`${api_url.api_url}/showactivty`, {
          TIME_BANK: this.member[0].TIME_BANK,
        })
        .then((response) => {
          this.items = response.data;
          this.totalRows = this.items.length;
          // if (response.data) {
          //   this.submitted = false;
          // }
          // console.log(this.items);
        });
    },
    info(item, ACTIVITY_ID, button) {
      var data = {
        ACTIVITY_ID: ACTIVITY_ID,
      };
      // console.log(data);
      axios.post(`${api_url.api_url}/PeruseACTIVITY`, data).then((response) => {
        this.item = response.data;
        // console.log(this.item);
      });

      this.infoModal.title = `ภาพกิจกรรม `;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style>
</style>