const line = require("@line/bot-sdk");
const request = require("request");
const moment = require("moment-timezone");
const {
  query_command
} = require("./query_command")

const config = {
  channelAccessToken: "okZZuOSBQTFplbIhwATPYZoPywVjY2tS150O8q6Km9/QYjD8ag1lnDAgzQZyimjbP68KfxXSPuqqM0me36G/+QqOeXw8ptF4XEf3CwswL68FB/yt/bbGz5A0OdxVRKVGBpMk+TQ5vBrCabi3QFDnRAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "4fdf875a533ba40d626924b7794775ce"
};

//richmenu
const userrich = 'richmenu-3b124742e89a87e025de97f0eda4f0d3'

//link
const link = async (uid, richMenuId) => {
  console.log(`https://api.line.me/v2/bot/user/${uid}/richmenu/${richMenuId}`);
  await request.post({
      uri: `https://api.line.me/v2/bot/user/${uid}/richmenu/${richMenuId}`,
      headers: {
        Authorization: 'Bearer okZZuOSBQTFplbIhwATPYZoPywVjY2tS150O8q6Km9/QYjD8ag1lnDAgzQZyimjbP68KfxXSPuqqM0me36G/+QqOeXw8ptF4XEf3CwswL68FB/yt/bbGz5A0OdxVRKVGBpMk+TQ5vBrCabi3QFDnRAdB04t89/1O/w1cDnyilFU='
      }
    },
    function (error, response, body) {
      console.log(error, body);
    })
}

const client = new line.Client(config);
var handleEvent = function handleEvent(event) {
  console.log(event);
  if (event.type === "postback") {
    handlePostbackEvent(event);
  } else if (event.type === "message" && event.message.type === "text") {
    handMessageEvent(event)
  } else {
    return Promise.resolve(null);
  }
  async function handlePostbackEvent(event) {
    if (event.postback.data == 'วิธีการเริ่มต้นใช้งาน') {
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "1.ติดต่อนายธนาคาร ณ ธนาคารเวลาสาขาที่ใกล้บ้านท่าน 👸🤴 \n2.สมัครสมาชิกธนาคารเวลา โดยเตรียมบัตรประชาชน 💳 และสมาร์ทโฟน 📱 \n3.เมื่อนายธนาคารสมัครสมาชิกเสร็จ ให้สแกน QRCORD เพื่อเข้าสู่บัญชีธนาคารเวลา\n4. เข้าร่วมกิจกรรมหรือสร้างกิจกรรมเพื่อเเลกเปลี่ยนคะเเนน"
      })

    } else if (event.postback.data == 'บัญชีของฉัน') {
      const accon = await query_command(`SELECT
      CONCAT(
          MEMBERSHIP.MEMBERSHIP_FIRFENAME,
          " ",
          MEMBERSHIP.MEMBERSHIP_LASTNAME
      ) AS namemember,
      MEMBERSHIP.MEMBERSHIP_ID,
      MEMBERSHIP.MEMBERSHIP_POINT,
  CASE
    WHEN MEMBERSHIP.TIME_BANK = '1' THEN 'ออมเวลาปันด้วยใจ ให้ด้วยรัก'
    WHEN MEMBERSHIP.TIME_BANK = '2' THEN 'รวมพลังใจรัก ตำบลต้นเปา'
    WHEN MEMBERSHIP.TIME_BANK = '3' THEN 'รวมใจรัก ตำบลยางคราม'
    WHEN MEMBERSHIP.TIME_BANK = '4' THEN 'ตำบลป่าตุ้ม'
    WHEN MEMBERSHIP.TIME_BANK = '5' THEN 'บ้านสันละลึก'
    WHEN MEMBERSHIP.TIME_BANK = '6' THEN 'บ้านห้วยโป่ง'
    WHEN MEMBERSHIP.TIME_BANK = '7' THEN 'ตำบลแม่แฝกใหม่'
    WHEN MEMBERSHIP.TIME_BANK = '8' THEN 'ฮอมใจ๋ ใส่เวลา อำเภอเวียงแหง'
    WHEN MEMBERSHIP.TIME_BANK = '9' THEN 'บ้านกู่ฮ้อสามัคคี'
    ELSE 'ไม่มี'
    END AS timebank
  FROM
      MEMBERSHIP
  WHERE USERID = "${event.source.userId}"`)
      console.log(accon);
      console.log(accon[0].namemember);
      console.log(accon[0].MEMBERSHIP_ID);
      console.log(accon[0].timebank);
      console.log(accon[0].MEMBERSHIP_POINT);
      return client.replyMessage(event.replyToken, {
        type: "flex",
        altText: "Flex Message",
        contents: {
          "type": "bubble",
          "hero": {
            "type": "image",
            "url": "https://firebasestorage.googleapis.com/v0/b/market01.appspot.com/o/01.jpg?alt=media&token=c3dfa418-865b-4178-b754-152a6437318a",
            "size": "full",
            "aspectRatio": "1.91:1",
            "aspectMode": "cover"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "text",
                "text": "สมุดบัญชี",
                "weight": "bold",
                "size": "xl",
                "color": "#B00439FF",
                "contents": []
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "ชื่อบัญชี:",
                    "weight": "bold",
                    "size": "md",
                    "color": "#DD2D43",
                    "flex": 2,
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": accon[0].namemember,
                    "color": "#F45866",
                    "flex": 5,
                    "contents": []
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "เลขบัญชี:",
                    "weight": "bold",
                    "size": "md",
                    "color": "#DD2D43",
                    "flex": 2,
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": accon[0].MEMBERSHIP_ID,
                    "color": "#F45866",
                    "flex": 5,
                    "contents": []
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "สาขา:",
                    "weight": "bold",
                    "size": "md",
                    "color": "#DD2D43",
                    "flex": 5,
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": accon[0].timebank,
                    "color": "#F45866",
                    "flex": 19,
                    "wrap": true,
                    "contents": []
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "แต้ม:",
                    "weight": "bold",
                    "size": "md",
                    "color": "#DD2D43",
                    "flex": 2,
                    "contents": []
                  },
                  {
                    "type": "text",
                    "text": ""+accon[0].MEMBERSHIP_POINT,
                    "color": "#F45866",
                    "flex": 10,
                    "contents": []
                  }
                ]
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "flex": 0,
            "spacing": "sm",
            "contents": [{
              "type": "button",
              "action": {
                "type": "uri",
                "label": "รายละเอียด",
                "uri": "https://liff.line.me/1654799307-1P9PD4n4"
              },
              "color": "#FD2D6EFF",
              "margin": "lg",
              "style": "primary"
            }]
          }
        }
      });
    }
  }
  async function handMessageEvent(event) {
    console.log("kkkkkkkk" + event);
    var eventText = event.message.text;
    console.log(eventText)
    if (eventText.split("_")[0] == "signup") {
      var checkcid = await query_command(`UPDATE MEMBERSHIP SET USERID = '${event.source.userId}' WHERE MEMBERSHIP_ID = '${eventText.split("_")[1]}'`);
      console.log(event.source.userId, userrich);
      link(event.source.userId, userrich);
      console.log("ooooooo" + checkcid);
      const datamember = await query_command(`SELECT 
      CASE
        WHEN MEMBERSHIP.TIME_BANK = '1' THEN 'ออมเวลาปันด้วยใจ ให้ด้วยรัก'
        WHEN MEMBERSHIP.TIME_BANK = '2' THEN 'รวมพลังใจรัก ตำบลต้นเปา'
        WHEN MEMBERSHIP.TIME_BANK = '3' THEN 'รวมใจรัก ตำบลยางคราม'
        WHEN MEMBERSHIP.TIME_BANK = '4' THEN 'ตำบลป่าตุ้ม'
        WHEN MEMBERSHIP.TIME_BANK = '5' THEN 'บ้านสันละลึก'
        WHEN MEMBERSHIP.TIME_BANK = '6' THEN 'บ้านห้วยโป่ง'
        WHEN MEMBERSHIP.TIME_BANK = '7' THEN 'ตำบลแม่แฝกใหม่'
        WHEN MEMBERSHIP.TIME_BANK = '8' THEN 'ฮอมใจ๋ ใส่เวลา อำเภอเวียงแหง'
        WHEN MEMBERSHIP.TIME_BANK = '9' THEN 'บ้านกู่ฮ้อสามัคคี'
        ELSE 'ไม่มี'
        END AS timebank,
          CONCAT(
              MEMBERSHIP.MEMBERSHIP_FIRFENAME,
              " ",
              MEMBERSHIP.MEMBERSHIP_LASTNAME
          ) AS name1,
          CONCAT(MEMBERSHIP.MEMBERSHIP_ADDRESS," ",
      "ต.",LOCATION_CODE.SUBDISTRIC," ","อ.",LOCATION_CODE.DISTRICT," ",
      "จ.",LOCATION_CODE.PROVINCE," ",LOCATION_CODE.ZIPCODE) AS address,
          MEMBERSHIP.MEMBERSHIP_BIRTH,
          MEMBERSHIP.MEMBERSHIP_ID,
          MEMBERSHIP.MEMBERSHIP_TELEPHONE,
      
      CONCAT(
              MEMBERSHIP.CONTACTPERSONS_FIRFENAME,
              " ",
              MEMBERSHIP.CONTACTPERSONS_LASTNAME
          ) AS name2,
      MEMBERSHIP.CONTACTPERSONS_RELATIONSHIP,
      MEMBERSHIP.CONTACTPERSONS_TELEPHONE,
      MEMBERSHIP.MEMBERSHIP_IMGE
      FROM
          MEMBERSHIP
      LEFT JOIN LOCATION_CODE ON MEMBERSHIP.LOCATION_CODE = LOCATION_CODE.LOCATION_CODE
      WHERE USERID = "${event.source.userId}"`)
      console.log(datamember);
      var nowyear = new Date().getFullYear();
      console.log(nowyear);
      var age = parseInt(nowyear - moment(datamember[0].MEMBERSHIP_BIRTH).format("YYYY"));
      console.log(datamember[0].name1);
      console.log(moment(datamember[0].MEMBERSHIP_BIRTH).tz('Asia/Bangkok').format("DD/MM/") + (parseInt(moment(datamember[0].MEMBERSHIP_BIRTH).format("YYYY")) + 543) + ' (' + age + 'ปี)');
      console.log(datamember[0].MEMBERSHIP_ID);
      console.log(datamember[0].address);
      console.log(datamember[0].MEMBERSHIP_TELEPHONE);
      console.log(datamember[0].name2);
      console.log(datamember[0].CONTACTPERSONS_RELATIONSHIP);
      console.log(datamember[0].CONTACTPERSONS_TELEPHONE);
      console.log(datamember[0].MEMBERSHIP_IMGE);
      console.log(datamember[0].timebank);
      client.replyMessage(event.replyToken, {
        type: "flex",
        altText: "Flex Message",
        contents: {
          type: "bubble",
          // ภาพส่วนหัว
          hero: {
            type: "image",
            url: datamember[0].MEMBERSHIP_IMGE,
            margin: "sm",
            align: "center",
            gravity: "center",
            size: "xxl",
            aspectMode: "fit"
            // url: "https://firebasestorage.googleapis.com/v0/b/market01.appspot.com/o/02.jpg?alt=media&token=58914bc4-135b-4f36-889a-f5406af61116",
            // size: "full",
            // aspectRatio: "1.91:1",
            // aspectMode: "cover",
            // backgroundColor: "#FBE4E0FF"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [{
                type: "text",
                text: "**กรุณาตรวจสอบข้อมูลของท่านให้ถูกต้อง และบันทึกข้อมูล หากข้อมูลของท่านผิดพลาดให้ติดต่อเจ้าหน้าที่**",
                size: "xs",
                color: "#F70000FF",
                align: "start",
                gravity: "center",
                margin: "xs",
                wrap: true
              },
              {
                type: "separator",
                margin: "sm",
                color: "#E63946"
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "ชื่อ:",
                    weight: "bold",
                    color: "#B00439FF",
                    flex: 2
                  },
                  {
                    type: "text",
                    // text: "กาญจนา เก่งกาจ kkkkkkkkkkkkk",
                    text: datamember[0].name1,
                    color: "#DD2D43",
                    flex: 13
                  }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "วันเกิด:",
                    weight: "bold",
                    color: "#B00439FF"
                  },
                  {
                    type: "text",
                    //text: "28 กรกฎาคม 2541",
                    text: moment(datamember[0].MEMBERSHIP_BIRTH).tz('Asia/Bangkok').format("DD/MM/") + (parseInt(moment(datamember[0].MEMBERSHIP_BIRTH).format("YYYY")) + 543) + ' (' + age + 'ปี)',
                    color: "#DD2D43",
                    flex: 3
                  }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "เลขสมุดบัญชี:",
                    weight: "bold",
                    flex: 3,
                    color: "#B00439FF"
                  },
                  {
                    type: "text",
                    // text: "1234567890123",
                    text: datamember[0].MEMBERSHIP_ID,
                    color: "#DD2D43",
                    flex: 4,
                    wrap: true
                  }
                ]
              },
              {
                type: "box",
                layout: "horizontal",
                spacing: "md",
                contents: [{
                    type: "text",
                    text: "ที่อยู่:",
                    weight: "bold",
                    color: "#B00439FF"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    flex: 5,
                    contents: [{
                      type: "text",
                      // text: "22 หมู่ 11 ต.ป่าไผ่ อ.สันทราย จ.เชียงใหม่ 50210",
                      text: datamember[0].address,
                      color: "#DD2D43",
                      wrap: true
                    }]
                  }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "เบอร์โทรศัพท์:",
                    weight: "bold",
                    size: "md",
                    color: "#B00439FF",
                    flex: 2
                  },
                  {
                    type: "text",
                    // text: "0826257548",
                    text: datamember[0].MEMBERSHIP_TELEPHONE,
                    size: "md",
                    color: "#DD2D43",
                    flex: 3
                  }
                ]
              },
              {
                type: "separator",
                margin: "sm",
                color: "#E63946"
              },
              {
                type: "text",
                text: "ผู้รับผลประโยชน์",
                weight: "bold",
                size: "lg",
                color: "#F45866"
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "ชื่อ:",
                    weight: "bold",
                    size: "md",
                    color: "#B00439FF",
                    flex: 2
                  },
                  {
                    type: "text",
                    // text: "กฤตย์ จีรพัฒนานุวงศ์",
                    text: datamember[0].name2,
                    color: "#DD2D43",
                    flex: 13
                  }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "ความสัมพันธ์:",
                    weight: "bold",
                    color: "#B00439FF",
                    flex: 2
                  },
                  {
                    type: "text",
                    // text: "สามี",
                    text: datamember[0].CONTACTPERSONS_RELATIONSHIP,
                    color: "#DD2D43",
                    flex: 3
                  }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "เบอร์โทรศัพท์:",
                    weight: "bold",
                    size: "md",
                    color: "#B00439FF",
                    flex: 2
                  },
                  {
                    type: "text",
                    // text: "0827648686",
                    text: datamember[0].CONTACTPERSONS_TELEPHONE,
                    size: "md",
                    color: "#DD2D43",
                    flex: 3
                  }
                ]
              },
              {
                type: "separator",
                margin: "md",
                color: "#E63946"
              },
              {
                type: "box",
                layout: "baseline",
                contents: [{
                    type: "text",
                    text: "สาขา:",
                    weight: "bold",
                    size: "md",
                    color: "#B00439FF",
                    flex: 5,
                    align: "start",
                    gravity: "center"
                  },
                  {
                    type: "text",
                    // text: "ลูกชิ้นแคระ คุณกาตุ้ย",
                    text: datamember[0].timebank,
                    size: "md",
                    color: "#DD2D43",
                    flex: 19,
                    align: "start",
                    gravity: "center",
                    wrap: true
                  }
                ]
              }
            ]
          }
        }
      });
    } else if (eventText == 'กิจกรรมของฉัน') {
      return client.replyMessage(event.replyToken, {
        type: "flex",
        altText: "Flex Message",
        contents: {
          type: "carousel",
          contents: [{
              type: "bubble",
              hero: {
                type: "image",
                url: "https://firebasestorage.googleapis.com/v0/b/market01.appspot.com/o/%E0%B8%82%E0%B8%AD%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B7%E0%B8%AD.jpg?alt=media&token=336534a5-73d0-49a9-8bc6-1bff1856a01f",
                align: "center",
                size: "full",
                aspectRatio: "1.91:1",
                aspectMode: "cover",
                backgroundColor: "#FFFFFF"
              },
              footer: {
                type: "box",
                layout: "vertical",
                flex: 0,
                spacing: "sm",
                contents: [{
                  type: "button",
                  action: {
                    type: "uri",
                    label: "สร้างกิจกรรม",
                    uri: "https://liff.line.me/1654799307-oE5d1bLb"
                  },
                  color: "#EF476F",
                  margin: "xxl",
                  height: "md",
                  style: "primary",
                  gravity: "center"
                }]
              }
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://firebasestorage.googleapis.com/v0/b/market01.appspot.com/o/123807341_3546168112132154_9218617613140759514_n.png?alt=media&token=e2f4a034-9fad-464a-8922-6b09301db925",
                align: "center",
                size: "full",
                aspectRatio: "1.91:1",
                aspectMode: "cover",
                backgroundColor: "#FFFFFF"
              },
              footer: {
                type: "box",
                layout: "vertical",
                flex: 0,
                spacing: "sm",
                contents: [{
                  type: "button",
                  action: {
                    type: "uri",
                    label: "กิจกรรมของฉัน",
                    uri: "https://liff.line.me/1654799307-Zad09vLv"
                  },
                  color: "#EF476F",
                  margin: "xxl",
                  height: "md",
                  style: "primary",
                  gravity: "center"
                }]
              }
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://firebasestorage.googleapis.com/v0/b/market01.appspot.com/o/123609066_284250109492880_7365691952091472851_n.png?alt=media&token=52d03f04-0b3f-4980-a139-cb20d1835b33",
                align: "center",
                size: "full",
                aspectRatio: "1.91:1",
                aspectMode: "cover",
                backgroundColor: "#FFFFFF"
              },
              footer: {
                type: "box",
                layout: "vertical",
                flex: 0,
                spacing: "sm",
                contents: [{
                  type: "button",
                  action: {
                    type: "uri",
                    label: "กิจกรรมที่เข้าร่วม",
                    uri: "https://liff.line.me/1654799307-GgzVw5B5"
                  },
                  color: "#EF476F",
                  margin: "xxl",
                  height: "md",
                  style: "primary",
                  gravity: "center"
                }]
              }
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://firebasestorage.googleapis.com/v0/b/market01.appspot.com/o/%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%AD%E0%B8%B2%E0%B8%AA%E0%B8%B2.jpg?alt=media&token=91d9d970-b444-4987-959c-a26486e5ad07",
                align: "center",
                size: "full",
                aspectRatio: "1.91:1",
                aspectMode: "cover",
                backgroundColor: "#FFFFFF"
              },
              footer: {
                type: "box",
                layout: "vertical",
                flex: 0,
                spacing: "sm",
                contents: [{
                  type: "button",
                  action: {
                    type: "uri",
                    label: "กิจกรรมจิตอาสา",
                    uri: "https://liff.line.me/1654799307-4Qn0EAOA"
                  },
                  color: "#EF476F",
                  margin: "xxl",
                  height: "md",
                  style: "primary",
                  gravity: "center"
                }]
              }
            }
          ]
        }
      });
    } 
  }
}

module.exports = {
  handleEvent
};