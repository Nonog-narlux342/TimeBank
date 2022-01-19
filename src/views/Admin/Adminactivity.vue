<template>
  <div v-if="!loginn == 0 || !loginn == null">
    <Nav />
    <div style="margin: 10px">
      <div>
        <b-row>
          <b-col cols="1">
            <div align="right">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/190/190411.svg"
                style="width: 80px"
                alt=""
              />
            </div>
          </b-col>
          <b-col cols="11">
            <div align="left" style="margin-top: 45px">
              <font size="6px">กิจกรรมของธนาคาร</font>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <div style="margin: 20px">
      <div style="margin: 20px">
        <div v-if="!adminactivity == ''">
          <div v-if="adminactivity != ''">
            <div v-if="adminactivity[0].ACTIVEMEMBER == 1">
              <b-table
                class="table table-striped"
                show-empty
                stacked="md"
                :items="adminactivity"
                :fields="fields"
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
                    @click="info(row.item, row.index, $event.target)"
                    class="mr-1"
                    variant="info "
                    >อนุมัติคนเข้าร่วม</b-button
                  >
                </template>
                <template v-slot:row-details="row">
                  <b-row>
                    <b-col cols="6">
                      <pre>
                      <h6>
                 รหัสกิจกรรม : {{ row.item.ACTIVITY_ID}} <br>
                 ชื่อกิจกรรม : {{row.item.ACTIVITY_NAME}} <br>
                 ที่อยู่ : {{row.item.ACTIVITY_ADDRESS}} ต. {{row.item.ACTIVITY_SUBDISTRIC}} อ. {{row.item.ACTIVITY_DISTRICT}} จ. {{row.item.ACTIVITY_PROVINCE}} <br>
                 จำนวน : {{row.item.ACTIVITY_COUNT}} คน <br>
                 เพศ : {{row.item.ACTIVITY_SEX}} <br>
                 วันที่ : {{row.item.ACTIVITY_DAY}} <br>
                 ช่วงเวลา : {{row.item.APPPOINTMENT_TIME}} น. <br>
                 รายะเอียด : {{row.item.ACTIVITY_DETAILS}} 
                      </h6>
                     </pre>
                    </b-col>
                  </b-row>
                </template>
              </b-table>
              <b-modal
                :id="infoModal.id"
                :title="infoModal.title"
                hide-footer
                size="xl"
              >
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
                      <b-badge
                        v-if="names.length > 1"
                        variant="dark"
                        class="ml-1"
                        >+ {{ names.length - 1 }} รูป</b-badge
                      >
                    </template></b-form-file
                  >
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
                              :id="`my-custom-tags-tag_${tag.replace(
                                /\s/g,
                                '_'
                              )}_`"
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
                            @click="
                              del(member.ACTIVITY_ID, member.MEMBERSHIP_ID)
                            "
                          >
                            ไม่มา
                          </b-button>
                        </div>
                      </b-card>
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-center">
                      <b-spinner
                        variant="warning"
                        label="Text Centered"
                      ></b-spinner>
                    </div>
                  </div>
                  <!-- Myactivity1(adminactivity[0].ACTIVITY_ID) -->
                </b-collapse>
                <div style="margin-top: 10px" align="right">
                  <b-button
                    style="width: 150px"
                    pill
                    variant="success"
                    @click="showModal(userdata[0].ACTIVITY_ID)"
                    >ยืนยัน</b-button
                  >
                </div>
              </b-modal>
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
                    </b-col></b-row
                  >
                </div>
              </b-modal>
            </div>

            <div v-else align="center" style="margin-top: 150px">
              <b-icon
                icon="exclamation-circle-fill"
                style="width: 120px; height: 120px"
                variant="warning"
              ></b-icon>
              <h5>ไม่สามารถใช้งานได้</h5>
            </div>
          </div>
          <div v-else align="center" style="margin-top: 150px">
            <div>
              <b-icon
                icon="box-seam"
                variant="danger"
                style="width: 120px; height: 120px"
              ></b-icon>
            </div>
            <h5>ไม่มีกิจกรรมที่สร้าง</h5>
          </div>
        </div>
        <div v-else style="margin-top: 200px">
          <div class="text-center">
            <b-spinner variant="warning" label="Text Centered"></b-spinner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
const api_url = require("../../../utilities/api");

import moment from "moment";
import Nav from "../../components/Nav";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      loadadd: false,
      setID: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      IMG_NAME: "",
      IMG: [],
      VolunteerMEMBER: [],

      userdata: null,
      adminactivity: null,
      load1: true,
      loginn: "",
      fields: [
        {
          key: "ACTIVITY_NAME",
          label: "ชื่อกิจกรรม",
        },
        {
          key: "ACTIVITY_DAY",
          label: "วันที่",
        },
        {
          key: "APPPOINTMENT_TIME",
          label: "เวลา",
        },
        { key: "actions", label: "การจัดการ" },
      ],
      ACTIVITY_NAME: "",
      infoModal: {
        id: "info-modal",
        title: "",
      },
    };
  },
  mounted() {
    // console.log(localStorage.getItem("MEMBERSHIP_ID"));
    axios
      .post(`${api_url.api_url}/adminactivity`, {
        MEMBERSHIP_ID: localStorage.getItem("MEMBERSHIP_ID"),
      })
      .then((response) => {
        this.adminactivity = response.data;
        // console.log(this.adminactivity);
      });
  },
  created() {
    this.show();
    this.load = false;
  },

  methods: {
    showModal(id) {
      this.$bvModal.show("bv-modal-example");
      // console.log(id);
      this.setID = id;
    },
    hideModal() {
      this.$bvModal.hide("bv-modal-example");
    },
    show() {
      this.loginn = localStorage.getItem("USER");

      // console.log(this.loginn);
      // console.log(localStorage.getItem("MEMBERSHIP_ID"));
    },
    info(item, button) {
      // console.log(item.ACTIVITY_ID);
      this.load1 = false;
      axios
        .post(`${api_url.api_url}/showmemberactivity`, {
          ACTIVITY_ID: item.ACTIVITY_ID,
        })
        .then((response) => {
          this.load1 = true;
          this.userdata = response.data;
          // console.log(this.userdata);
        });
      this.infoModal.title = `อนุมัติคนเข้าร่วม `;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    del(ACTIVITY_I, MEMBER_I) {
      var data = {
        ACTIVE: 3,
        MEMBERSHIP_ID: MEMBER_I,
        ACTIVITY_ID: ACTIVITY_I,
      };
      // console.log(data);
      axios.post(`${api_url.api_url}/updel`, data).then((response) => {
        // console.log(response);
        this.info(response);
      });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files;
      // console.log(this.imageData);
    },
    promiseImg() {
      this.picture = null;
      this.IMG = [];
      return new Promise((resolve, reject) => {
        // console.log(this.imageData);
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
      // console.log(ACTIVITY_I);
      // console.log(step1);
      await axios
        .post(`${api_url.api_url}/upmember`, {
          ACTIVITY_ID: ACTIVITY_I,
        })
        .then((response) => {
          // console.log(response);
        });
      for (let index = 0; index < step1.length; index++) {
        await axios
          .post(`${api_url.api_url}/upIMG`, {
            ACTIVITY_ID: ACTIVITY_I,
            url: step1[index].url,
            id: step1[index].id,
          })
          .then((response) => {
            // console.log(response);
            this.$router.push({ path: "/Perusemember" });
          });
      }

      // console.log(this.VolunteerMEMBER.length);
      for (let index = 0; index < this.VolunteerMEMBER.length; index++) {
        await axios
          .post(`${api_url.api_url}/insertVolunteer`, {
            ACTIVITY_ID: ACTIVITY_I,
            MEMBERSHIP_ID: this.VolunteerMEMBER[index],
          })
          .then((response) => {
            // console.log(response);
          });
      }
    },
    // Myactivity1(ACTIVITY_I) {

    //   this.picture = null;
    //   const storageRef = firebase
    //     .storage()
    //     .ref(`${this.imageData.name}`)
    //     .put(this.imageData);
    //   storageRef.on(
    //     `state_changed`,
    //     (snapshot) => {
    //       this.uploadValue =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       console.log(error.message);
    //     },
    //     () => {
    //       this.uploadValue = 100;
    //       storageRef.snapshot.ref.getDownloadURL().then((url) => {
    //         this.picture = url;
    //         console.log(url);
    //         axios
    //           .post(`${api_url.api_url}/upIMG`, {
    //             ACTIVITY_ID: ACTIVITY_I,
    //             IMG_NAME: url,
    //           })
    //           .then((response) => {
    //             console.log(response);
    //           });
    //       });
    //     }
    //   );
    //   console.log(this.VolunteerMEMBER.length);
    //   for (let index = 0; index < this.VolunteerMEMBER.length; index++) {
    //     axios
    //       .post(`${api_url.api_url}/insertVolunteer`, {
    //         ACTIVITY_ID: ACTIVITY_I,
    //         MEMBERSHIP_ID: this.VolunteerMEMBER[index],
    //       })
    //       .then((response) => {
    //         _this.$bvModal.hide("bv-modal-example");
    //         console.log(response);
    //       });
    //   }
    //   this.$router.push({ path: "/Perusemember" });
    // },
  },
};
</script>

<style>
</style>