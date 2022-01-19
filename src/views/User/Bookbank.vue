<template>
  <div>
    <div class="color2" align="left">
      <ul class="nav nav-tabs">
        <h6 style="margin: 20px">
          <font color="#FFFFFF">สมุดบัญชีธนาคารเวลา</font>
        </h6>
      </ul>
    </div>
    <div align="left" style="margin: 20px">
      <h6>ชื่อ : {{ items[0].NAMEm }}</h6>
      <h6>เลขบัญชี : {{ items[0].memberid }}</h6>
    </div>
    <div align="center" style="margin-right: 10px">
      <b-button variant="success">
        เเต้มคงเหลือ : {{ items[0].Point }}</b-button
      >
    </div>
    <div style="margin: 10px">
      <md-table md-card>
        <md-table-row style="background-color: #f1912a" slot="md-table-row">
          <md-table-cell>วันที่ล่าสุด</md-table-cell>
          <md-table-cell>รายการ</md-table-cell>
          <md-table-cell>ยอดเเต้ม</md-table-cell>
        </md-table-row>
        <md-table-row
          slot="md-table-row"
          v-for="(item, index) in items"
          :key="index"
        >
          <md-table-cell md-label="วันที่ล่าสุด"
            >{{ item.ThaiDate }}<br />
            {{ item.ThaiTime }}</md-table-cell
          >
          <!--  + item.joinmemid-->
          <md-table-cell md-label="รายการ">
            <div v-if="item.ACTIVITY_NAME == 'โอน'">
            <div v-if="item.TRANSACTIONS_POINT < 0">
              {{ "โอนเเต้มให้ "}}
            </div>
            <div v-if="item.TRANSACTIONS_POINT > 0">
              {{ "เเต้มโอนจาก "+ item.membernameact}}
            </div>
            </div>
            <div v-else>
              {{item.ACTIVITY_NAME}}
            </div>
          </md-table-cell>
          <md-table-cell md-label="ยอดเเต้ม">
            <div v-if="item.TRANSACTIONS_POINT < 0">
              {{ item.TRANSACTIONS_POINT }}
            </div>
            <div v-if="item.TRANSACTIONS_POINT > 0">
              {{ "+" + item.TRANSACTIONS_POINT }}
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <br />
    </div>
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
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
export default {
  data() {
    return {
      items: null,
    };
  },
  mounted() {
    var _this = this;
    liff.init({ liffId: "1654799307-1P9PD4n4" }, function (data) {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      liff.getProfile().then((p) => {
        console.log(p.userId);
        _this.userlineId = p.userId;
    // _this.userlineId = "U5a89ec1b68798a26f886bd6562755210";

    axios
      .post(`${api_url.api_url}/bookbank`, {
        USERID: _this.userlineId,
      })
      .then((response) => {
        _this.items = response.data;
        _this.totalRows = _this.items.length;
        console.log(_this.items);
      });
      });
    });
  },
  methods: {
    back() {
      liff.init({ liffId: "1654799307-1P9PD4n4" }).then(() => {
        liff.closeWindow();
        // Start to use liff's api
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
<style>
.cardddd *,
:after,
:before {
  box-sizing: inherit;
  z-index: 1;
}
.color {
  background-color: rgb(236, 217, 108);
}
</style>