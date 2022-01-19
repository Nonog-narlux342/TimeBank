const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const line = require("@line/bot-sdk");
const request = require("request");
var moment = require('moment'); // require

require("dotenv").config();

const port = 80;
const app = express();
//line
const config = {
  channelAccessToken: "okZZuOSBQTFplbIhwATPYZoPywVjY2tS150O8q6Km9/QYjD8ag1lnDAgzQZyimjbP68KfxXSPuqqM0me36G/+QqOeXw8ptF4XEf3CwswL68FB/yt/bbGz5A0OdxVRKVGBpMk+TQ5vBrCabi3QFDnRAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "4fdf875a533ba40d626924b7794775ce"
};

const {
  query_command
} = require("./utilities/query_command")

const {
  handleEvent
} = require('./utilities/line')

const client = new line.Client(config);

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html");
});


app.use(bodyparser.json());
// var path = require("path");
var path = require("path");

const cors = require('cors');
const {
  log,
  count
} = require('console');
const {
  type
} = require('os');
app.use(
  cors(),
  bodyparser.json(),
  bodyparser.urlencoded({
    extended: true
  })
);



//console.log("Server started...");
var mysqlConnection = mysql.createConnection({
  host: '128.199.214.155',
  user: 'timebank_dev',
  port: '3306',
  password: 'timebank@2021',
  database: 'TIMEBANK',
  multipleStatements: true
});

// app.post('/webhook', (req, res) => res.sendStatus(200))
app.post("/webhook", (req, res) => {
  //console.log(req.body.events);
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

// function handleEvent(event) {
//   //console.log(event);
//   if (event.type === "message" && event.message.type === "text") {
//     handleMessageEvent(event);
//   } else {
//     return Promise.resolve(null);
//   }
// }
//login
app.post('/login', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var query = await query_command(`SELECT * FROM ADMIN 
  JOIN MEMBERSHIP ON MEMBERSHIP.ADMIN_ID = ADMIN.ADMIN_ID
  WHERE ADMIN_USER ='${body.ADMIN_USER}' AND ADMIN_PASSWORD ='${body.ADMIN_PASSWORD}'`)
  //console.log(query)
  res.send(query)
});

app.post('/selectbank', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var query = await query_command(`SELECT * FROM BANK`)
  console.log(query)
  res.send(query)
});

//สมัครadmin
app.post('/insertAdmin', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  mysqlConnection.query(`insert into ADMIN (ADMIN_USER,ADMIN_PASSWORD) 
              values ('${body.ADMIN_USER}','${body.ADMIN_PASSWORD}') `, (err, rows, fields) => {
    if (!err) {
      //console.log(rows)
      res.send(rows);

    } else {
      //console.log(err);
    }
  })
});



//สมัครสมาชิก
app.post('/insertMembership', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT * FROM LOCATION_CODE where ZIPCODE ='${body.ZIPCODE}' AND PROVINCE='${body.PROVINCE}' AND DISTRICT='${body.DISTRICT}' AND SUBDISTRIC='${body.SUBDISTRIC}'`)
  //console.log(query);
  // //console.log(body);

  var query_admin = await query_command(`insert into ADMIN (ADMIN_USER,ADMIN_PASSWORD) 
  values ('${body.ADMIN_USER}','${body.ADMIN_PASSWORD}')`)
  // console.log(query_admin);
  var select_admin = await query_command(`SELECT ADMIN_ID FROM ADMIN WHERE ADMIN_USER = '${body.ADMIN_USER}' AND ADMIN_PASSWORD = '${body.ADMIN_PASSWORD}'`)
  console.log(select_admin[0].ADMIN_ID);
  var addpoint = await query_command(`SELECT bewCo(${query[0].ZIPCODE}) as me `)
  //console.log(addpoint[0].me);
  if (body.MEMBERSHIP_TYPE == 'Admin') {
    var query2 = await query_command(`insert into MEMBERSHIP(MEMBERSHIP_ID,MEMBERSHIP_FIRFENAME,MEMBERSHIP_LASTNAME,MEMBERSHIP_BIRTH,MEMBERSHIP_EDUCATION,MEMBERSHIP_EXPERIENCE,MEMBERSHIP_TYPE,MEMBERSHIP_ADDRESS,LOCATION_CODE,MEMBERSHIP_TELEPHONE,CONTACTPERSONS_FIRFENAME,CONTACTPERSONS_LASTNAME,CONTACTPERSONS_TELEPHONE,CONTACTPERSONS_RELATIONSHIP,MEMBERSHIP_REQUIREMENTS,MEMBERSHIP_EXPECTATION,MEMBERSHIP_IMGE,TIME_BANK,ADMIN_ID)
  values('${addpoint[0].me}','${body.MEMBERSHIP_FIRFENAME}','${body.MEMBERSHIP_LASTNAME}','${body.MEMBERSHIP_BIRTH}','${body.MEMBERSHIP_EDUCATION}','${body.MEMBERSHIP_EXPERIENCE}','${body.MEMBERSHIP_TYPE}','${body.MEMBERSHIP_ADDRESS}','${query[0].LOCATION_CODE}','${body.MEMBERSHIP_TELEPHONE}','${body.CONTACTPERSONS_FIRFENAME}','${body.CONTACTPERSONS_LASTNAME}','${body.CONTACTPERSONS_TELEPHONE}','${body.CONTACTPERSONS_RELATIONSHIP}','${body.MEMBERSHIP_REQUIREMENTS}','${body.MEMBERSHIP_EXPECTATION}','${body.MEMBERSHIP_IMGE}','${body.TIME_BANK}','${select_admin[0].ADMIN_ID}')`)
  } else {
    var query2 = await query_command(`insert into MEMBERSHIP(MEMBERSHIP_ID,MEMBERSHIP_FIRFENAME,MEMBERSHIP_LASTNAME,MEMBERSHIP_BIRTH,MEMBERSHIP_EDUCATION,MEMBERSHIP_EXPERIENCE,MEMBERSHIP_TYPE,MEMBERSHIP_ADDRESS,LOCATION_CODE,MEMBERSHIP_TELEPHONE,CONTACTPERSONS_FIRFENAME,CONTACTPERSONS_LASTNAME,CONTACTPERSONS_TELEPHONE,CONTACTPERSONS_RELATIONSHIP,MEMBERSHIP_REQUIREMENTS,MEMBERSHIP_EXPECTATION,MEMBERSHIP_IMGE,TIME_BANK)
  values('${addpoint[0].me}','${body.MEMBERSHIP_FIRFENAME}','${body.MEMBERSHIP_LASTNAME}','${body.MEMBERSHIP_BIRTH}','${body.MEMBERSHIP_EDUCATION}','${body.MEMBERSHIP_EXPERIENCE}','${body.MEMBERSHIP_TYPE}','${body.MEMBERSHIP_ADDRESS}','${query[0].LOCATION_CODE}','${body.MEMBERSHIP_TELEPHONE}','${body.CONTACTPERSONS_FIRFENAME}','${body.CONTACTPERSONS_LASTNAME}','${body.CONTACTPERSONS_TELEPHONE}','${body.CONTACTPERSONS_RELATIONSHIP}','${body.MEMBERSHIP_REQUIREMENTS}','${body.MEMBERSHIP_EXPECTATION}','${body.MEMBERSHIP_IMGE}','${body.TIME_BANK}')`)
  }


  var query_point = await query_command(`INSERT INTO TRANSACTIONS(
    MEMBERSHIP_ID,
    ACTIVITY_ID,
    TRANSACTIONS_POINT
  ) 
  values('${addpoint[0].me}','111','${body.TRANSACTIONS_POINT}')`)
  //console.log(query_point);

  // //console.log(query2);
  res.send(addpoint)
});

app.post('/insertDate', async (req, res) => {
  const {
    body
  } = req;

  var query = await query_command(`insert into DATE (SERVICE_DATE,SERVICE_TIME_OPEN,SERVICE_TIME_OFF,MEMBERSHIP_ID) 
  values ('${body.SERVICE_DATE}','${body.SERVICE_TIME_OPEN}','${body.SERVICE_TIME_OFF}',${body.MEMBERSHIP_ID})`);

  res.send(query)
});

app.post('/dayservice', async (req, res) => {
  const {
    body
  } = req;

  var query = await query_command(`SELECT * FROM DATE
  WHERE MEMBERSHIP_ID = '${body.MEMBERSHIP_ID}'`);

  res.send(query)
});

app.post('/delateDATEID', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var query = await query_command(`DELETE FROM DATE
  WHERE DATE_ID='${body.DATE_ID}';`);
  ////console.log(query)
  res.send(query)
});

app.post('/insertSkill', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var query = await query_command(`insert into SKILL (MEMBERSHIP_ID,SKILL_NAME) 
   values ('${body.MEMBERSHIP_ID}','${body.SKILL_NAME}')`);
  //console.log(query);
  res.send(query)
});

app.post('/selectmemcid', async (req, res) => {
  const {
    body
  } = req;

  var query = await query_command(`SELECT * FROM MEMBERSHIP
  WHERE MEMBERSHIP_ID = '${body.MEMBERSHIP_ID}'`);

  res.send(query)
});


//สร้างกิจกรรม
app.post('/insertActivity', async (req, res) => {
  const {
    body
  } = req;
  if (body.ACTIVITY_TIME == 'ช่วงเช้า') {
    var query = await query_command(`insert into ACTIVITY (ACTIVITY_NAME,ACTIVITY_TELEPHONE,ACTIVITY_ADDRESS,ACTIVITY_SUBDISTRIC,ACTIVITY_DISTRICT,ACTIVITY_PROVINCE,ACTIVITY_ZIPCODE,ACTIVITY_COUNT,ACTIVITY_SEX,ACTIVITY_DAY,ACTIVITY_TIME,ACTIVITY_DETAILS,MEMBERSHIP_ID,ACTIVITY_POINT,ACTIVITY_IMG,APPPOINTMENT_TIME,ACTIVE,ACTIVITY_EQUIPMENT) 
              values ('${body.ACTIVITY_NAME}','${body.ACTIVITY_TELEPHONE}','${body.ACTIVITY_ADDRESS}','${body.ACTIVITY_SUBDISTRIC}','${body.ACTIVITY_DISTRICT}','${body.ACTIVITY_PROVINCE}','${body.ACTIVITY_ZIPCODE}','${body.ACTIVITY_COUNT}','${body.ACTIVITY_SEX}','${body.ACTIVITY_DAY}','${body.ACTIVITY_TIME}','${body.ACTIVITY_DETAILS}','${body.MEMBERSHIP_ID}','1','${body.ACTIVITY_IMG}','${body.APPPOINTMENT_TIME}','${body.ACTIVE}','${body.ACTIVITY_EQUIPMENT}')`)
  } else if (body.ACTIVITY_TIME == 'ช่วงเย็น') {
    var query = await query_command(`insert into ACTIVITY (ACTIVITY_NAME,ACTIVITY_TELEPHONE,ACTIVITY_ADDRESS,ACTIVITY_SUBDISTRIC,ACTIVITY_DISTRICT,ACTIVITY_PROVINCE,ACTIVITY_ZIPCODE,ACTIVITY_COUNT,ACTIVITY_SEX,ACTIVITY_DAY,ACTIVITY_TIME,ACTIVITY_DETAILS,MEMBERSHIP_ID,ACTIVITY_POINT,ACTIVITY_IMG,APPPOINTMENT_TIME,ACTIVE,ACTIVITY_EQUIPMENT) 
              values ('${body.ACTIVITY_NAME}','${body.ACTIVITY_TELEPHONE}','${body.ACTIVITY_ADDRESS}','${body.ACTIVITY_SUBDISTRIC}','${body.ACTIVITY_DISTRICT}','${body.ACTIVITY_PROVINCE}','${body.ACTIVITY_ZIPCODE}','${body.ACTIVITY_COUNT}','${body.ACTIVITY_SEX}','${body.ACTIVITY_DAY}','${body.ACTIVITY_TIME}','${body.ACTIVITY_DETAILS}','${body.MEMBERSHIP_ID}','1','${body.ACTIVITY_IMG}','${body.APPPOINTMENT_TIME}','${body.ACTIVE}','${body.ACTIVITY_EQUIPMENT}')`)
  } else if (body.ACTIVITY_TIME == 'ทั้งวัน') {
    var query = await query_command(`insert into ACTIVITY (ACTIVITY_NAME,ACTIVITY_TELEPHONE,ACTIVITY_ADDRESS,ACTIVITY_SUBDISTRIC,ACTIVITY_DISTRICT,ACTIVITY_PROVINCE,ACTIVITY_ZIPCODE,ACTIVITY_COUNT,ACTIVITY_SEX,ACTIVITY_DAY,ACTIVITY_TIME,ACTIVITY_DETAILS,MEMBERSHIP_ID,ACTIVITY_POINT,ACTIVITY_IMG,APPPOINTMENT_TIME,ACTIVE,ACTIVITY_EQUIPMENT) 
              values ('${body.ACTIVITY_NAME}','${body.ACTIVITY_TELEPHONE}','${body.ACTIVITY_ADDRESS}','${body.ACTIVITY_SUBDISTRIC}','${body.ACTIVITY_DISTRICT}','${body.ACTIVITY_PROVINCE}','${body.ACTIVITY_ZIPCODE}','${body.ACTIVITY_COUNT}','${body.ACTIVITY_SEX}','${body.ACTIVITY_DAY}','${body.ACTIVITY_TIME}','${body.ACTIVITY_DETAILS}','${body.MEMBERSHIP_ID}','2','${body.ACTIVITY_IMG}','${body.APPPOINTMENT_TIME}','${body.ACTIVE}','${body.ACTIVITY_EQUIPMENT}')`)
  } else {
    var query = await query_command(`insert into ACTIVITY (ACTIVITY_NAME,ACTIVITY_TELEPHONE,ACTIVITY_ADDRESS,ACTIVITY_SUBDISTRIC,ACTIVITY_DISTRICT,ACTIVITY_PROVINCE,ACTIVITY_ZIPCODE,ACTIVITY_COUNT,ACTIVITY_SEX,ACTIVITY_DAY,ACTIVITY_TIME,ACTIVITY_DETAILS,MEMBERSHIP_ID,ACTIVITY_POINT,ACTIVITY_IMG,APPPOINTMENT_TIME,ACTIVE,ACTIVITY_EQUIPMENT) 
              values ('${body.ACTIVITY_NAME}','${body.ACTIVITY_TELEPHONE}','${body.ACTIVITY_ADDRESS}','${body.ACTIVITY_SUBDISTRIC}','${body.ACTIVITY_DISTRICT}','${body.ACTIVITY_PROVINCE}','${body.ACTIVITY_ZIPCODE}','${body.ACTIVITY_COUNT}','${body.ACTIVITY_SEX}','${body.ACTIVITY_DAY}','${body.ACTIVITY_TIME}','${body.ACTIVITY_DETAILS}','${body.MEMBERSHIP_ID}','${body.ACTIVITY_TIME}','${body.ACTIVITY_IMG}','${body.APPPOINTMENT_TIME}','${body.ACTIVE}','${body.ACTIVITY_EQUIPMENT}')`)
  }
  //console.log(query);
  res.send(query)
});
//ตาราง admin
app.post('/MEMBERSHIP', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT * ,CONCAT(s.MEMBERSHIP_FIRFENAME," ",s.MEMBERSHIP_LASTNAME)AS name 
  ,CONCAT(s.CONTACTPERSONS_FIRFENAME," ",s.CONTACTPERSONS_LASTNAME)AS namema 
  , s.MEMBERSHIP_ID, s.MEMBERSHIP_FIRFENAME, s.MEMBERSHIP_LASTNAME ,
 CASE
  WHEN s.TIME_BANK = '1' THEN 'ออมเวลาปันด้วยใจ ให้ด้วยรัก'
  WHEN s.TIME_BANK = '2' THEN 'รวมพลังใจรัก ตำบลต้นเปา'
  WHEN s.TIME_BANK = '3' THEN 'รวมใจรัก ตำบลยางคราม'
  WHEN s.TIME_BANK = '4' THEN 'ตำบลป่าตุ้ม'
  WHEN s.TIME_BANK = '5' THEN 'บ้านสันละลึก'
  WHEN s.TIME_BANK = '6' THEN 'บ้านห้วยโป่ง'
  WHEN s.TIME_BANK = '7' THEN 'ตำบลแม่แฝกใหม่'
  WHEN s.TIME_BANK = '8' THEN 'ฮอมใจ๋ ใส่เวลา อำเภอเวียงแหง'
  WHEN s.TIME_BANK = '9' THEN 'บ้านกู่ฮ้อสามัคคี'
  ELSE 'ไม่มี'
  END AS timebank

FROM MEMBERSHIP s 
  JOIN LOCATION_CODE ON s.LOCATION_CODE = LOCATION_CODE.LOCATION_CODE
WHERE s.TIME_BANK = "${body.TIME_BANK}"
  `);

  res.send(query)
});

//โชร์ข้อมูลผู้ใช้หน้าadmin
app.post('/MEMBERSHIPdata', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT * ,CONCAT(s.MEMBERSHIP_FIRFENAME," ",s.MEMBERSHIP_LASTNAME)AS name 
  ,CONCAT(s.CONTACTPERSONS_FIRFENAME," ",s.CONTACTPERSONS_LASTNAME)AS namema ,
  CONCAT(  DATE_FORMAT( ACTIVITY_DAY , '%d' ), '/', DATE_FORMAT( ACTIVITY_DAY , '%m' ) , '/',DATE_FORMAT( ACTIVITY_DAY , '%Y' ) +543 ) AS ThaiDate
  , s.MEMBERSHIP_ID, s.MEMBERSHIP_FIRFENAME, s.MEMBERSHIP_LASTNAME, sd.ACTIVITY_DAY , ACTIVITY_POINT ,
 CASE
  WHEN s.TIME_BANK = '1' THEN 'ออมเวลาปันด้วยใจ ให้ด้วยรัก'
  WHEN s.TIME_BANK = '2' THEN 'รวมพลังใจรัก ตำบลต้นเปา'
  WHEN s.TIME_BANK = '3' THEN 'รวมใจรัก ตำบลยางคราม'
  WHEN s.TIME_BANK = '4' THEN 'ตำบลป่าตุ้ม'
  WHEN s.TIME_BANK = '5' THEN 'บ้านสันละลึก'
  WHEN s.TIME_BANK = '6' THEN 'บ้านห้วยโป่ง'
  WHEN s.TIME_BANK = '7' THEN 'ตำบลแม่แฝกใหม่'
  WHEN s.TIME_BANK = '8' THEN 'ฮอมใจ๋ ใส่เวลา อำเภอเวียงแหง'
  WHEN s.TIME_BANK = '9' THEN 'บ้านกู่ฮ้อสามัคคี'
  ELSE 'ไม่มี'
  END AS timebank

FROM MEMBERSHIP s 
  LEFT OUTER JOIN ACTIVITY sd ON s.MEMBERSHIP_ID=sd.MEMBERSHIP_ID
  AND sd.ACTIVITY_DAY = (SELECT MAX(ACTIVITY_DAY) FROM ACTIVITY 
  WHERE MEMBERSHIP_ID=sd.MEMBERSHIP_ID)  
  JOIN LOCATION_CODE ON s.LOCATION_CODE = LOCATION_CODE.LOCATION_CODE
WHERE s.TIME_BANK = "${body.TIME_BANK}"
  `);

  res.send(query)
});

//ขึ้นโทรศัทพ์เปลี่ยน '${body.USERID}'
app.post('/CHECKUSER', async (req, res) => {
  const {
    body
  } = req;
  // //console.log("userid : " + body.USERID);
  //console.log(body);
  var query = await query_command(`SELECT
	*,
	CONCAT(
		MEMBERSHIP.MEMBERSHIP_FIRFENAME,
		" ",
		MEMBERSHIP.MEMBERSHIP_LASTNAME
	) AS NAME,
	CONCAT(
		MEMBERSHIP.CONTACTPERSONS_FIRFENAME,
		" ",
		MEMBERSHIP.CONTACTPERSONS_LASTNAME
	) AS namema
, CASE
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
  ,
  CONCAT(  DATE_FORMAT( MEMBERSHIP_BIRTH , '%d' ), '/', DATE_FORMAT( MEMBERSHIP_BIRTH , '%m' ) , '/',DATE_FORMAT( MEMBERSHIP_BIRTH , '%Y' ) +543 ) AS ThaiDate
FROM
	MEMBERSHIP
WHERE
  USERID = '${body.USERID}'`);
  //console.log(query);
  res.send(query)
});
//โชร์กิจกรรม
app.post('/ACTIVITY', async (req, res) => {
  const {
    body
  } = req;
  var user = await query_command(`SELECT
	TIME_BANK FROM MEMBERSHIP WHERE USERID = '${body.USERID}'`);
  //console.log(user[0].TIME_BANK)
  var query = await query_command(`SELECT
	*, CONCAT(
		MEMBERSHIP.MEMBERSHIP_FIRFENAME,
		" ",
		MEMBERSHIP.MEMBERSHIP_LASTNAME
	) AS NAME,
	CONCAT(
		DATE_FORMAT(ACTIVITY_DAY, '%d'),
		'-',
		DATE_FORMAT(ACTIVITY_DAY, '%m'),
		'-',
		DATE_FORMAT(ACTIVITY_DAY, '%Y') + 543
	) AS ACTIVITY_DAY
FROM
	ACTIVITY ACT
JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = ACT.MEMBERSHIP_ID 
WHERE
	ACTIVITY_SHOW = '1' AND TIME_BANK = '${user[0].TIME_BANK}'
AND ACTIVITY_COUNT > (
	SELECT
		COUNT(*) countmember
	FROM
		JOINACTIVITY
	WHERE
		ACTIVE = '1'
	AND ACTIVITY_ID = ACT.ACTIVITY_ID
)`);
  res.send(query)
});

app.post('/QRcode', async (req, res) => {
  const {
    body
  } = req;
  // เปลี่ยน CID เป็น MEMBERSHIP_ID
  var query = await query_command(`SELECT * FROM MEMBERSHIP WHERE MEMBERSHIP_CID='${body.MEMBERSHIP_CID}'`);
  res.send(query)
});

app.post('/search', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT * FROM MEMBERSHIP 
  WHERE MEMBERSHIP_ID LIKE '${body.search}'`);
  res.send(query)
});

app.post('/MEMBERSHIPsearch', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT * FROM MEMBERSHIP `);
  res.send(query)
});

// function handleEvent(event) {
//   //console.log(event);
//   if (event.type === "message" && event.message.type === "text") {
//     handleMessageEvent(event);
//   } else {
//     return Promise.resolve(null);
//   }
// }

app.listen(port);

//อัพเดทแก้ไขข้อมูลผู้ใช้ หน้า admin
app.post('/updatemember', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body.MEMBERSHIP_BIRTH);
  var query = await query_command(`SELECT * FROM LOCATION_CODE where ZIPCODE ='${body.ZIPCODE}' AND PROVINCE='${body.PROVINCE}' AND DISTRICT='${body.DISTRICT}' AND SUBDISTRIC='${body.SUBDISTRIC}'`)
  // //console.log(query[0].LOCATION_CODE);
  // //console.log(body);
  var query2 = await query_command(`UPDATE MEMBERSHIP
  SET MEMBERSHIP_FIRFENAME = '${body.MEMBERSHIP_FIRFENAME}'
  ,MEMBERSHIP_LASTNAME = '${body.MEMBERSHIP_LASTNAME}'
  ,MEMBERSHIP_BIRTH = '${body.MEMBERSHIP_BIRTH}'
  ,MEMBERSHIP_EDUCATION = '${body.MEMBERSHIP_EDUCATION}'
  ,MEMBERSHIP_EXPERIENCE = '${body.MEMBERSHIP_EXPERIENCE}'
  ,MEMBERSHIP_TELEPHONE  = '${body.MEMBERSHIP_TELEPHONE}'
  ,MEMBERSHIP_ADDRESS = '${body.MEMBERSHIP_ADDRESS}'
  ,LOCATION_CODE = '${query[0].LOCATION_CODE}'
  ,CONTACTPERSONS_FIRFENAME = '${body.CONTACTPERSONS_FIRFENAME}'
  ,CONTACTPERSONS_LASTNAME = '${body.CONTACTPERSONS_LASTNAME}'
  ,CONTACTPERSONS_TELEPHONE = '${body.CONTACTPERSONS_TELEPHONE}'
  ,CONTACTPERSONS_RELATIONSHIP = '${body.CONTACTPERSONS_RELATIONSHIP}'
  ,MEMBERSHIP_REQUIREMENTS = '${body.MEMBERSHIP_REQUIREMENTS}'
  ,MEMBERSHIP_EXPECTATION = '${body.MEMBERSHIP_EXPECTATION}'
  ,MEMBERSHIP_IMGE = '${body.MEMBERSHIP_IMGE}'
  ,ACTIVEMEMBER = '${body.ACTIVEMEMBER}'
  WHERE MEMBERSHIP_ID='${body.MEMBERSHIP_ID}'`);
  //console.log(query2)
  res.send(query2)
});

app.post('/updateactivity', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body.ACTIVITY_DAY);
  var query2 = await query_command(`UPDATE ACTIVITY
  SET  ACTIVITY_NAME = '${body.ACTIVITY_NAME}'
  ,ACTIVITY_DAY = '${body.ACTIVITY_DAY}'
  ,ACTIVITY_TIME = '${body.ACTIVITY_TIME}'
  ,APPPOINTMENT_TIME = '${body.APPPOINTMENT_TIME}'
  ,ACTIVITY_COUNT = '${body.ACTIVITY_COUNT}'
  ,ACTIVITY_SEX = '${body.ACTIVITY_SEX}'
  ,ACTIVITY_DETAILS = '${body.ACTIVITY_DETAILS}'
  ,ACTIVITY_TELEPHONE = '${body.ACTIVITY_TELEPHONE}'
  WHERE ACTIVITY_ID='${body.ACTIVITY_ID}'`);
  //console.log(query2)

  res.send(query2)
});

app.post('/delateactivity', async (req, res) => {
  const {
    body
  } = req;
  var query2 = await query_command(`UPDATE ACTIVITY SET ACTIVE = '0' , ACTIVITY_SHOW = '0' WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}'`);

  var queryuser = await query_command(`UPDATE JOINACTIVITY SET ACTIVE = '0' WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}'`)
  //console.log(query2)
  res.send(query2)
});
//เข้าร่วมกิจกรรมของผู้ใช้
app.post('/joinatc', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT MEMBERSHIP_ID FROM MEMBERSHIP WHERE USERID = '${body.USERID}'`)
  var query2 = await query_command(`INSERT INTO JOINACTIVITY(MEMBERSHIP_ID,ACTIVITY_ID)
  VALUES ('${query[0].MEMBERSHIP_ID}','${body.ACTIVITY_ID}')`)
  //console.log(query2)
  res.send(query2)
});

//เช็คคนเข้าร่วม
app.post('/checkuseractivity', async (req, res) => {
  const {
    body
  } = req;
  var check = await query_command(`SELECT * FROM MEMBERSHIP
  JOIN JOINACTIVITY ON MEMBERSHIP.MEMBERSHIP_ID = JOINACTIVITY.MEMBERSHIP_ID
  WHERE USERID = '${body.USERID}' AND ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE = '1'`)
  //console.log(check);
  res.send(check)
});
// p'b รวม query
app.post('/new-activity-query', async (req, res) => {
  const {
    body
  } = req;
  var sum = await query_command(`
  SELECT IF ( (SELECT EXISTS ( SELECT JOINACTIVITY_ID FROM JOINACTIVITY WHERE ACTIVE = '1' AND ACTIVITY_ID = f.ACTIVITY_ID )) = 1,( SELECT COUNT(*) FROM JOINACTIVITY WHERE ACTIVE = '1' AND ACTIVITY_ID = f.ACTIVITY_ID ),0 ) sumactivity ,f.*
  FROM(
  SELECT
    CONCAT( MEMBERSHIP.MEMBERSHIP_FIRFENAME, " ", MEMBERSHIP.MEMBERSHIP_LASTNAME ) AS NAME,
    CONCAT( DATE_FORMAT( ACTIVITY_DAY, '%d' ), '-', DATE_FORMAT( ACTIVITY_DAY, '%m' ), '-', DATE_FORMAT( ACTIVITY_DAY, '%Y' ) + 543 ) AS ACTIVITY_DAY,
    MEMBERSHIP.ACTIVEMEMBER,
    MEMBERSHIP.USERID,
    ACT.ACTIVITY_ID,
    ACT.ACTIVITY_IMG,
    ACT.ACTIVITY_NAME,
    -- ACT.MEMBERSHIP_FIRFENAME,
    -- ACT.MEMBERSHIP_LASTNAME,
    ACT.ACTIVITY_ADDRESS,
    ACT.ACTIVITY_SUBDISTRIC,
    ACT.ACTIVITY_TELEPHONE,
    ACT.ACTIVITY_DETAILS,
  -- 	ACT.ACTIVITY_DAY,
    ACT.ACTIVITY_SEX,
    ACT.ACTIVITY_TIME,
    ACT.APPPOINTMENT_TIME,
    ACT.ACTIVITY_COUNT
    -- ACT.sumactivity,
    
  FROM
    ACTIVITY ACT
    JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = ACT.MEMBERSHIP_ID 
  WHERE
    ACTIVITY_SHOW = '1' 
    AND TIME_BANK = ( SELECT TIME_BANK FROM MEMBERSHIP WHERE USERID = '${body.USERID}' ) 
    AND ACTIVITY_COUNT > (
    SELECT
      COUNT(*) countmember 
    FROM
      JOINACTIVITY 
    WHERE
      ACTIVE = '1' 
    AND ACTIVITY_ID = ACT.ACTIVITY_ID 
    )
    )f`)
  console.log(sum);
  res.send(sum)
});

//เช็คจำนวนคนเข้าร่วม
app.post('/checksumactivity', async (req, res) => {
  const {
    body
  } = req;
  var sum = await query_command(`SELECT * FROM JOINACTIVITY
    WHERE ACTIVE = '1' AND ACTIVITY_ID = '${body.ACTIVITY_ID}'`)
  //console.log(sum);
  res.send(sum)
});
//นำรูปเข้าไปเก็บไว้ในกิจกรรม
app.post('/upIMG', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT ACTIVITY_ID FROM ACTIVITY WHERE ACTIVITY_ID= '${body.ACTIVITY_ID}'`)
  // //console.log(body.ACTIVITY_ID);
  var query2 = await query_command(`INSERT INTO IMG_ACTIVITY(ACTIVITY_ID,IMG_NAME)
  VALUES ('${query[0].ACTIVITY_ID}','${body.url}')`)
  //console.log(query2)
  res.send(query2)
});
// DATE_FORMAT(ACTIVITY_DAY, '%d'),
// '-',
// DATE_FORMAT(ACTIVITY_DAY, '%m'),
// '-',
// DATE_FORMAT(ACTIVITY_DAY, '%Y')
app.post('/activityuser', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT
	*

FROM
	ACTIVITY
JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
WHERE
	USERID = '${body.USERID}'  AND ACTIVE = '1'
`)
  res.send(query)
});

app.post('/activityuser3', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT
	*, CONCAT(
		DATE_FORMAT(ACTIVITY_DAY, '%d'),
		'-',
		DATE_FORMAT(ACTIVITY_DAY, '%m'),
		'-',
		DATE_FORMAT(ACTIVITY_DAY, '%Y') + 543
	) AS ACTIVITY_DAY
FROM
	ACTIVITY
JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
WHERE
	USERID = '${body.USERID}'  AND ACTIVE = '3' AND ACTIVITY.ACTIVITY_NAME != 'โอน'
`)
  res.send(query)
});

app.post('/adminactivity', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var query = await query_command(`SELECT
	*, CONCAT(
		DATE_FORMAT(ACTIVITY_DAY, '%d'),
		'-',
		DATE_FORMAT(ACTIVITY_DAY, '%m'),
		'-',
		DATE_FORMAT(ACTIVITY_DAY, '%Y') + 543
	) AS ACTIVITY_DAY
FROM
	ACTIVITY
JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
WHERE
MEMBERSHIP.MEMBERSHIP_ID = '${body.MEMBERSHIP_ID}'  AND ACTIVE = '1'
`)
  //console.log(query);
  res.send(query)
});

//seleceshowconclude
app.post('/showmemconclude', async (req, res) => {
  const {
    body
  } = req;
  var showconclude = await query_command(`SELECT MEMBERSHIP_ID FROM MEMBERSHIP
  WHERE USERID = '${body.USERID}'`)
  //console.log(showconclude[0].MEMBERSHIP_ID);
  var showconclude1 = await query_command(`SELECT VOLUNTEER.*,CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME,' ',MEMBERSHIP.MEMBERSHIP_LASTNAME)as nameactivity,
  ACTIVITY_NAME,ACTIVITY_IMG,ACTIVITY_DAY
   FROM VOLUNTEER
  JOIN ACTIVITY ON VOLUNTEER.ACTIVITY_ID = ACTIVITY.ACTIVITY_ID
  JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
 
  WHERE VOLUNTEER.MEMBERSHIP_ID = '${showconclude[0].MEMBERSHIP_ID}'`)
  //console.log(showconclude1);
  res.send(showconclude1)
});


//'${body.USERID}'
app.post('/join', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT *,CONCAT(DATE_FORMAT(ACTIVITY_DAY, '%d'),'-', DATE_FORMAT( ACTIVITY_DAY , '%m' ) , '-',DATE_FORMAT( ACTIVITY_DAY , '%Y' )+543) AS DAYTHAI,
  MC.MEMBERSHIP_FIRFENAME AS memact , MC.MEMBERSHIP_LASTNAME AS lasact FROM JOINACTIVITY 
    JOIN ACTIVITY ON JOINACTIVITY.ACTIVITY_ID = ACTIVITY.ACTIVITY_ID
    JOIN MEMBERSHIP ON JOINACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
    INNER JOIN MEMBERSHIP MC ON MC.MEMBERSHIP_ID = ACTIVITY.MEMBERSHIP_ID
  WHERE MEMBERSHIP.USERID = '${body.USERID}' AND JOINACTIVITY.ACTIVE='1' AND ACTIVITY.ACTIVITY_NAME != 'โอน'
  ORDER BY ACTIVITY_DAY ASC
`)
  //   //console.log(query[0].ACTIVITY_ID);
  //     var query2 = await query_command(`SELECT *,MEMBERSHIP_FIRFENAME AS FIRSTname , MEMBERSHIP_LASTNAME AS LASTname FROM MEMBERSHIP
  // JOIN ACTIVITY ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
  // WHERE ACTIVITY.ACTIVITY_ID = '${query[0].ACTIVITY_ID}' `)
  res.send(query)
});

//โชร์กิจกรรมที่ผู้ใช้เข้าร่วม และยกเลิก
app.post('/joinactivity', async (req, res) => {
  const {
    body
  } = req;
  var query2 = await query_command(`UPDATE JOINACTIVITY
  SET ACTIVE = '${body.ACTIVE}'
  WHERE ACTIVITY_ID='${body.ACTIVITY_ID}'`);
  //console.log(query2)
  res.send(query2)
});

// หน้าอุมัติกิจกรรม${body.ACTIVITY_ID}
app.post('/PeruseACTIVITY', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT * FROM ACTIVITY 
  JOIN IMG_ACTIVITY ON IMG_ACTIVITY.ACTIVITY_ID = ACTIVITY.ACTIVITY_ID 
  WHERE IMG_ACTIVITY.ACTIVITY_ID = ${body.ACTIVITY_ID}`);
  //console.log(body.ACTIVITY_ID);
  res.send(query)
});

//สร้างกิจกรรมโอน //โอนแล้วจะโชร์คะแนนไปหน้าไลน์
app.post('/transfer', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  //ชื่อกิจกรรมโอน
  var query = await query_command(`SELECT * FROM ACTIVITY
  JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = ACTIVITY.MEMBERSHIP_ID WHERE ACTIVITY_ID ='1'`)
  // //console.log(query[0].ACTIVITY_NAME);
  //member id
  var query_userid = await query_command(`SELECT MEMBERSHIP_ID FROM MEMBERSHIP WHERE USERID = '${body.USERID}'`)
  // //console.log(query1[0].MEMBERSHIP_ID);

  //สร้างกิจกรรมโอน
  var query2 = await query_command(`insert into ACTIVITY(ACTIVITY_NAME,MEMBERSHIP_ID,ACTIVITY_POINT,ACTIVITY_SHOW,ACTIVE)
  values ('${query[0].ACTIVITY_NAME}','${query_userid[0].MEMBERSHIP_ID}','${body.ACTIVITY_POINT}','${body.ACTIVITY_SHOW}','${body.ACTIVE}')`)

  //เอากิจกรรมล่าสุด
  var query_getid = await query_command(`SELECT ACTIVITY_ID FROM ACTIVITY WHERE MEMBERSHIP_ID = '${query_userid[0].MEMBERSHIP_ID}' order by ACTIVITY_ID DESC LIMIT 1`)
  // //console.log(query_getid[0].ACTIVITY_ID);

  //คนเข้าร่วม 
  var query4 = await query_command(`insert into JOINACTIVITY(ACTIVITY_ID,MEMBERSHIP_ID)
  values ('${query_getid[0].ACTIVITY_ID}','${body.MEMBERSHIP_ID}')`)
  //  //console.log(body.MEMBERSHIP_ID);

  var query_getidjoin = await query_command(`SELECT JOINACTIVITY_ID,MEMBERSHIP_ID FROM JOINACTIVITY WHERE ACTIVITY_ID = '${query_getid[0].ACTIVITY_ID}' order by JOINACTIVITY_ID DESC LIMIT 1`)
  // //console.log(query_getidjoin[0].MEMBERSHIP_ID);
  //ลบ บวก 
  var query_delete = await query_command(`insert into TRANSACTIONS(ACTIVITY_ID,TRANSACTIONS_POINT,MEMBERSHIP_ID)
  values (('${query_getid[0].ACTIVITY_ID}'),('-${body.ACTIVITY_POINT}'),('${query_userid[0].MEMBERSHIP_ID}')),(('${query_getid[0].ACTIVITY_ID}'),'${body.ACTIVITY_POINT}',('${query_getidjoin[0].MEMBERSHIP_ID}'))`)
  //คะแนนคนโอน -
  var query_sum = await query_command(`SELECT SUM(TRANSACTIONS_POINT) AS POINT FROM TRANSACTIONS WHERE TRANSACTIONS.MEMBERSHIP_ID = '${query_userid[0].MEMBERSHIP_ID}'`)
  // //console.log(query_sum[0].POINT);
  var query_update = await query_command(`UPDATE MEMBERSHIP SET MEMBERSHIP_POINT = '${query_sum[0].POINT}' WHERE MEMBERSHIP_ID = '${query_userid[0].MEMBERSHIP_ID}'`)
  //คะแนนรับ +
  var query_sumadd = await query_command(`SELECT SUM(TRANSACTIONS_POINT) AS POINT FROM TRANSACTIONS WHERE TRANSACTIONS.MEMBERSHIP_ID = '${body.MEMBERSHIP_ID}'`)
  // //console.log(query_sumadd[0].POINT);
  var query_updateadd = await query_command(`UPDATE MEMBERSHIP SET MEMBERSHIP_POINT = '${query_sumadd[0].POINT}' WHERE MEMBERSHIP_ID = '${body.MEMBERSHIP_ID}'`)
  res.send(query_updateadd)
});

//โชร์หน้าอนุมัติ
app.post('/showactivty', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT *,CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME," ",MEMBERSHIP.MEMBERSHIP_LASTNAME)AS name,
  CONCAT(  DATE_FORMAT( ACTIVITY_DAY , '%d' ), '-', DATE_FORMAT( ACTIVITY_DAY , '%m' ) , '-',
  DATE_FORMAT( ACTIVITY_DAY , '%Y' ) +543 ) AS ACTIVITY_DAY 
  FROM ACTIVITY 
  JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = ACTIVITY.MEMBERSHIP_ID 
  WHERE ACTIVE = '2' 
  AND TIME_BANK = '${body.TIME_BANK}'`);
  // //console.log();
  res.send(query)
});

app.post('/semember', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT MEMBERSHIP_ID,TIME_BANK FROM MEMBERSHIP
  WHERE MEMBERSHIP_ID  = '${body.MEMBERSHIP_ID}'`);
  // //console.log();
  res.send(query)
});

//อนุมัติ ช้าเกินไป แก้ให้รับจากbody
app.post('/okay', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var query_show = await query_command(`UPDATE ACTIVITY
    SET ACTIVE = '3',
    ACTIVITY_SHOW = '0'
    WHERE ACTIVITY_ID='${body.ACTIVITY_ID}'  AND ACTIVE = '2' `)
  //console.log(query_show);

  var query_activity = await query_command(`SELECT ACTIVITY_ID,MEMBERSHIP_ID,ACTIVITY_COUNT,ACTIVITY_POINT FROM ACTIVITY WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}'`);
  // //console.log(query_activity[0].ACTIVITY_COUNT);
  var query_join = await query_command(`SELECT ACTIVITY_ID,JOINACTIVITY_ID,MEMBERSHIP_ID FROM JOINACTIVITY WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}' AND JOINACTIVITY.ACTIVE = '2'`);
  // //console.log(query_join[0].MEMBERSHIP_ID);

  var query_addnumber = await query_command(`SELECT COUNT(JOINACTIVITY_ID)AS COUNTJOIN FROM JOINACTIVITY WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE = '2'`);

  //ผู้ขอกิจกรรม
  var query_delete = await query_command(`insert into TRANSACTIONS(ACTIVITY_ID,TRANSACTIONS_POINT,MEMBERSHIP_ID)
  values ('${body.ACTIVITY_ID}','-${query_activity[0].ACTIVITY_POINT}'*'${query_addnumber[0].COUNTJOIN}','${query_activity[0].MEMBERSHIP_ID}')`)
  //จำนวนคนที่เข้าร่วม
  for (const key in query_join) {
    if (query_join.hasOwnProperty(key)) {
      // //console.log(query_join[key].MEMBERSHIP_ID);
      var query_sum = await query_command(`INSERT INTO TRANSACTIONS(ACTIVITY_ID,TRANSACTIONS_POINT,MEMBERSHIP_ID)
      VALUES ('${body.ACTIVITY_ID}','${query_activity[0].ACTIVITY_POINT}','${query_join[key].MEMBERSHIP_ID}')`)
    }
  }
  //รวมแต้มคนสร้างกิจกรรม
  var query_summember = await query_command(`SELECT SUM(TRANSACTIONS_POINT) AS POINT FROM TRANSACTIONS WHERE TRANSACTIONS.MEMBERSHIP_ID = '${query_activity[0].MEMBERSHIP_ID}'`)
  //  //console.log(query_summember[0].POINT);
  var query_update = await query_command(`UPDATE MEMBERSHIP SET MEMBERSHIP_POINT = '${query_summember[0].POINT}' WHERE MEMBERSHIP_ID = '${query_activity[0].MEMBERSHIP_ID}'`)
  //รวมแต้มคนเข้าร่วม
  var query_sumadd = await query_command(`SELECT SUM(TRANSACTIONS_POINT) AS POINT FROM TRANSACTIONS WHERE TRANSACTIONS.MEMBERSHIP_ID = '${query_join[0].MEMBERSHIP_ID}'`)

  var query_sumaddupdate = await query_command(`UPDATE MEMBERSHIP SET MEMBERSHIP_POINT = '${query_sumadd[0].POINT}' WHERE MEMBERSHIP_ID = '${query_join[0].MEMBERSHIP_ID}'`)
  // var update = await query_command(`UPDATE JOINACTIVITY
  // SET ACTIVE = '3'
  // WHERE JOINACTIVITY.ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE = '2'`)
  res.send(query_sumaddupdate)
});

//หน้าbookbank
app.post('/bookbank', async (req, res) => {
  const {
    body
  } = req;
  var query_join = await query_command(`SELECT * FROM 
  (SELECT CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME,' ',MEMBERSHIP.MEMBERSHIP_LASTNAME)as NAMEm,
    CONCAT(MEMBERSHIP.MEMBERSHIP_ID) AS memberid
    ,CONCAT(ACTIVITY.MEMBERSHIP_ID) AS membernameact
    
    ,ACTIVEMEMBER,MEMBERSHIP.MEMBERSHIP_POINT AS Point
    ,ACTIVITY_NAME
    ,CONCAT(ACTIVITY.ACTIVITY_ID) as actid
    ,TRANSACTIONS_POINT
    ,CONCAT(  DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%d' ), '/', DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%m' ) , '/',DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%Y' ) +543) AS ThaiDate ,
      CONCAT(TIME(TRANSACTIONS.CREATE_DATE)) AS ThaiTime , TRANSACTIONS.CREATE_DATE AS time
       FROM TRANSACTIONS 
      JOIN ACTIVITY ON ACTIVITY.ACTIVITY_ID = TRANSACTIONS.ACTIVITY_ID
      JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = TRANSACTIONS.MEMBERSHIP_ID
   
      WHERE MEMBERSHIP.USERID = '${body.USERID}')last_data
   ORDER BY time`)
  // var query_join = await query_command(`SELECT *,CONCAT(MEMBERSHIP.MEMBERSHIP_ID) AS joinmemid,CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME ,' ',MEMBERSHIP.MEMBERSHIP_LASTNAME) AS joinmemname FROM (SELECT CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME,' ',MEMBERSHIP.MEMBERSHIP_LASTNAME)as NAMEm,
  // CONCAT(MEMBERSHIP.MEMBERSHIP_ID) AS memberid
  // ,CONCAT(ACTIVITY.MEMBERSHIP_ID) AS membernameact
  // ,ACTIVEMEMBER,MEMBERSHIP.MEMBERSHIP_POINT AS Point
  // ,ACTIVITY_NAME
  // ,CONCAT(ACTIVITY.ACTIVITY_ID) as actid
  // ,TRANSACTIONS_POINT
  // ,CONCAT(  DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%d' ), '/', DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%m' ) , '/',DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%Y' ) +543) AS ThaiDate ,
  //   CONCAT(TIME(TRANSACTIONS.CREATE_DATE)) AS ThaiTime , TRANSACTIONS.CREATE_DATE AS time
  //    FROM TRANSACTIONS 
  //   JOIN ACTIVITY ON ACTIVITY.ACTIVITY_ID = TRANSACTIONS.ACTIVITY_ID
  //   JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = TRANSACTIONS.MEMBERSHIP_ID
  //   WHERE MEMBERSHIP.USERID = '${body.USERID}')last_data
  // LEFT JOIN JOINACTIVITY ON JOINACTIVITY.ACTIVITY_ID = last_data.actid
  // LEFT JOIN MEMBERSHIP ON JOINACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
  // ORDER BY time
  // `)
  res.send(query_join)
});

app.post('/bookbankmember', async (req, res) => {
  const {
    body
  } = req;
  // //console.log(body);
  var query = await query_command(`SELECT ACTIVEMEMBER,MEMBERSHIP_POINT,ACTIVITY_NAME,TRANSACTIONS_POINT,CONCAT(  DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%d' ), '/', DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%m' ) , '/',DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%Y' ) +543 ) AS ThaiDate FROM TRANSACTIONS 
  JOIN ACTIVITY ON ACTIVITY.ACTIVITY_ID = TRANSACTIONS.ACTIVITY_ID
	JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = TRANSACTIONS.MEMBERSHIP_ID
  WHERE TRANSACTIONS.MEMBERSHIP_ID = '${body.MEMBERSHIP_ID}'`)

  //console.log(query);
  res.send(query)
});

// //หน้าMyactivity1
app.post('/showmemberactivity', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT *,CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME," ",MEMBERSHIP.MEMBERSHIP_LASTNAME) AS NAMEMEMBER FROM JOINACTIVITY 
  JOIN MEMBERSHIP ON JOINACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID 
  WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE = '1'`);
  res.send(query)
});

app.post('/showactivityy', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT *,CONCAT(
		DATE_FORMAT(ACTIVITY.ACTIVITY_DAY, '%Y')
	) AS YEARDate,
	CONCAT(
		DATE_FORMAT(ACTIVITY.ACTIVITY_DAY, '%M')
	) AS MONTHDate,
	CONCAT(
		DATE_FORMAT(ACTIVITY.ACTIVITY_DAY, '%D')
	) AS DAYDate FROM ACTIVITY
  WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}' `);
  res.send(query)
});

app.post('/showactivityid', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT * FROM JOINACTIVITY
  JOIN MEMBERSHIP ON JOINACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
  ORDER BY JOINACTIVITY.ACTIVITY_ID = '${body.ACTIVITY_ID}' DESC LIMIT 0,1`);
  res.send(query)
});

app.post('/updel', async (req, res) => {
  const {
    body
  } = req;
  var query = await query_command(`SELECT ACTIVITY_ID FROM ACTIVITY WHERE ACTIVITY_ID= '${body.ACTIVITY_ID}'`)

  var querypointmember = await query_command(`UPDATE JOINACTIVITY
  SET ACTIVE = '${body.ACTIVE}'
  WHERE MEMBERSHIP_ID = '${body.MEMBERSHIP_ID}' AND ACTIVITY_ID = '${query[0].ACTIVITY_ID}'`)
  //console.log(querypointmember);
  res.send(querypointmember)
});

app.post('/upmember', async (req, res) => {
  const {
    body
  } = req;
  // //console.log(body);
  // var query = await query_command(`SELECT * FROM JOINACTIVITY WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE = '1'`)
  // //console.log(query[0].JOINACTIVITY_ID);
  var activityshow = await query_command(`UPDATE ACTIVITY
  SET ACTIVITY_SHOW = '0',
  ACTIVE = '2'
  WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE = '1'`)
  var querypointmember = await query_command(`UPDATE JOINACTIVITY
  SET ACTIVE = '2'
  WHERE  ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE = '1'`)
  //console.log(querypointmember);
  res.send(querypointmember)
});

app.post('/insertVolunteer', async (req, res) => {
  const {
    body
  } = req;
  var activityshow = await query_command(`insert into VOLUNTEER (ACTIVITY_ID,MEMBERSHIP_ID) 
  values ('${body.ACTIVITY_ID}','${body.MEMBERSHIP_ID}')`)
  res.send(activityshow)
});
//โชร์ว่า แต้มในปี 2020 มีกี่แต้ม
app.post('/chartpoint', async (req, res) => {
  const {
    body
  } = req;
  var point_sum = await query_command(`SELECT TIME_BANK,
  CONCAT(DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%Y' ) +543 )yeartran ,
    SUM(
  
      IF (
        TRANSACTIONS.TRANSACTIONS_POINT > 0,
        TRANSACTIONS.TRANSACTIONS_POINT,
        0
      )
    ) pointuser,
    MONTH(TRANSACTIONS.CREATE_DATE)monthpoint ,
  CASE
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '1' THEN 'มกราคม'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '2' THEN 'กุมภาพันธ์'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '3' THEN 'มีนาคม'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '4' THEN 'เมษายน'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '5' THEN 'พฤษภาคม'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '6' THEN 'มิถุนายน'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '7' THEN 'กรกฎาคม'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '8' THEN 'สิงหาคม'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '9' THEN 'กันยายน'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '10' THEN 'ตุลาคม'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '11' THEN 'พฤศจิกายน'
  WHEN MONTH(TRANSACTIONS.CREATE_DATE) = '12' THEN 'ธันวาคม'
  ELSE 'ไม่มี'
  END AS montha
  FROM ACTIVITY
JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
  JOIN TRANSACTIONS ON ACTIVITY.ACTIVITY_ID = TRANSACTIONS.ACTIVITY_ID
  WHERE CONCAT(DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%Y' ) +543 ) = '${body.year}'
AND TIME_BANK = '${body.TIME_BANK}'  AND ACTIVITY.ACTIVITY_NAME != 'โอน'
  GROUP BY
    monthpoint ,montha,yeartran,TIME_BANK
  `)
  //console.log(point_sum);
  res.send(point_sum)
});

app.post('/sumact', async (req, res) => {
  const {
    body
  } = req;
  var sum_act = await query_command(`SELECT TIME_BANK,
  COUNT(ACTIVITY_ID)AS countact,MONTH(ACTIVITY.CREATE_DATE)monthpoint,
  CONCAT(DATE_FORMAT(ACTIVITY.CREATE_DATE , '%Y' ) +543 )yearact ,
    CASE
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '1' THEN 'มกราคม'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '2' THEN 'กุมภาพันธ์'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '3' THEN 'มีนาคม'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '4' THEN 'เมษายน'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '5' THEN 'พฤษภาคม'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '6' THEN 'มิถุนายน'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '7' THEN 'กรกฎาคม'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '8' THEN 'สิงหาคม'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '9' THEN 'กันยายน'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '10' THEN 'ตุลาคม'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '11' THEN 'พฤศจิกายน'
    WHEN MONTH(ACTIVITY.CREATE_DATE) = '12' THEN 'ธันวาคม'
    ELSE 'ไม่มี'
    END AS monthb
     FROM ACTIVITY
   JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
  WHERE CONCAT(DATE_FORMAT(ACTIVITY.CREATE_DATE , '%Y' ) +543 ) = '${body.year}'
  AND TIME_BANK = '${body.TIME_BANK}'  AND ACTIVITY.ACTIVITY_NAME != 'โอน' AND ACTIVITY.ACTIVE = '3'
    GROUP BY monthpoint,monthb,yearact,TIME_BANK`)
  //console.log(sum_act);
  res.send(sum_act)
});

app.post('/summember', async (req, res) => {
  const {
    body
  } = req;
  var sum_member = await query_command(`SELECT 
  COUNT(*)
  FROM MEMBERSHIP s 
  WHERE s.TIME_BANK = '${body.TIME_BANK}'`)
  //console.log(sum_member);
  res.send(sum_member)
});

app.post('/summonth', async (req, res) => {
  const {
    body
  } = req;
  var sum_act = await query_command(`SELECT MEMBERSHIP.MEMBERSHIP_ID,CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME,' ',MEMBERSHIP.MEMBERSHIP_LASTNAME) AS NAMEMEM,ACTIVEMEMBER,MEMBERSHIP_POINT,ACTIVITY_NAME,TRANSACTIONS_POINT,CONCAT(  DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%d' ), '/', DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%m' ) , '/',DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%Y' ) +543 ) AS ThaiDate FROM TRANSACTIONS 
  JOIN ACTIVITY ON ACTIVITY.ACTIVITY_ID = TRANSACTIONS.ACTIVITY_ID
	JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = TRANSACTIONS.MEMBERSHIP_ID
  WHERE  MONTH(TRANSACTIONS.CREATE_DATE) = '${body.MONTHP}' AND CONCAT(DATE_FORMAT(TRANSACTIONS.CREATE_DATE , '%Y' ) +543 ) = '${body.year}' AND TRANSACTIONS.TRANSACTIONS_POINT > 0 AND ACTIVITY.ACTIVITY_NAME != 'โอน'
  AND MEMBERSHIP.TIME_BANK = '${body.TIME_BANK}' AND ACTIVITY.ACTIVITY_NAME != 'สมัครสมาชิก'
  ORDER BY TRANSACTIONS.TRANSACTIONS_ID`)
  //console.log(sum_act);
  res.send(sum_act)
});

app.post('/countmonth', async (req, res) => {
  const {
    body
  } = req;
  var sum_act = await query_command(`SELECT
	COUNT(TRANSACTIONS_ID) AS counttran
FROM
	TRANSACTIONS
JOIN ACTIVITY ON ACTIVITY.ACTIVITY_ID = TRANSACTIONS.ACTIVITY_ID
JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = TRANSACTIONS.MEMBERSHIP_ID
WHERE
	MONTH (TRANSACTIONS.CREATE_DATE) = '${body.MONTHP}'
AND CONCAT(
	DATE_FORMAT(
		TRANSACTIONS.CREATE_DATE,
		'%Y'
	) + 543
) = '${body.year}'
AND TRANSACTIONS.TRANSACTIONS_POINT > 0
AND ACTIVITY.ACTIVITY_NAME != 'โอน'
AND MEMBERSHIP.TIME_BANK = '${body.TIME_BANK}'`)
  //console.log(sum_act);
  res.send(sum_act)
});

app.post('/summonthdeladd', async (req, res) => {
  const {
    body
  } = req;
  var sum_deladd = await query_command(`SELECT MEMBERSHIP.MEMBERSHIP_ID,CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME,' ',MEMBERSHIP.MEMBERSHIP_LASTNAME) AS NAMEMEM,ACTIVEMEMBER,MEMBERSHIP_POINT,ACTIVITY_NAME,TRANSACTIONS_POINT,CONCAT(  DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%d' ), '/', DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%m' ) , '/',DATE_FORMAT( TRANSACTIONS.CREATE_DATE , '%Y' ) +543 ) AS ThaiDate FROM TRANSACTIONS 
  JOIN ACTIVITY ON ACTIVITY.ACTIVITY_ID = TRANSACTIONS.ACTIVITY_ID
	JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = TRANSACTIONS.MEMBERSHIP_ID
  WHERE  MONTH(TRANSACTIONS.CREATE_DATE) = '${body.MONTHP}' AND CONCAT(DATE_FORMAT(TRANSACTIONS.CREATE_DATE , '%Y' ) +543 ) = '${body.year}' AND TRANSACTIONS.TRANSACTIONS_POINT < 0 AND ACTIVITY.ACTIVITY_NAME != 'โอน' AND MEMBERSHIP.TIME_BANK = '${body.TIME_BANK}' ORDER BY TRANSACTIONS_ID`)
  //console.log(sum_deladd);
  res.send(sum_deladd)
});

app.post('/memberactivity', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var member = await query_command(`SELECT * FROM JOINACTIVITY
  JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = JOINACTIVITY.MEMBERSHIP_ID
  WHERE ACTIVITY_ID = '${body.ACTIVITY_ID}' AND ACTIVE ='2'`)
  //console.log(member);
  res.send(member)
});

app.post('/allskill', async (req, res) => {
  const {
    body
  } = req;
  var member = await query_command(`SELECT*FROM SKILL
  LEFT JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = SKILL.MEMBERSHIP_ID
  WHERE SKILL_NAME = '${body.ACTIVITY_ID}' AND TIME_BANK = '${body.TIME_BANK}'`)
  //console.log(member);
  res.send(member)
});

app.post('/volunteer', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var member = await query_command(`SELECT COUNT(*)AS membercount,VOLUNTEER.MEMBERSHIP_ID, CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME," ",MEMBERSHIP.MEMBERSHIP_LASTNAME) AS fullname FROM VOLUNTEER
  JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = VOLUNTEER.MEMBERSHIP_ID
  WHERE MEMBERSHIP.TIME_BANK = '${body.TIME_BANK}'
  GROUP BY VOLUNTEER.MEMBERSHIP_ID 
  ORDER BY membercount DESC LIMIT 10`)
  //console.log(member);
  res.send(member)
});

app.post('/sumvolunteer', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var member = await query_command(`SELECT COUNT(*)AS membercount,VOLUNTEER.MEMBERSHIP_ID, CONCAT(MEMBERSHIP.MEMBERSHIP_FIRFENAME," ",MEMBERSHIP.MEMBERSHIP_LASTNAME) AS fullname FROM VOLUNTEER
  JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = VOLUNTEER.MEMBERSHIP_ID
  WHERE MEMBERSHIP.TIME_BANK = '${body.TIME_BANK}'
  GROUP BY VOLUNTEER.MEMBERSHIP_ID 
  ORDER BY membercount DESC `)
  //console.log(member);
  res.send(member)
});

app.post('/sumskill', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var skill = await query_command(`SELECT COUNT(*) AS M_SK , SKILL_NAME FROM SKILL
  JOIN MEMBERSHIP ON SKILL.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
  WHERE MEMBERSHIP.TIME_BANK = '${body.TIME_BANK}'
  GROUP BY SKILL_NAME
  ORDER BY M_SK ASC`)
  //console.log(skill);
  res.send(skill)
});

app.post('/year', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var yser = await query_command(`SELECT 
  CASE
      WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 15 AND 25 THEN 'เยาวชน'
      WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 26 AND 60 THEN 'วัยเเรงงาน'
     WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 61 AND 120 THEN 'ผู้สูงอายุ'
 END AS years,
     COUNT(*) AS NumberOfPerson
  FROM MEMBERSHIP
 WHERE TIME_BANK = '${body.TIME_BANK}'
 AND CASE
 WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 15 AND 25 THEN 'เยาวชน'
 WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 26 AND 60 THEN 'วัยเเรงงาน'
WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 61 AND 120 THEN 'ผู้สูงอายุ'
END IS NOT NULL
  GROUP BY years`)
  //console.log(yser);
  res.send(yser)
});

app.post('/yearMB', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var yser = await query_command(`SELECT 
  CASE
      WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 15 AND 25 THEN 'เยาวชน'
      WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 26 AND 60 THEN 'วัยเเรงงาน'
     WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 61 AND 120 THEN 'ผู้สูงอายุ'
 END AS years,
     COUNT(*) AS NumberOfPerson,
YEAR(MEMBERSHIP.CREATE_DATE) AS yearMB  
  FROM MEMBERSHIP
WHERE YEAR(MEMBERSHIP.CREATE_DATE) = '${body.YEAR}'
AND CASE
WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 15 AND 25 THEN 'เยาวชน'
WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 26 AND 60 THEN 'วัยเเรงงาน'
WHEN ('${body.newyear}' - DATE_FORMAT(MEMBERSHIP_BIRTH,'%Y')) BETWEEN 61 AND 120 THEN 'ผู้สูงอายุ'
END IS NOT NULL
  GROUP BY years,yearMB`)
  //console.log(yser);
  res.send(yser)
});
app.post('/yearcountMB', async (req, res) => {
  const {
    body
  } = req;
  //console.log(body);
  var yser = await query_command(`SELECT
  bank.BANK_NAME,
  membernew,
  activitycount,
membersum
FROM
  (SELECT * FROM BANK) bank
LEFT JOIN (
  SELECT
    COUNT(MEMBERSHIP.MEMBERSHIP_ID) AS membernew,
    MEMBERSHIP.TIME_BANK
  FROM
    MEMBERSHIP
  WHERE
    YEAR (MEMBERSHIP.CREATE_DATE) = '${body.YEAR}'
  GROUP BY
    TIME_BANK
) MB ON MB.TIME_BANK = bank.TIME_BANK
LEFT JOIN (
  SELECT
    COUNT(ACTIVITY.ACTIVITY_ID) AS activitycount,
    MEMBERSHIP.TIME_BANK
  FROM
    ACTIVITY
  JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
  WHERE
    YEAR (ACTIVITY.CREATE_DATE) = '${body.YEAR}' AND ACTIVITY.ACTIVITY_NAME != 'โอน' AND ACTIVITY.ACTIVE ='3'
  GROUP BY
    TIME_BANK
) ACT ON ACT.TIME_BANK = bank.TIME_BANK
LEFT JOIN (
  SELECT
    COUNT(MEMBERSHIP.MEMBERSHIP_ID) AS membersum,
    MEMBERSHIP.TIME_BANK
  FROM
    MEMBERSHIP
  GROUP BY
    TIME_BANK
) MBs ON MBs.TIME_BANK = bank.TIME_BANK`)
  //console.log(yser);
  res.send(yser)
});

app.post('/sumactivity', async (req, res) => {
  const {
    body
  } = req;
  var sum_actadd = await query_command(`SELECT *,CONCAT(MEMBERSHIP_FIRFENAME,' ',MEMBERSHIP_LASTNAME) NAMEMEMBER , CASE
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '1' THEN 'มกราคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '2' THEN 'กุมภาพันธ์'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '3' THEN 'มีนาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '4' THEN 'เมษายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '5' THEN 'พฤษภาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '6' THEN 'มิถุนายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '7' THEN 'กรกฎาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '8' THEN 'สิงหาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '9' THEN 'กันยายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '10' THEN 'ตุลาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '11' THEN 'พฤศจิกายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '12' THEN 'ธันวาคม'
  ELSE 'ไม่มี'
  END AS monthb FROM ACTIVITY
  JOIN MEMBERSHIP ON MEMBERSHIP.MEMBERSHIP_ID = ACTIVITY.MEMBERSHIP_ID
    WHERE MONTH(ACTIVITY.CREATE_DATE) = '${body.MONTHP}' AND CONCAT(DATE_FORMAT(ACTIVITY.CREATE_DATE , '%Y' ) +543 ) = '${body.year}' AND ACTIVITY.ACTIVITY_NAME != 'โอน' AND ACTIVITY.ACTIVE ='3' AND MEMBERSHIP.TIME_BANK = '${body.TIME_BANK}'`)
  //console.log(sum_actadd);
  res.send(sum_actadd)
});

//autocomples คำเหมือน กิจกรรม
app.post('/autocomples', async (req, res) => {
  const {
    body
  } = req;
  var autocomples = await query_command(`SELECT ACTIVITY_NAME FROM ACTIVITY GROUP BY ACTIVITY_NAME`)
  //console.log(autocomples);
  res.send(autocomples)
});

app.post('/autocomplessearchText', async (req, res) => {
  const {
    body
  } = req;
  var autocomples = await query_command(`SELECT ACTIVITY_NAME FROM ACTIVITY
  WHERE ACTIVITY_NAME LIKE "%'${body.searchText}'%"`)
  //console.log(autocomples);
  res.send(autocomples)
});


app.post('/memberbank', async (req, res) => {
  const {
    body
  } = req;
  var sumactivity = await query_command(`SELECT  TIME_BANK, COUNT(ACTIVITY_ID) activ ,
  CASE
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '1' THEN 'มกราคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '2' THEN 'กุมภาพันธ์'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '3' THEN 'มีนาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '4' THEN 'เมษายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '5' THEN 'พฤษภาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '6' THEN 'มิถุนายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '7' THEN 'กรกฎาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '8' THEN 'สิงหาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '9' THEN 'กันยายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '10' THEN 'ตุลาคม'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '11' THEN 'พฤศจิกายน'
  WHEN MONTH(ACTIVITY.CREATE_DATE) = '12' THEN 'ธันวาคม'
  ELSE 'ไม่มี'
  END AS monthb FROM ACTIVITY
JOIN MEMBERSHIP ON ACTIVITY.MEMBERSHIP_ID = MEMBERSHIP.MEMBERSHIP_ID
WHERE TIME_BANK = '${body.TIME_BANK}' AND ACTIVITY.ACTIVITY_NAME != 'โอน' AND ACTIVITY.ACTIVE = '3' AND CONCAT(DATE_FORMAT(ACTIVITY.CREATE_DATE , '%Y' ) +543 ) = '${body.year}'
GROUP BY monthb`)
  //console.log(sumactivity);
  res.send(sumactivity)
});