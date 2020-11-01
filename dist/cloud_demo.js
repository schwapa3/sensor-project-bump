var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com

var app = new Vue({
    el: "#app",
    data: {
        a1_0: "unknown", // the state of the button on device 0
        a2_0: "unknown",
        b1_0: "unknown",
        b2_0: "unknown",
        c1_0: "unknown",
        c2_0: "unknown",
        t_0: "unknown",
        a1_1: "unknown", // the state of the button on device 0
        a2_1: "unknown",
        b1_1: "unknown",
        b2_1: "unknown",
        c1_1: "unknown",
        c2_1: "unknown",
        t_1: "unknown",
        bumpCounter: 0,    // how many times the buttons were pressed
        bumpSync: false,       // true if the buttons were pressed within 1 second

    },
    // This function is executed once when the page is loaded.
    mounted: function () {
        this.initSse();
    },
    methods: {
        // Initialise the Event Stream (Server Sent Events)
        // You don't have to change this function
        initSse: function () {
            if (typeof (EventSource) !== "undefined") {
                var url = rootUrl + "/api/events";
                var source = new EventSource(url);
                source.onmessage = (event) => {
                    this.updateVariables(JSON.parse(event.data));
                };
            } else {
                this.message = "Your browser does not support server-sent events.";
            }
        },
        // react on events: update the variables to be displayed
        updateVariables(ev) {
            // Event "bump"
            if (ev.eventName === "bump") {
                this.bumpCounter = ev.eventData.counter;
                this.bumpSync = ev.eventData.bumpSync;
            }

        },
        // call the function "blinkRed" in your backend
        remoteBump: function (nr) {
            var duration = 2000; // blinking duration in milliseconds
            if(nr == 2) {
                axios.post(rootUrl + "/api/device/0/function/remoteBump", { arg: duration })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'remoteBump' of device number 0.\n\n" + error)
                })
                axios.post(rootUrl + "/api/device/1/function/remoteBump", { arg: duration })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'remoteBump' of device number 1.\n\n" + error)
                })
            }else{
            axios.post(rootUrl + "/api/device/" + nr + "/function/remoteBump", { arg: duration })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'remoteBump' of device number " + nr + ".\n\n" + error)
                })
            }
            
        },
        // get the value of the variable "buttonState" on the device with number "nr" from your backend
        getVariables: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/a1")
                .then(response => {
                    // Handle the response from the server
                    var a1 = response.data.result;
                    if (nr === 0) {
                        this.a1_0 = a1;
                    }
                    else if (nr === 1) {
                        this.a1_1 = a1;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read variable a1 of device number " + nr + ".\n\n" + error)
                })
                axios.get(rootUrl + "/api/device/" + nr + "/variable/a2")
                .then(response => {
                    // Handle the response from the server
                    var a2 = response.data.result;
                    if (nr === 0) {
                        this.a2_0 = a2;
                    }
                    else if (nr === 1) {
                        this.a2_1 = a2;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read variable a2 of device number " + nr + ".\n\n" + error)
                })
                axios.get(rootUrl + "/api/device/" + nr + "/variable/b1")
                .then(response => {
                    // Handle the response from the server
                    var b1 = response.data.result;
                    if (nr === 0) {
                        this.b1_0 = b1;
                    }
                    else if (nr === 1) {
                        this.b1_1 = b1;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read variable b1 of device number " + nr + ".\n\n" + error)
                })
                axios.get(rootUrl + "/api/device/" + nr + "/variable/b2")
                .then(response => {
                    // Handle the response from the server
                    var b2 = response.data.result;
                    if (nr === 0) {
                        this.b2_0 = b2;
                    }
                    else if (nr === 1) {
                        this.b2_1 = b2;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read tvariable b2 of device number " + nr + ".\n\n" + error)
                })
                axios.get(rootUrl + "/api/device/" + nr + "/variable/c1")
                .then(response => {
                    // Handle the response from the server
                    var c1 = response.data.result;
                    if (nr === 0) {
                        this.c1_0 = c1;
                    }
                    else if (nr === 1) {
                        this.c1_1 = c1;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read variable c1 of device number " + nr + ".\n\n" + error)
                })
                axios.get(rootUrl + "/api/device/" + nr + "/variable/c2")
                .then(response => {
                    // Handle the response from the server
                    var c2 = response.data.result;
                    if (nr === 0) {
                        this.c2_0 = c2;
                    }
                    else if (nr === 1) {
                        this.c2_1 = c2;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read variable c2 of device number " + nr + ".\n\n" + error)
                })
                axios.get(rootUrl + "/api/device/" + nr + "/variable/t")
                .then(response => {
                    // Handle the response from the server
                    var t = response.data.result;
                    if (nr === 0) {
                        this.t_0 = t;
                    }
                    else if (nr === 1) {
                        this.t_1 = t;
                    }
                    else {
                        console.log("unknown device number: " + nr);
                    }
                })
                .catch(error => {
                    alert("Could not read variable t of device number " + nr + ".\n\n" + error)
                })
                
        }
    }
})
