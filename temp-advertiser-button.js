function updateAdv() {
      digitalPulse(LED1, true, 200);
      var data = [E.getBattery(), E.getTemperature()];
      NRF.setAdvertising({},{manufacturer: 0x0590, manufacturerData:data});
      // console.log(data); // for debugging
    }

updateAdv(); // start off right now
setInterval(updateAdv, 60000); // update every 60 seconds


setWatch(function(e) {
  
  var len = e.time - e.lastTime;
  if (len > 0.3) {
    // Long press
    digitalPulse(LED1,1,100);
  } else {
    // Short press
    digitalPulse(LED2,1,100);
  }
}, BTN, { edge:"falling",repeat:true,debounce:50});
