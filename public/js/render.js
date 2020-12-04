window.$ = window.jQuery = require('./public/js/jquery.min.js');
let serialport = require('serialport');
let port = null;

serialport.list().then(ports => {
    ports.forEach(function(port) {
        $('.com').append(`<option>${port.path}</option>`)
    });
    console.log(ports)
  });

$('.btn-submit').click(() => {
    let COM = $('select option:selected').text();
    let BaudRate = $('#BaudRate').val();
    let MaxBits = $('#MaxBits').val();
    let MinBits = $('#MinBits').val();
    console.log(COM);
    console.log(BaudRate);
    port = new serialport(COM, {
        baudRate: parseInt(BaudRate),
        dataBits: parseInt(MaxBits),
        stopBits: parseInt(MinBits),
        parity:'none',
        autoOpen: false,
    });
    port.open(function (error){
         if(error){
            console.log("打开端口" + COM + "错误：" + error);
         }else{
            $('.receive-windows').text(`打开串口: ${COM}, 波特率: ${BaudRate}`);
            $('.receive-windows').append('<br/>===============================<br/>');
            $(".receive-windows").animate({scrollTop:$(".receive-windows")[0].scrollHeight},'1000');
         }
    })
    port.on('data',(data) =>{
        console.log("DATA: ",data);
        $('.receive-windows').append(data.toString());
    });
    port.on('error', (error) => {
        console.log('Error: ', error);
    })

});
// 关闭串口
$(".btn-submit-on").click(()=>{
    port.close(function(error) {
        if (error) {
            console.log("关闭串口失败");
        } else {
            $('.receive-windows').append("关闭串口成功<br/>");
            $(".receive-windows").animate({scrollTop:$(".receive-windows")[0].scrollHeight},'1000');
            console.log("关闭串口成功");
        }
    });
})


// 点击发送信息
$('.btn-send').click(() => {
    var sendData = $('.input-send-data').val();
    $('.receive-windows').append("发送指令："+sendData+"<br/>");
    if (port != {} && port != null) {
        let hex =   Buffer.from(sendData,'hex')
        port.write(hex,(error)=>{
            if (error) {
                console.log("发送指令失败");
            } else {
                console.log("发送指令成功");
                // 此处可以写监听器部分，监听下位机的返回内容
                port.removeAllListeners();
                port.on("data",(data)=>{
                    $('.receive-windows').append("设备返回："+data.toString("hex")+"<br/>");
                    $(".receive-windows").animate({scrollTop:$(".receive-windows")[0].scrollHeight},'1000');
                })
                console.log("监听----：",port.listeners("data").length)    
            }

        });
    }
})
// 清空信息
$('.btn-reset').click(() => {
    $('.input-send-data').val('');
})

var v =  function versions(){
        var  nodev = process.versions.node
        var  Chromev = process.versions.chrome
        var  electronv = process.versions.electron
        $(".version").html("node: " + nodev + " Chrome: " +  Chromev + " and Electron: " + electronv)
}
v();