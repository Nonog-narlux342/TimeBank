<template>
  <div v-if="!loginn == 0 || !loginn == null">
    <Navuser />
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
      <b-card
        ><b-row>
          <div style="margin-left: 15px">
            <b-form-select
              @change="select()"
              style="width: 400px"
              v-model="YEAR"
              :options="year"
              class="mb-1"
            >
            </b-form-select>
          </div>
        </b-row>

        <b-row style="margin-top: 15px">
          <b-col
            ><b-card>
              <b-row>
                <b-col cols="6">
                  <md-table md-card>
                    <md-table-toolbar style="background-color: #f1c32a">
                      <h1 class="md-title">สรุปผล</h1>
                    </md-table-toolbar>
                    <md-table-row slot="md-table-row">
                      <md-table-cell>สาขาธนาคารเวลา</md-table-cell>
                      <md-table-cell>จำนวนกิจกรรม</md-table-cell>
                      <md-table-cell>จำนวนสมาชิกใหม่</md-table-cell>
                       <md-table-cell>จำนวนสมาชิกรวม</md-table-cell>
                    </md-table-row>
                    <md-table-row
                      slot="md-table-row"
                      v-for="(itemm, index) in yearcount"
                      :key="index"
                    >
                      <md-table-cell md-label="เดือน">{{
                        itemm.BANK_NAME
                      }}</md-table-cell>
                      <md-table-cell md-label="กิจกรรม">
                        <div v-if="itemm.activitycount == null">0</div>
                        <div v-else>{{
                        itemm.activitycount
                      }}</div>
                        
                      
                      </md-table-cell>
                      <md-table-cell md-label="เช็คกิจกรรม">
                        <div v-if="itemm.membernew == null">0</div>
                        <div v-else>{{
                        itemm.membernew
                      }}</div>
                       
                      </md-table-cell>
                       <md-table-cell md-label="เช็คกิจกรรม">
                        <div v-if="itemm.membersum == null">0</div>
                        <div v-else>{{
                        itemm.membersum
                      }}</div>
                       
                      </md-table-cell>
                    </md-table-row>
                  </md-table>
                </b-col>
                <b-col cols="6">
                  <!-- ----- -->
                  <b-row style="margin-top: 15px"
                    ><b-col cols="11">
                      <canvas
                        id="graph2"
                        width="200"
                        height="150"
                      ></canvas> </b-col
                    ><b-col cols="12">
                      <div style="margin:20px;">
                        ผู้สูงอายุ ช่วงอายุ 61 ขึ้นไป /
                        วันแรงงาน ช่วงอายุ 26 - 60 /
                        เยาวชน ช่วงอายุ 15 - 25
                      </div></b-col
                    ></b-row
                  >
                  <!-- ----- -->
                </b-col>
              </b-row>
            </b-card></b-col
          >
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
import { storage } from "firebase";
import Navuser from "../../components/Navuser";
import Chart from "chart.js";
export default {
  components: { Navuser },
  data() {
    return {
      loadadd: false,
      loginn: "",
      items: "",
      items1: "",
      yearitem1: "",

      items3: "",
      yearitem3: "",

      items4: "",
      yearitem4: "",

      yeartime: new Date().getFullYear(),
      YEAR: "2020",
      year: [
        { value: "2020", text: "พุทธศักราช 2563" },
        { value: "2021", text: "พุทธศักราช 2564" },
        { value: "2022", text: "พุทธศักราช 2565" },
        { value: "2023", text: "พุทธศักราช 2566" },
        { value: "2024", text: "พุทธศักราช 2567" },
        { value: "2025", text: "พุทธศักราช 2568" },
        { value: "2026", text: "พุทธศักราช 2569" },
        { value: "2027", text: "พุทธศักราช 2570" },
        { value: "2028", text: "พุทธศักราช 2571" },
        { value: "2029", text: "พุทธศักราช 2572" },
        { value: "2030", text: "พุทธศักราช 2573" },
      ],
      BANK: "",
      yearcount: null,
    };
  },
  async mounted() {
    // console.log(this.YEAR);

    await axios
      .post(`${api_url.api_url}/yearcountMB`, {
        YEAR: this.YEAR,
      })
      .then((response) => {
        this.yearcount = response.data;
        // console.log(this.yearcount);
      });

    var years = [];
    var NumberOfPerson = [];
    await axios
      .post(`${api_url.api_url}/yearMB`, {
        newyear: this.yeartime,
        YEAR: this.YEAR,
      })
      .then((response) => {
        this.yearitem = response.data;
        // console.log(this.yearitem);
        for (let index = 0; index < this.yearitem.length; index++) {
          const element = this.yearitem[index];
          years.push(element.years);
          NumberOfPerson.push(element.NumberOfPerson);
        }
        var ctx = document.getElementById("graph2").getContext("2d");
        var bar1 = new Chart(ctx, {
          type: "bar",
          data: {
            labels: years,
            datasets: [
              {
                backgroundColor: "#f1912a",
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
      await axios
        .post(`${api_url.api_url}/yearcountMB`, {
          YEAR: this.YEAR,
        })
        .then((response) => {
          this.yearcount = response.data;
          // console.log(this.yearcount);
        });
      var years = [];
      var NumberOfPerson = [];
      await axios
        .post(`${api_url.api_url}/yearMB`, {
          newyear: this.yeartime,
          YEAR: this.YEAR,
        })
        .then((response) => {
          this.yearitem = response.data;
          // console.log(this.yearitem);
          for (let index = 0; index < this.yearitem.length; index++) {
            const element = this.yearitem[index];
            years.push(element.years);
            NumberOfPerson.push(element.NumberOfPerson);
          }
          var ctx = document.getElementById("graph2").getContext("2d");
          var bar1 = new Chart(ctx, {
            type: "bar",
            data: {
              labels: years,
              datasets: [
                {
                  backgroundColor: "#f1912a",
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
    show() {
      this.loginn = localStorage.getItem("USER");
      // console.log(this.loginn);
      // console.log(localStorage.getItem("MEMBERSHIP_ID"));
    },
  },
};
</script>

<style>
</style>