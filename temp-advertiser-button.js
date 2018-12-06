function updateAdv() {
//      digitalPulse(LED1, true, 200);
  var sensor_data = {};
  sensor_data.temp = E.getTemperature();
  sensor_data.batt = E.getBattery();
  json_data = JSON.stringify(sensor_data);
//  console.log(json_data); // for debugging
  NRF.setAdvertising({},{
    showName:false,
    manufacturer:0x0590,
    manufacturerData:json_data
  });
}

updateAdv(); // start off right now
setInterval(updateAdv, 60000); // update every 60 seconds


/*setWatch(function(e) {
  
  var len = e.time - e.lastTime;
  if (len > 0.3) {
    // Long press
    digitalPulse(LED1,1,100);
  } else {
    // Short press
    digitalPulse(LED2,1,100);
  }
}, BTN, { edge:"falling",repeat:true,debounce:50});
*/
console.log("Flashed");
