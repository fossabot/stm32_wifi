var email = require("emailjs");
var mysql = require('mysql');
var schedule = require('node-schedule');
//@mention
//���ݿ�����
var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'klren0312',
        database: 'nodemysql',
        port: 3306
    })
    //�������ݿ�
conn.connect();

//��������
var server = email.server.connect({
    user: "15755022403@139.com",
    password: "renzhiwei0312",
    host: "smtp.139.com",
    ssl: true
});
//ÿ���ӵ�ʮ���ʱ����
var rule = new schedule.RecurrenceRule();
rule.second = 10;
var j = schedule.scheduleJob(rule, function() {
    conn.query('SELECT * FROM pet', function(err, rows, fields) {
        var tem = rows[rows.length - 1].tem;
        var indoor = rows[rows.length - 1].indoor;
        var temmsg = {
            text: "tempreture is " + tem + ",please  be careful",
            from: "15755022403@139.com", //���ͷ�
            to: "605747907@qq.com", //���շ�
            subject: "PetHose tem"
        };
        var indoormsg = {
            text: "Pet is not in the home  , please be careful",
            from: "15755022403@139.com", //���ͷ�
            to: "605747907@qq.com", //���շ�
            subject: "PetHose indoor"
        };

        if (tem >= 30) {
            server.send(temmsg, function(err, message) {
                console.log(err || "ok");
            });
        }
        if (indoor == 0) {
            server.send(indoormsg, function(err, message) {
                console.log(err || "ok")
            });
        };
    });
});