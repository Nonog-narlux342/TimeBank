<template>
  <div v-if="!loginn == 0 || !loginn == null">
    <Nav />
    <div>
      <div style="margin: 20px">
        <div style="margin-bottom: 20px">
          <b-row>
            <b-col cols="1">
              <div align="right">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/2257/2257295.svg"
                  style="width: 80px"
                  alt=""
                />
              </div>
            </b-col>
            <b-col cols="11">
              <div align="left" style="margin-top: 45px">
                <font size="6px">สรุปผลรายปี</font>
              </div>
            </b-col>
          </b-row>
        </div>
        <b-card>
          <div style="margin-bottom: 10px">
            <b-form-select
              @change="select()"
              style="width: 400px"
              v-model="YEAR"
              :options="year"
              class="mb-1"
            >
            </b-form-select>
          </div>
          <!-- <div v-if="!items.length == '' || !itemss.length == ''">
            <div v-if="!items.length == 0"> -->
          <b-row>
            <b-col cols="6">
              <md-table md-card>
                <md-table-toolbar style="background-color: #f1912a">
                  <h1 class="md-title">สรุปเเต้มรายปี</h1>
                </md-table-toolbar>
                <md-table-row slot="md-table-row">
                  <md-table-cell>เดือน</md-table-cell>
                  <md-table-cell>แต้มรวม</md-table-cell>
                  <md-table-cell>เช็คกิจกรรม</md-table-cell>
                </md-table-row>
                <md-table-row
                  slot="md-table-row"
                  v-for="(item, index) in items"
                  :key="index"
                >
                  <md-table-cell md-label="เดือน">{{
                    item.montha
                  }}</md-table-cell>
                  <md-table-cell md-label="แต้มรวม">{{
                    item.pointuser
                  }}</md-table-cell>
                  <md-table-cell md-label="เช็คกิจกรรม">
                    <b-button
                      size="sm"
                      class="mr-1"
                      variant="success"
                      @click="showModal(item.monthpoint, index, item.TIME_BANK)"
                      v-b-modal.modal-lg
                      >กิจกรรม</b-button
                    >
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <b-modal id="modal-lg" size="xl" title="กิจกรรม" hide-footer>
                <b-row>
                  <b-col cols="6">
                    <b-card>
                      <p>
                        จำนวนกิจกรรมที่มีคนทำ :
                        {{ itembookcount }}
                      </p>
                      <div style="margin: 10px">
                        <b-table
                          class="table table-striped"
                          show-empty
                          small
                          stacked="md"
                          :items="itembook"
                          :fields="fieldsbook"
                          :per-page="perPage"
                          :current-page="currentPage"
                        >
                        </b-table>
                      </div>
                      <div style="margin: 5px">
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          align="fill"
                          size="sm"
                          class="my-0"
                        ></b-pagination>
                      </div>
                    </b-card>
                  </b-col>
                  <b-col cols="6">
                    <b-card>
                      <p>ขอความช่วยเหลือ</p>
                      <div style="margin: 10px">
                        <b-table
                          class="table table-striped"
                          show-empty
                          small
                          stacked="md"
                          :items="itembook1"
                          :fields="fieldsbook1"
                          :per-page="perPage1"
                          :current-page="currentPage1"
                        >
                        </b-table>
                      </div>
                      <div style="margin: 5px">
                        <b-pagination
                          v-model="currentPage1"
                          :total-rows="totalRows1"
                          :per-page="perPage1"
                          align="fill"
                          size="sm"
                          class="my-0"
                        ></b-pagination></div
                    ></b-card>
                  </b-col>
                </b-row>
              </b-modal>
            </b-col>
            <b-col cols="6">
              <md-table md-card>
                <md-table-toolbar style="background-color: #f1c32a">
                  <h1 class="md-title">สรุปกิจกรรม</h1>
                </md-table-toolbar>
                <md-table-row slot="md-table-row">
                  <md-table-cell>เดือน</md-table-cell>
                  <md-table-cell>กิจกรรม</md-table-cell>
                  <md-table-cell>เช็คกิจกรรม</md-table-cell>
                </md-table-row>
                <md-table-row
                  slot="md-table-row"
                  v-for="(itemm, index) in itemss"
                  :key="index"
                >
                  <md-table-cell md-label="เดือน">{{
                    itemm.monthb
                  }}</md-table-cell>
                  <md-table-cell md-label="กิจกรรม">{{
                    itemm.countact
                  }}</md-table-cell>
                  <md-table-cell md-label="เช็คกิจกรรม">
                    <b-button
                      size="sm"
                      class="mr-1"
                      variant="success"
                      @click="
                        showact(
                          itemm.monthpoint,
                          itemm.monthb,
                          index,
                          itemm.TIME_BANK
                        )
                      "
                      v-b-modal.modal-lg1
                      >กิจกรรม</b-button
                    >
                  </md-table-cell>
                </md-table-row>
              </md-table>

              <b-modal
                id="modal-lg1"
                :title="'กิจกรรมเดือน ' + setmonth"
                size="lg"
                hide-footer
              >
                <!-- ' ?itemact[0].montha:'TEDDDDDDDD' "  -->

                <div style="margin: 10px">
                  <b-card>
                    <b-table
                      class="table table-striped"
                      show-empty
                      small
                      stacked="md"
                      :items="itemact"
                      :fields="fieldsact"
                      :per-page="perPage2"
                      :current-page="currentPage2"
                      ><template #cell(actions)="row">
                        <b-button
                          size="sm"
                          variant="success"
                          @click="
                            info(
                              row.item.ACTIVITY_ID,
                              row.item,
                              row.index,
                              $event.target
                            )
                          "
                          class="mr-1"
                        >
                          รายชื่อผู้เข้าร่วม
                        </b-button>
                      </template>
                    </b-table></b-card
                  >
                </div>
                <div style="margin: 5px">
                  <b-row>
                    <b-col></b-col>
                    <b-col cols="6">
                      <b-pagination
                        v-model="currentPage2"
                        :total-rows="totalRows2"
                        :per-page="perPage2"
                        align="fill"
                        size="sm"
                        class="text-right"
                      ></b-pagination></b-col
                  ></b-row>
                </div>
              </b-modal>
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px">
            <b-col cols="6">
              <b-card>
                <h1 class="md-title">กราฟจิตอาสา</h1>
                <canvas id="graph2" width="200" height="100"></canvas>
              </b-card>
            </b-col>
            <b-col cols="6">
              <div>
                <!-- <b-card> -->
                <md-table md-card>
                  <md-table-toolbar style="background-color: #eb446c">
                    <h1 class="md-title">ตารางจิตอาสา</h1>
                  </md-table-toolbar>
                </md-table>
                <b-table
                  class="table table-striped"
                  show-empty
                  small
                  stacked="md"
                  :items="itemvolunteer"
                  :fields="fieldsvolunteer"
                  :per-page="perPage3"
                  :current-page="currentPage3"
                >
                </b-table>
                <!-- </b-card> -->
              </div>
              <div style="margin: 5px">
                <b-row>
                  <b-col cols="6">
                    <b-pagination
                      v-model="currentPage3"
                      :total-rows="totalRows3"
                      :per-page="perPage3"
                      align="fill"
                      size="sm"
                      class="text-right"
                    ></b-pagination
                  ></b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
          <b-row style="margin-top: 10px">
            <b-col>
              <b-row>
                <b-col cols="6">
                  <b-card>
                    <h1 class="md-title">กราฟช่วงอายุ</h1>
                    <b-row
                      ><b-col cols="6"
                        ><canvas
                          id="graph3"
                          width="200"
                          height="150"
                        ></canvas></b-col
                      ><b-col cols="6">
                        <div>
                          <br /><br /><br />
                          ผู้สูงอายุ ช่วงอายุ 61 ขึ้นไป <br /><br />
                          วันแรงงาน ช่วงอายุ 26 - 60 <br /><br />
                          เยาวชน ช่วงอายุ 15 - 25
                        </div>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col cols="6">
                  <!-- <b-card> -->
                  <md-table md-card>
                    <md-table-toolbar style="background-color: #42dae9">
                      <h1 class="md-title">ทักษะความสามารถ</h1>
                    </md-table-toolbar>
                  </md-table>
                  <b-table
                    class="table table-striped"
                    show-empty
                    small
                    stacked="md"
                    :items="sumskill"
                    :fields="fieldskill"
                    :per-page="perPage4"
                    :current-page="currentPage4"
                  >
                    <template v-slot:cell(All)="row">
                      <b-button
                        size="sm"
                        class="mr-1"
                        variant="success"
                        @click="
                          inskill(
                            row.item.SKILL_NAME,
                            row.item,
                            row.index,
                            $event.target
                          )
                        "
                        >รายชื่อ</b-button
                      >
                    </template>
                  </b-table>
                  <!-- </b-card> -->
                  <div style="margin: 5px">
                    <b-row>
                      <b-col cols="6">
                        <b-pagination
                          v-model="currentPage4"
                          :total-rows="totalRows4"
                          :per-page="perPage4"
                          align="fill"
                          size="sm"
                          class="text-right"
                        ></b-pagination>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <!-- </div>
          </div>
          <div v-else style="margin-top: 100px">
            <div class="text-center">
              <b-icon
                icon="exclamation-circle-fill"
                variant="warning"
                style="width: 120px; height: 120px"
              ></b-icon>
            </div>
            <div align="center"><h5>ยังไม่มีข้อมูลการสรุป</h5></div>
          </div> -->
        </b-card>
      </div>
      <b-modal :id="infoModal.id" :title="infoModal.title" hide-footer>
        <md-table md-card>
          <md-table-toolbar style="background-color: #f1c32a">
            <h1 class="md-title">คนที่เข้าร่วมกิจกรรม</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row">
            <md-table-cell>บัญชี</md-table-cell>
            <md-table-cell>ชื่อ</md-table-cell>
          </md-table-row>
          <md-table-row
            slot="md-table-row"
            v-for="(itemx, index) in itemmemberact"
            :key="index"
          >
            <md-table-cell md-label="บัญชี">{{
              itemx.MEMBERSHIP_ID
            }}</md-table-cell>
            <md-table-cell md-label="ชื่อ"
              >{{ itemx.MEMBERSHIP_FIRFENAME }}
              {{ itemx.MEMBERSHIP_LASTNAME }}</md-table-cell
            >
          </md-table-row>
        </md-table>
      </b-modal>
      <!-- <div class="footer">
        <div style="margin-top: 30px">
          เบอร์โทร : 0523254125 - 0846112545 ที่อยู่ 55 ตำบลชมภู ตำบล สารภี
          จังหวัดเชียงใหม่ 50140
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { storage } from "firebase";
const api_url = require("../../../utilities/api");
import Nav from "../../components/Nav";
import Chart from "chart.js";
import axios from "axios";
export default {
  components: {
    Nav,
  },

  name: "TableTemplate",
  data: () => ({
    itembook: null,
    itembook1: null,
    items: null,
    itemss: null,
    itemb: null,
    itemact: null,
    itemmemberact: null,
    itemvolunteer: null,
    itemvolun: null,
    yeartime: new Date().getFullYear(),
    yearitem: null,
    itembookcount: null,
    sumitemvolunteer: null,
    sumskill: null,

    YEAR: "2563",
    year: [
      { value: "2563", text: "พุทธศักราช 2563" },
      { value: "2564", text: "พุทธศักราช 2564" },
      { value: "2565", text: "พุทธศักราช 2565" },
      { value: "2566", text: "พุทธศักราช 2566" },
      { value: "2567", text: "พุทธศักราช 2567" },
      { value: "2568", text: "พุทธศักราช 2568" },
      { value: "2569", text: "พุทธศักราช 2569" },
      { value: "2570", text: "พุทธศักราช 2570" },
      { value: "2571", text: "พุทธศักราช 2571" },
      { value: "2572", text: "พุทธศักราช 2572" },
    ],
    totalRows: 1,
    currentPage: 1,
    perPage: 10,

    fieldsbook: [
      { key: "MEMBERSHIP_ID", label: "บัญชี" },
      { key: "NAMEMEM", label: "ชื่อ" },
      {
        key: "ACTIVITY_NAME",
        label: "ชื่อกิจกรรม",
      },

      {
        key: "TRANSACTIONS_POINT",
        label: "แต้ม",
      },
    ],
    totalRows1: 1,
    currentPage1: 1,
    perPage1: 10,
    fieldsbook1: [
      { key: "MEMBERSHIP_ID", label: "บัญชี" },
      { key: "NAMEMEM", label: "ชื่อ" },
      {
        key: "ACTIVITY_NAME",
        label: "ชื่อกิจกรรม",
      },

      {
        key: "TRANSACTIONS_POINT",
        label: "แต้ม",
      },
    ],
    totalRows2: 1,
    currentPage2: 1,
    perPage2: 10,
    fieldsact: [
      { key: "MEMBERSHIP_ID", label: "บัญชี" },
      { key: "NAMEMEMBER", label: "ชื่อ" },
      {
        key: "ACTIVITY_NAME",
        label: "ชื่อกิจกรรม",
      },
      ,
      { key: "actions", label: "การจัดการ" },
    ],
    fieldsvolunteer: [
      { key: "MEMBERSHIP_ID", label: "บัญชี" },
      { key: "fullname", label: "ชื่อ" },
      {
        key: "membercount",
        label: "แต้ม",
      },
    ],
    totalRows3: 1,
    currentPage3: 1,
    perPage3: 7,

    fieldskill: [
      { key: "SKILL_NAME", label: "ทักษะความสามารถ" },
      {
        key: "M_SK",
        label: "จำนวน",
      },
      {
        key: "All",
        label: "เพิ่มเติม",
      },
    ],
    totalRows4: 1,
    currentPage4: 1,
    perPage4: 5,
    infoModal: {
      id: "info-modal",
      title: "",
    },
    setmonth: "",
  }),
  async mounted() {
    console.log(this.yeartime);
    console.log(this.YEAR);
    await axios
      .post(`${api_url.api_url}/semember`, {
        MEMBERSHIP_ID: localStorage.getItem("MEMBERSHIP_ID"),
      })
      .then((response) => {
        this.member = response.data;
        console.log(this.member);
      });
    console.log(this.member[0].TIME_BANK);
    localStorage.setItem("TIME_BANK",this.member[0].TIME_BANK)
    await axios
      .post(`${api_url.api_url}/chartpoint`, {
        year: this.YEAR,
        TIME_BANK: this.member[0].TIME_BANK,
      })
      .then((response) => {
        this.items = response.data;
      });
    await axios
      .post(`${api_url.api_url}/sumact`, {
        TIME_BANK: this.member[0].TIME_BANK,
        year: this.YEAR,
      })
      .then((response) => {
        this.itemss = response.data;
        console.log(this.itemss);
      });
    await axios
      .post(`${api_url.api_url}/summember`, {
        year: this.YEAR,
        TIME_BANK: this.member[0].TIME_BANK,
      })
      .then((response) => {
        this.itemmember = response.data;
      });
    axios
      .post(`${api_url.api_url}/sumvolunteer`, {
        year: this.YEAR,
        TIME_BANK: this.member[0].TIME_BANK,
      })
      .then((response) => {
        this.sumitemvolunteer = response.data;
        this.totalRows3 = this.sumitemvolunteer.length;
      });

    axios
      .post(`${api_url.api_url}/sumskill`, {
        year: this.YEAR,
        TIME_BANK: this.member[0].TIME_BANK,
      })
      .then((response) => {
        this.sumskill = response.data;
        this.totalRows4 = this.sumskill.length;
      });
    var fullname = [];
    var membercount = [];
    await axios
      .post(`${api_url.api_url}/volunteer`, {
        TIME_BANK: this.member[0].TIME_BANK,
      })
      .then((response) => {
        this.itemvolunteer = response.data;
        console.log(this.itemvolunteer);
        for (let index = 0; index < this.itemvolunteer.length; index++) {
          const element = this.itemvolunteer[index];
          fullname.push(element.fullname);
          membercount.push(element.membercount);
        }
        var ctx = document.getElementById("graph2").getContext("2d");
        var bar = new Chart(ctx, {
          type: "bar",
          data: {
            labels: fullname,
            datasets: [
              {
                backgroundColor: "#43ec3f",
                label: "จำนวน",
                data: membercount,
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
    var years = [];
    var NumberOfPerson = [];
    await axios
      .post(`${api_url.api_url}/year`, {
        TIME_BANK: this.member[0].TIME_BANK,
        newyear: this.yeartime,
      })
      .then((response) => {
        this.yearitem = response.data;
        console.log(this.yearitem);
        for (let index = 0; index < this.yearitem.length; index++) {
          const element = this.yearitem[index];
          years.push(element.years);
          NumberOfPerson.push(element.NumberOfPerson);
        }
        var ctx = document.getElementById("graph3").getContext("2d");
        var bar1 = new Chart(ctx, {
          type: "bar",
          data: {
            labels: years,
            datasets: [
              {
                backgroundColor: "#4a3fec",
                label: "จำนวน",
                data: NumberOfPerson,
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      });
  },

  created() {
    this.show();
  },
  methods: {
    async select() {
      // console.log(this.YEAR);
      console.log(this.member[0].TIME_BANK);
      axios
        .post(`${api_url.api_url}/chartpoint`, {
          year: this.YEAR,
          TIME_BANK: this.member[0].TIME_BANK,
        })
        .then((response) => {
          this.items = response.data;
          // console.log(this.items);
        });
      await axios
        .post(`${api_url.api_url}/sumact`, {
          year: this.YEAR,
          TIME_BANK: this.member[0].TIME_BANK,
        })
        .then((response) => {
          this.itemss = response.data;
        });
    },

    show() {
      this.loginn = localStorage.getItem("USER");
      console.log(this.loginn);
      console.log(localStorage.getItem("MEMBERSHIP_ID"));
    },
    showModal(monthp, index, bank) {
      // console.log(monthp);
      // console.log(index);
      console.log(bank);
      axios
        .post(`${api_url.api_url}/summonth`, {
          MONTHP: monthp,
          year: this.YEAR,
          TIME_BANK: bank,
        })
        .then((response) => {
          this.itembook = response.data;
          this.totalRows = this.itembook.length;
          // console.log(this.itembook);
          // console.log(this.totalRows);
        });
      axios
        .post(`${api_url.api_url}/countmonth`, {
          MONTHP: monthp,
          year: this.YEAR,
          TIME_BANK: bank,
        })
        .then((response) => {
          this.itembookcount = response.data[0].counttran;
          console.log(this.itembookcount);
        });
      axios
        .post(`${api_url.api_url}/summonthdeladd`, {
          MONTHP: monthp,
          year: this.YEAR,
          TIME_BANK: bank,
        })
        .then((response) => {
          this.itembook1 = response.data;
          this.totalRows1 = this.itembook1.length;
          // console.log(this.itembook1);
          // console.log(this.totalRows1);
        });
    },
    showact(monthp, mon, index, bank) {
      console.log(index);
      this.setmonth = mon;
      axios
        .post(`${api_url.api_url}/sumactivity`, {
          MONTHP: monthp,
          year: this.YEAR,
          TIME_BANK: bank,
        })
        .then((response) => {
          if (response.data) {
            this.itemact = response.data;
            this.totalRows2 = this.itemact.length;
            console.log(this.itemact);
          }

          // console.log(this.totalRows2);
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.totalRows1 = filteredItems.length;
      this.totalRows2 = filteredItems.length;
      this.totalRows3 = filteredItems.length;

      this.currentPage = 1;
      this.currentPage1 = 1;
      this.currentPage2 = 1;
      this.currentPage3 = 1;
    },
    info(ACT_ID, item, index, button) {
      console.log(item);
      axios
        .post(`${api_url.api_url}/memberactivity`, {
          ACTIVITY_ID: ACT_ID,
          TIME_BANK: localStorage.getItem("TIME_BANK"),
        })
        .then((response) => {
          this.itemmemberact = response.data;
          console.log(this.itemmemberact);
        });
      this.infoModal.title = `กิจกรรม ${item.ACTIVITY_NAME}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    inskill(ACT_ID, item, index, button) {
      console.log(item);
      axios
        .post(`${api_url.api_url}/allskill`, {
          ACTIVITY_ID: ACT_ID,
          TIME_BANK: localStorage.getItem("TIME_BANK"),
        })
        .then((response) => {
          this.itemmemberact = response.data;
          console.log(this.itemmemberact);
        });
      this.infoModal.title = `${item.SKILL_NAME}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    // bar
    onPagination(pagination) {
      if (pagination) {
        this.limit = pagination.size;
        this.offset = (pagination.page - 1) * this.limit;
      }

      this.find();
    },
  },
};
</script>

<style>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(
    90deg,
    rgba(240, 98, 146, 1) 0%,
    rgba(244, 132, 170, 1) 35%,
    rgba(254, 200, 219, 1) 100%
  );
  text-align: center;
}
.wrapper {
  padding-top: 20px;
  display: block;
  height: 500px;
  width: 500px;
}
.mb-3 {
  width: 250px !important;
}
.modal-siz {
  max-width: 850px;
}
</style>