const ENABLE_BATTERY_VOLTAGE = true;
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
  return NRF.getBattery();
}

function getLight(){
  return Puck.light();
}

function getMagnetometer() {
  var mag = [ 0, 0, 0];

    var readings = Puck.mag();

    mag[0] = readings.x;
    mag[1] = readings.y;
    mag[2] = readings.z;

  return mag;
}

function getTemperature(){
  return E.getTemperature();
}

function publishData(){
  if(ENABLE_TEMPERATURE){
    MQTT_publish('home-assistant/sensor/puck/temp',getTemperature());
  }
  if(ENABLE_BATTERY_VOLTAGE) {
    MQTT_publish('home-assistant/sensor/puck/batt', getBatteryVoltage());
  }
  if(ENABLE_LIGHT_SENSOR){
    MQTT_publish('home-assistant/sensor/puck/light', getLight());
  }
  if(ENABLE_MAGNETOMETER) {
    MQTT_publish('home-assistant/sensor/puck/mag', getMagnetometer());
  }
}

var on = 0;

var presses = 0;
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
