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
          <br>
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
          <br>
          <b>เสร็จสิ้น</b>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </div>

    <b-card style="margin-left: 10px; margin-right: 10px; margin-bottom: 10px">
      <h5><b>วัน/เวลาที่สะดวกปฏิบัติงาน</b></h5>

      <div>
        <div v-if="load">
          <b-form-group>
            <div v-if="!dayservice == []">
              <b-card align="center">
                <b-row>
                  <b-col cols="3">วัน</b-col>
                  <b-col cols="3">เปิด</b-col>
                  <b-col cols="3">ปิด</b-col>
                  <b-col cols="3">ลบ</b-col>
                </b-row>
                <hr noshade="noshade" />
                <b-row v-for="(dayservice, index) in dayservice" :key="index">
                  <b-col cols="3">{{ dayservice.SERVICE_DATE }}</b-col>
                  <b-col cols="3">{{ dayservice.SERVICE_TIME_OPEN }}</b-col>
                  <b-col cols="3">{{ dayservice.SERVICE_TIME_OFF }}</b-col>
                  <b-col cols="3"
                    ><b-icon
                      icon="trash-fill"
                      @click="detatedayservice(dayservice)"
                      variant="danger"
                    ></b-icon
                  ></b-col>
                </b-row>
              </b-card>
            </div>
            <b-row>
              <b-col cols="4">
                <!-- วันอาทิตย์ -->

                <b-button
                  v-b-toggle="'collapse-1'"
                  block
                  variant="outline-secondary"
                  class="m-1"
                  id="btn1"
                  >วันอาทิตย์</b-button
                >
                <b-collapse id="collapse-1">
                  <b-card style="margin-top: 5px">
                    <b-row>
                      <b-col cols="12" align="center">
                        <b-form-checkbox
                          v-model="SERVICE_DATE"
                          value="วันอาทิตย์"
                          >วันอาทิตย์</b-form-checkbox
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" align="center">
                        <h6>เปิด</h6>
                      </b-col>
                      <b-col cols="6" align="center">
                        <h6>ปิด</h6>
                      </b-col>
                    </b-row>
                    <div style="margin: 10px">
                      <b-row>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OPEN"
                            input-width="100%"
                            placeholder="00:00"
                            close-on-complete
                            locale="th"
                          ></b-form-timepicker>
                        </b-col>
                        <b-col cols="2" align="center">-</b-col>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OFF"
                            input-width="100%"
                            placeholder="00:00"
                            close-on-complete
                            locale="th"
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </div>
                    <div align="center">
                      <b-row>
                        <b-col cols="6"> </b-col>
                        <b-col cols="6">
                          <button
                            @click="Adddate"
                            type="button"
                            class="btn btn-success"
                          >
                            บันทึก
                          </button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
              <b-col cols="4">
                <b-button
                  v-b-toggle="'collapse-2'"
                  block
                  variant="outline-secondary"
                  class="m-1"
                  id="btn1"
                  >วันจันทร์</b-button
                >
                <b-collapse id="collapse-2">
                  <b-card style="margin-top: 5px">
                    <b-row>
                      <b-col cols="12" align="center">
                        <b-form-checkbox
                          v-model="SERVICE_DATE"
                          value="วันจันทร์"
                          >วันจันทร์</b-form-checkbox
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" align="center">
                        <h6>เปิด</h6>
                      </b-col>
                      <b-col cols="6" align="center">
                        <h6>ปิด</h6>
                      </b-col>
                    </b-row>
                    <div style="margin: 10px">
                      <b-row>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OPEN"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                        <b-col>-</b-col>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OFF"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </div>
                    <div align="center">
                      <b-row>
                        <b-col cols="6"> </b-col>
                        <b-col cols="6">
                          <button
                            @click="Adddate"
                            type="button"
                            class="btn btn-success"
                          >
                            บันทึก
                          </button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
              <b-col cols="4">
                <b-button
                  v-b-toggle="'collapse-3'"
                  block
                  variant="outline-secondary"
                  class="m-1"
                  id="btn1"
                  >วันอังคาร</b-button
                >
                <b-collapse id="collapse-3">
                  <b-card style="margin-top: 5px">
                    <b-row>
                      <b-col cols="12" align="center">
                        <b-form-checkbox
                          v-model="SERVICE_DATE"
                          value="วันอังคาร"
                          >วันอังคาร</b-form-checkbox
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" align="center">
                        <h6>เปิด</h6>
                      </b-col>
                      <b-col cols="6" align="center">
                        <h6>ปิด</h6>
                      </b-col>
                    </b-row>
                    <div style="margin: 10px">
                      <b-row>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OPEN"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                        <b-col>-</b-col>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OFF"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </div>
                    <div align="center">
                      <b-row>
                        <b-col cols="6"> </b-col>
                        <b-col cols="6">
                          <button
                            @click="Adddate"
                            type="button"
                            class="btn btn-success"
                          >
                            บันทึก
                          </button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
            </b-row>

            <!-- row 2 -->
            <b-row>
              <b-col cols="4">
                <b-button
                  v-b-toggle="'collapse-4'"
                  block
                  variant="outline-secondary"
                  class="m-1"
                  id="btn1"
                  >วันพุธ</b-button
                >
                <b-collapse id="collapse-4">
                  <b-card style="margin-top: 5px">
                    <b-row>
                      <b-col cols="12" align="center">
                        <b-form-checkbox v-model="SERVICE_DATE" value="วันพุธ"
                          >วันพุธ</b-form-checkbox
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" align="center">
                        <h6>เปิด</h6>
                      </b-col>
                      <b-col cols="6" align="center">
                        <h6>ปิด</h6>
                      </b-col>
                    </b-row>
                    <div style="margin: 10px">
                      <b-row>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OPEN"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                        <b-col>-</b-col>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OFF"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </div>
                    <div align="center">
                      <b-row>
                        <b-col cols="6"> </b-col>
                        <b-col cols="6">
                          <button
                            @click="Adddate"
                            type="button"
                            class="btn btn-success"
                          >
                            บันทึก
                          </button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
              <b-col cols="4">
                <b-button
                  v-b-toggle="'collapse-5'"
                  block
                  variant="outline-secondary"
                  class="m-1"
                  id="btn1"
                  >วันพฤหัสบดี</b-button
                >
                <b-collapse id="collapse-5">
                  <b-card style="margin-top: 5px">
                    <b-row>
                      <b-col cols="12" align="center">
                        <b-form-checkbox
                          v-model="SERVICE_DATE"
                          value="วันพฤหัสบดี"
                          >วันพฤหัสบดี</b-form-checkbox
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" align="center">
                        <h6>เปิด</h6>
                      </b-col>
                      <b-col cols="6" align="center">
                        <h6>ปิด</h6>
                      </b-col>
                    </b-row>
                    <div style="margin: 10px">
                      <b-row>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OPEN"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                        <b-col>-</b-col>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OFF"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </div>
                    <div align="center">
                      <b-row>
                        <b-col cols="6"> </b-col>
                        <b-col cols="6">
                          <button
                            @click="Adddate"
                            type="button"
                            class="btn btn-success"
                          >
                            บันทึก
                          </button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
              <b-col cols="4">
                <b-button
                  v-b-toggle="'collapse-6'"
                  block
                  variant="outline-secondary"
                  class="m-1"
                  id="btn1"
                  >วันศุกร์</b-button
                >
                <b-collapse id="collapse-6">
                  <b-card style="margin-top: 5px">
                    <b-row>
                      <b-col cols="12" align="center">
                        <b-form-checkbox v-model="SERVICE_DATE" value="วันศุกร์"
                          >วันศุกร์</b-form-checkbox
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" align="center">
                        <h6>เปิด</h6>
                      </b-col>
                      <b-col cols="6" align="center">
                        <h6>ปิด</h6>
                      </b-col>
                    </b-row>
                    <div style="margin: 10px">
                      <b-row>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OPEN"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                        <b-col>-</b-col>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OFF"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </div>
                    <div align="center">
                      <b-row>
                        <b-col cols="6"> </b-col>
                        <b-col cols="6">
                          <button
                            @click="Adddate"
                            type="button"
                            class="btn btn-success"
                          >
                            บันทึก
                          </button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-button
                  v-b-toggle="'collapse-7'"
                  block
                  variant="outline-secondary"
                  class="m-1"
                  id="btn1"
                  >วันเสาร์</b-button
                >
                <b-collapse id="collapse-7">
                  <b-card style="margin-top: 5px">
                    <b-row>
                      <b-col cols="12">
                        <b-form-checkbox v-model="SERVICE_DATE" value="วันเสาร์"
                          >วันเสาร์</b-form-checkbox
                        >
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6" align="center">
                        <h6>เปิด</h6>
                      </b-col>
                      <b-col cols="6" align="center">
                        <h6>ปิด</h6>
                      </b-col>
                    </b-row>
                    <div style="margin: 10px">
                      <b-row>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OPEN"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                        <b-col>-</b-col>
                        <b-col cols="5">
                          <b-form-timepicker
                            v-model="SERVICE_TIME_OFF"
                            input-width="100%"
                            placeholder="00:00"
                            locale="th"
                            close-on-complete
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </div>
                    <div align="center">
                      <b-row>
                        <b-col cols="6"> </b-col>
                        <b-col cols="6">
                          <button
                            @click="Adddate"
                            type="button"
                            class="btn btn-success"
                          >
                            บันทึก
                          </button>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
            </b-row>

            <b-row style="margin-right: 20px; margin-top: 20px">
              <b-col align="right">
                <b-button
                  pill
                  style="width: 250px"
                  variant="outline-success"
                  @click="Addmember2"
                  v-b-modal.modal-center
                  >ถัดไป <b-icon icon="arrow-right"></b-icon
                ></b-button>
              </b-col>
            </b-row>
          </b-form-group>
        </div>
        <div v-else>
          <b-spinner
            variant="success"
            style="width: 3rem; height: 3rem"
            label="Spinning"
          ></b-spinner>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
import moment from "moment";
import Nav from "../../components/Nav";
export default {
  components: {
    Nav,
  },
  data: () => ({
    load: true,
    dayservice: "",
    SERVICE_DATE: "",
    SERVICE_TIME_OPEN: "",
    SERVICE_TIME_OFF: "",
    MEMBERSHIP_ID: "",
  }),
  created() {
    this.showmemid();
  },
  mounted() {
    axios
      .post(`${api_url.api_url}/dayservice`, {
        MEMBERSHIP_ID: this.$store.getters["Detail/MEMBERSHIP_ID"],
      })
      .then((response) => {
        console.log(response.data);
        this.dayservice = response.data;
      });
  },
  methods: {
    showmemid() {
      console.log(this.$store.getters["Detail/MEMBERSHIP_ID"]);
      return this.$store.getters["Detail/MEMBERSHIP_ID"];
    },
    Addmember2() {
      this.$store.commit("Detail/SET_MEMBERSHIP_ID", this.$store.getters["Detail/MEMBERSHIP_ID"]);
      this.$router.push({ path: "/addmember3" });
    },
    detatedayservice(item) {
      // console.log(item.DATE_ID);
      axios
        .post(`${api_url.api_url}/delateDATEID`, {
          DATE_ID: item.DATE_ID,
        })
        .then((response) => {
          console.log(response);
          this.reset(response);
        });
    },
    Adddate() {
      var data = {
        MEMBERSHIP_ID: this.$store.getters["Detail/MEMBERSHIP_ID"],
        SERVICE_DATE: this.SERVICE_DATE,
        SERVICE_TIME_OPEN: this.SERVICE_TIME_OPEN,
        SERVICE_TIME_OFF: this.SERVICE_TIME_OFF,
      };
      // console.log(data);
      axios.post(`${api_url.api_url}/insertDate`, data).then((response) => {
        console.log(response);
        this.reset(response);
      });
    },
    reset() {
      axios
        .post(`${api_url.api_url}/dayservice`, {
          MEMBERSHIP_ID: this.$store.getters["Detail/MEMBERSHIP_ID"],
        })
        .then((response) => {
          console.log(response.data);
          this.dayservice = response.data;
        });
    },
  },
};
</script>

<style>
</style>