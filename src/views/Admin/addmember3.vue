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
              src="https://www.flaticon.com/svg/static/icons/svg/545/545783.svg"
              style="width: 30px"
              alt=""
            />
          </div>
        </b-col>
        <b-col cols="1">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/2833/2833614.svg"
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
    <div>
      <!-- row1 -->
      <b-row>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานส่งเสริมความรู้"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options1"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานซ่อม-งานช่าง"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options2"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานอำนวยความสะดวก"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options3"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
      </b-row>
      <!-- row2 -->
      <b-row>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานนันทนาการ"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options4"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานบ้าน งานครัว"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options5"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานเกษตร"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options6"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
      </b-row>
      <!-- row3 -->
      <b-row>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานส่งเสริมมิตรภาพ"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options7"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานธุรการ"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options8"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
        <b-col cols="4">
          <div style="margin: 10px">
            <b-card
              border-variant="primary"
              header="งานสุขภาพอนามัย"
              header-bg-variant="primary"
              header-text-variant="white"
              align="center"
            >
              <b-form-group align="left">
                <b-form-checkbox-group
                  v-model="SKILL_NAME"
                  :options="options9"
                  name="flavour-2a"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card>
          </div>
        </b-col>
      </b-row>
      <!-- row4 -->
      <!-- <b-row>
        <b-col cols="4"> -->
      <div style="margin: 10px">
        <b-card
          border-variant="primary"
          header="งานสาธารณะประโยชน์"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          <!-- <b-form-group align="left"> -->
          <b-form-checkbox-group
            v-model="SKILL_NAME"
            :options="options10"
            name="flavour-2a"
          ></b-form-checkbox-group>
          <!-- </b-form-group>    stacked-->
        </b-card>
      </div>
      <!-- </b-col>
      </b-row> -->
    </div>
    <b-row style="margin-right: 20px; margin-top: 20px; margin-bottom: 20px">
      <b-col align="right">
        <b-button
          pill
          style="width: 250px"
          variant="outline-success"
          @click="Addmember3"
          v-b-modal.modal-center
          >ยืนยันการสมัคร</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
const api_url = require("../../../utilities/api");
import axios from "axios";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      SKILL_NAME: [],
      options1: [
        { text: "สอนพิเศษ / สอนการบ้าน", value: "สอนพิเศษ / สอนการบ้าน" },
        {
          text: "สอนทำสิ่งประดิษฐ์ / งานฝีมือ",
          value: "สอนทำสิ่งประดิษฐ์ / งานฝีมือ",
        },
        { text: "สอนดนตรี สอนรำ", value: "สอนดนตรี สอนรำ" },
        { text: "สอนทำอาหาร / ทำขนม", value: "สอนทำอาหาร / ทำขนม" },
        { text: "สอนว่ายน้ำ", value: "สอนว่ายน้ำ" },
        { text: "สอนคอมพิวเตอร์ / IT", value: "สอนคอมพิวเตอร์ / IT" },
        { text: "สอนงานอิเล็กทรอนิคส์", value: "สอนงานอิเล็กทรอนิคส์" },
        { text: "ให้คำปรึกษาด้านกฎหมาย", value: "ให้คำปรึกษาด้านกฎหมาย" },
        {
          text: "สอนเพิ่มพูนความรู้ด้านอาชีพ",
          value: "สอนเพิ่มพูนความรู้ด้านอาชีพ",
        },
        { text: "สอนทำปุ๋ยหมัก / น้ำหมัก", value: "สอนทำปุ๋ยหมัก / น้ำหมัก" },
      ],
      options2: [
        { text: "ซ่อมแซมบ้าน", value: "ซ่อมแซมบ้าน" },
        { text: "ช่างก่อสร้าง ช่างทาสี", value: "ช่างก่อสร้าง ช่างทาสี" },
        {
          text: "ซ่อมอุปกรณ์เครื่องใช้ไฟฟ้า",
          value: "ซ่อมอุปกรณ์เครื่องใช้ไฟฟ้า",
        },
        {
          text: "ซ่อมไฟ / อุปกรณ์ไฟฟ้าขนาดใหญ่",
          value: "ซ่อมไฟ / อุปกรณ์ไฟฟ้าขนาดใหญ่",
        },
        { text: "ซ่อมประปา", value: "ซ่อมประปา" },
        { text: "ซ่อมรถ", value: "ซ่อมรถ" },
        { text: "ช่างตัดเย็บ", value: "ช่างตัดเย็บ" },
        {
          text: "ช่างตัดผม / ทำผม / เสริมความงาม",
          value: "ช่างตัดผม / ทำผม / เสริมความงาม",
        },
      ],
      options3: [
        { text: "ขับรถรับ - ส่ง ", value: "ขับรถรับ - ส่ง " },
        {
          text: "ดูแลเด็ก / ผู้ป่วย / ผู้สูงอายุ / ผู้พิการ",
          value: "ดูแลเด็ก / ผู้ป่วย / ผู้สูงอายุ / ผู้พิการ",
        },
        { text: "ช่วยขนย้ายของ", value: "ช่วยขนย้ายของ" },
        {
          text: "ฝากเลี้ยงสัตว์ / ให้อาหารสัตว์เลี้ยง",
          value: "ฝากเลี้ยงสัตว์ / ให้อาหารสัตว์เลี้ยง",
        },
        { text: "ฝากบ้าน / เฝ้าบ้าน", value: "ฝากบ้าน / เฝ้าบ้าน" },
        { text: "ช่วยจับจ่ายซื้อของ", value: "ช่วยจับจ่ายซื้อของ" },
      ],
      options4: [
        {
          text: "พิธีกร / นำสวดมนต์ / มัคทายก",
          value: "พิธีกร / นำสวดมนต์ / มัคทายก",
        },
        {
          text: "จัดกิจกรรมพัฒนาสมองผู้สูงอายุ",
          value: "จัดกิจกรรมพัฒนาสมองผู้สูงอายุ",
        },
        {
          text: "ออกกำลังกาย / แอโรบิค / โยคะ",
          value: "ออกกำลังกาย / แอโรบิค / โยคะ",
        },
        { text: "นวดเพื่อสุขภาพ", value: "นวดเพื่อสุขภาพ" },
        {
          text: " เล่นดนตรี / ร้องเพลง / รำวงในงานเทศกาล / กิจกรรมต่างๆ",
          value: " เล่นดนตรี / ร้องเพลง / รำวงในงานเทศกาล / กิจกรรมต่างๆ",
        },
      ],
      options5: [
        {
          text: "ทำงานบ้าน (กรณีจำเป็น)",
          value: "ทำงานบ้าน (กรณีจำเป็น)",
        },
        {
          text: "ทำอาหาร ทำขนม เครื่องดื่ม",
          value: "ทำอาหาร ทำขนม เครื่องดื่ม",
        },
        {
          text: "ตกแต่งบ้าน",
          value: "ตกแต่งบ้าน",
        },
        {
          text: "ซัก / รีดเสื้อผ้า",
          value: "ซัก / รีดเสื้อผ้า",
        },
      ],
      options6: [
        {
          text: "รดน้ำต้นไม้ (กรณีจำเป็น)",
          value: "รดน้ำต้นไม้ (กรณีจำเป็น)",
        },
        {
          text: "ตัดต้นไม้ / ต้นหญ้า",
          value: "ตัดต้นไม้ / ต้นหญ้า",
        },
        {
          text: "ปลูกต้นไม้ / ปลูกผักสวนครัว",
          value: "ปลูกต้นไม้ / ปลูกผักสวนครัว",
        },
        {
          text: "แต่งสวน / ทำสวน",
          value: "แต่งสวน / ทำสวน",
        },
      ],
      options7: [
        {
          text: "พูดคุยเป็นเพื่อน",
          value: "พูดคุยเป็นเพื่อน",
        },
        {
          text: "เยี่ยมบ้าน",
          value: "เยี่ยมบ้าน",
        },
        {
          text: "เป็นเพื่อนคุยยามเดินออกกำลัง",
          value: "เป็นเพื่อนคุยยามเดินออกกำลัง",
        },
        {
          text: "เป็นเพื่อนรับประทานอาหาร",
          value: "เป็นเพื่อนรับประทานอาหาร",
        },
      ],
      options8: [
        {
          text: "ช่วยกรอกเอกสาร / ทำบัญชี",
          value: "ช่วยกรอกเอกสาร / ทำบัญชี",
        },
        {
          text: "พิมพ์งานคอมพิวเตอร์",
          value: "พิมพ์งานคอมพิวเตอร์",
        },
        {
          text: "ช่วยออกแบบตกแต่งด้วยโปรแกรมคอมพิวเตอร์",
          value: "ช่วยออกแบบตกแต่งด้วยโปรแกรมคอมพิวเตอร์",
        },
      ],
      options9: [
        {
          text: "ให้คำปรึกษา",
          value: "ให้คำปรึกษา",
        },
        {
          text: "ให้คำแนะนำด้านสุขภาพ / โภชนาการ",
          value: "ให้คำแนะนำด้านสุขภาพ / โภชนาการ",
        },
        {
          text: "ดูแลสุขภาพทั่วไป",
          value: "ดูแลสุขภาพทั่วไป",
        },
      ],
      options10: [
        {
          text: "ทำความสะอาดพื้นที่สาธารณะ",
          value: "ทำความสะอาดพื้นที่สาธารณะ",
        },
        {
          text: "ช่วยเหลืองานกิจกรรมชุมชน",
          value: "ช่วยเหลืองานกิจกรรมชุมชน",
        },
        {
          text: "ช่วยเหลืองานกิจกรรมของธนาคาร",
          value: "ช่วยเหลืองานกิจกรรมของธนาคาร",
        },
      ],
    };
  },
  created() {
    this.showmemid();
  },
  methods: {
    Addmember3() {
      // console.log(this.SKILL_NAME);
      for (let index = 0; index < this.SKILL_NAME.length; index++) {
        // console.log(this.SKILL_NAME[index]);
        var data = {
          MEMBERSHIP_ID: this.$store.getters["Detail/MEMBERSHIP_ID"],
          SKILL_NAME: this.SKILL_NAME[index],
        };
        axios.post(`${api_url.api_url}/insertSkill`, data).then((response) => {
          console.log(response);
          this.$store.commit(
            "Detail/SET_MEMBERSHIP_ID",
            this.$store.getters["Detail/MEMBERSHIP_ID"]
          );
          this.$router.push({ path: "/addmember4" });
        });
      }
    },
    showmemid() {
      console.log(this.$store.getters["Detail/MEMBERSHIP_ID"]);
      return this.$store.getters["Detail/MEMBERSHIP_ID"];
    },
  },
};
</script>

<style>
</style>