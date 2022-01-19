<template>
  <div class="colorr">
    <div class="login">
      <b-card class="cardd">
        <b-row style="margin: 20px">
          <b-col cols="6">
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/timebank-544c6.appspot.com/o/124570438_371428157448342_6853434796124168104_n%20(1).png?alt=media&token=46e3a40c-2796-4d71-a207-98ecec282695&fbclid=IwAR0VE7fo1BqKg_TShXSf--uUVVYn-1YXpqEzMJFxX6AsyuEouSz4qbwy7Ug"
                style="width: 500px"
                alt=""
              />
            </div>
          </b-col>
          <b-col cols="6">
            <div style="margin-top: 10px">
              <font size="7px" color="#fcf300">ธนาคารเวลา</font>
            </div>
            <div>
              <h6>
                <font color="#f7f4ea"
                  >ตำบล ชมภู อำเภอ สารภี จังหวัดเชียงใหม่</font
                >
              </h6>
            </div>
            <div style="margin-bottom: 30px">
              <div align="left" style="margin-top: 30px">
                <h6><font color="#f7f4ea">ชื่อผู้ใช้</font></h6>
              </div>
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill" variant="success"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  v-model="ADMIN_USER"
                  placeholder="กรอกชื่อผู้ใช้"
                ></b-form-input>
              </b-input-group>
              <div align="left" style="margin-top: 10px">
                <h6><font color="#f7f4ea">รหัสผ่าน</font></h6>
              </div>
              <b-input-group class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="shield-lock-fill" variant="success"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  type="password"
                  v-model="ADMIN_PASSWORD"
                  placeholder="กรอกรหัสผ่าน"
                ></b-form-input>
              </b-input-group>

              <b-button pill variant="success" @click="login" block
                >เข้าสู่ระบบ</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-card>
      <b-modal id="bv-modal-example" size="sm" centered hide-footer>
        <div class="d-block text-center">
          <font color="#FF0000"><h5>เข้าสู่ระบบไม่สำเร็จ</h5></font>
          <h6>กรุณากรอกให้ถูกต้อง</h6>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      ADMIN_USER: "",
      ADMIN_PASSWORD: "",
    };
  },
  created() {
    // this.show();
    localStorage.clear();
  },
  computed: {},
  methods: {
    //   show() {
    //   this.$store.getters["Detail/ADMIN"];
    //   console.log(this.$store.getters["Detail/ADMIN"]);
    // },
    login() {
      if (this.ADMIN_USER != "" && this.ADMIN_PASSWORD != "") {
        var data = {
          ADMIN_USER: this.ADMIN_USER,
          ADMIN_PASSWORD: this.ADMIN_PASSWORD,
        };
        axios.post(`${api_url.api_url}/login`, data).then((response) => {
          // console.log(data);
          // console.log(response.data);
          // console.log(response.data[0].MEMBERSHIP_ID);
          if (response.data != "") {
            this.$store.commit(
              "Detail/SET_MEMBERSHIP_ID",
              response.data[0].MEMBERSHIP_ID
            );
            // console.log(this.$store.commit("Detail/SET_MEMBERSHIP_ID", response.data[0].MEMBERSHIP_ID));
            if (
              this.ADMIN_USER == response.data[0].ADMIN_USER &&
              this.ADMIN_PASSWORD == response.data[0].ADMIN_PASSWORD
            ) {
              if (
                this.ADMIN_USER == "centralbank" &&
                this.ADMIN_PASSWORD == "bankchompoo"
              ) {
                localStorage.setItem("USER", 1);
                localStorage.setItem(
                  "MEMBERSHIP_ID",
                  response.data[0].MEMBERSHIP_ID
                );
                this.$router.push({ path: "/centralbank" });
              } else {
                localStorage.setItem("USER", 1);
                localStorage.setItem(
                  "MEMBERSHIP_ID",
                  response.data[0].MEMBERSHIP_ID
                );
                this.$router.push({ path: "/Perusemember" });
              }
            } else {
              console.log("The username and / or password is incorrect");
            }
          } else {
            this.$bvModal.show("bv-modal-example");
          }
        });
      } else {
        this.$bvModal.show("bv-modal-example");
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 1000px;
  margin: auto;
  padding: 120px;
}
.cardd {
  margin-top: 50px;
  background-color: #f06292e3;
  border-radius: 100px;
}
.colorr {
  /* background-color: #fffd82; */
  background-image: url("https://firebasestorage.googleapis.com/v0/b/timebank-544c6.appspot.com/o/depositphotos_83645436-stock-photo-abstract-background.jpg?alt=media&token=7189be8b-4895-41b5-a776-5f3f9ab40e05&fbclid=IwAR1yx9cORGvzEadGSCAufUPycpKBw0bwkPNeZqJsmUjEOVzlhZV-dArxcE0");
  padding-bottom: 5%;
}
</style>
