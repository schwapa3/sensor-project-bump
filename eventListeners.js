// remember the last event so that we can check if two buttons were pressed within 1 second
var lastBumpEvent = {
    deviceId: "",
    timestamp: 0
}

// remember how many times the buttons were pressed
var bumpCounter = 0;


// react on the "bump" Event
function handleBump (event) {
    // read variables from the event
    let ev = JSON.parse(event.data);
    let evData = ev.data; // the data from the argon event
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event

    bumpCounter++;

    let sync = false;

    if (evTimestamp - lastBumpEvent.timestamp < 1000) {
        if (evDeviceId !== lastBumpEvent.deviceId) {
            sync = true;
        }
    }

    lastBumpEvent.timestamp = evTimestamp;
    lastBumpEvent.deviceId = evDeviceId;


    // the data we want to send to the clients
    let data = {
        message: evData, // just forward "bumped"
        counter: bumpCounter,
        bumpSync: sync
    }

    // send data to all connected clients
    sendData("bump", data, evDeviceId, evTimestamp );
}


// send data to the clients.
// You don't have to change this function
function sendData(evName, evData, evDeviceId, evTimestamp ) {
    
    // map device id to device nr
    let nr = exports.deviceIds.indexOf(evDeviceId)

    // the message that we send to the client
    let data = {
        eventName: evName,
        eventData: evData,
        deviceNumber: nr,
        timestamp: evTimestamp,
    };

    // send the data to all connected clients
    exports.sse.send(data)
}

exports.deviceIds = [];
exports.sse = null;

// export your own functions here as well
exports.handleBump = handleBump;