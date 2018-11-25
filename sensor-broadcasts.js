const ENABLE_BATTERY_VOLTAGE = false;
const ENABLE_TEMPERATURE = true;
const ENABLE_LIGHT_SENSOR = false;
const ENABLE_CAP_SENSE = false;
const ENABLE_MAGNETOMETER = false;
const ENABLE_NFC = false;

const INTERVAL = 5000;

// helper function for publishing messages
function MQTT_publish(topic, message) {
    NRF.setAdvertising({0x0590 : message});
  console.log(topic + ": " + message);
}

function getBatteryVoltage() {
  if(!ENABLE_BATTERY_VOLTAGE) {
    return 0;
  }

  return NRF.getBattery();
}

function getLight(){
  if(!ENABLE_LIGHT_SENSOR){
    return 0;
  }
  return Puck.light();
}


function encodeCapSense() {
  if(!ENABLE_CAP_SENSE) {
    return 0;
  }
  return Puck.capSense();
}


function getMagnetometer() {
  var mag = [ 0, 0, 0];

  if(ENABLE_MAGNETOMETER) {
    var readings = Puck.mag();

    mag[0] = readings.x;
    mag[1] = readings.y;
    mag[2] = readings.z;
  }

  return mag;
}

function getTemperature(){
  if(!ENABLE_TEMPERATURE){
    return 0;
  }
  return E.getTemperature();
}

function publishData(){
  NRF.setAdvertising({},{manufacturer: 0x0590, manufacturerData:[presses]});
  MQTT_publish('home-assistant/sensor/puck/temp',getTemperature());
  MQTT_publish('home-assistant/sensor/puck/batt', getBatteryVoltage());
  MQTT_publish('home-assistant/sensor/puck/light', getLight());
  MQTT_publish('home-assistant/sensor/puck/mag', getMagnetometer());
}

var on = 0;

var presses = 0;
NRF.setAdvertising({},{manufacturer: 0x0590, manufacturerData:[presses]});

// publish events on button press
setWatch(function() {
  on = !on;
  presses++;
  digitalWrite(LED, on);
  var mqtt;
  if (on){
   mqtt = setInterval(publishData, INTERVAL);
  }
  else {
    clearInterval(mqtt);
  }

}, BTN, { repeat:true, edge:"rising", debounce:50 });


LED3.set();
setTimeout(function() {
        LED3.reset();
},1000);




