/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, define: false, navigatorPG: false, require: false */

require(["scripts/libreria.js"], function (Libreria) {
	"use strict";
	Libreria.askPermission("SMS");
	Libreria.askPermission("VIBRATION");
	Libreria.askPermission("BEEP");
	Libreria.askPermission("NOTIFICATION");
	Libreria.askPermission("ACCELEROMETER");
	Libreria.askPermission("GPS");
});

function roundNumber(num) {
    "use strict";
    var dec, result;
    dec = 3;
    result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var range, number, vibration, notification, beep, beeptimes, timeout, max, array_x, array_y, array_z, i, colisiona, max_valx, min_valx, min_valy, max_valy, min_valz, max_valz, j;
max = 20;
array_x = [max];
array_y = [max];
array_z = [max];
i = 0;
colisiona = false;

range = 30;
function completado(gps) {
    "use strict";
    require(["scripts/libreria.js"], function (Libreria) {
		function sendSucess() {
            window.location = "./page8.do";
        }
		setTimeout(function () {
			Libreria.device.sendMessage(number, "SecureRun service: Hello, I'am at Lat: " + gps.coords.latitude + " Long: " + gps.coords.longitude, sendSucess);
		}, timeout * 1000);
	});
}

function whenColision() {
    "use strict";
    require(["scripts/libreria.js"], function (Libreria) {
        if (vibration) {
            Libreria.vibrate([200, 50, 200, 50, 200, 50, 200]);
        }
        if (beep) {
            Libreria.beep(beeptimes);
        }
        if (notification) {
            Libreria.notificate("SecureRun", "Colision detected");
        }
		var element = document.getElementById("ln2");
		element.className = "link btn btn-danger btn-block";
		Libreria.geolocation.getCurrentPosition(completado);
    });
}


function storeAcelerometer(accel) {
    "use strict";

    if (i < max) {
        array_x[i] = roundNumber(accel.accelerationIncludingGravity.x);
        array_y[i] = roundNumber(accel.accelerationIncludingGravity.y);
        array_z[i] = roundNumber(accel.accelerationIncludingGravity.z);
    } else {
        array_x.shift();
        array_x.push(roundNumber(accel.accelerationIncludingGravity.x));
        array_y.shift();
        array_y.push(roundNumber(accel.accelerationIncludingGravity.y));
        array_z.shift();
        array_z.push(roundNumber(accel.accelerationIncludingGravity.z));
    }
    i = i + 1;

    max_valx = array_x[0];
    min_valx = array_x[0];
    max_valy = array_y[0];
    min_valy = array_y[0];
    max_valz = array_z[0];
    min_valz = array_z[0];

    //alert(array[0]+' '+array[1]);
    for (j = 0; j < array_x.length; j = j + 1) {
        if (array_x[j] > max_valx) {
            max_valx = array_x[j];
        }
        if (array_x[j] < min_valx) {
            min_valx = array_x[j];
        }
        if (array_y[j] > max_valy) {
            max_valy = array_y[j];
        }
        if (array_y[j] < min_valy) {
            min_valy = array_y[j];
        }
        if (array_z[j] > max_valz) {
            max_valz = array_z[j];
        }
        if (array_z[j] < min_valz) {
            min_valz = array_z[j];
        }
    }


    if (colisiona === false) {
        if (((max_valx - min_valx) > range) || ((max_valy - min_valy) > range) || ((max_valz - min_valz) > range)) {
            whenColision();
            colisiona = true;

        }
    }
}

function stringToBool(cad) {
	"use strict";
	return (cad.indexOf("yes") !== -1);
}

function startService() {
    "use strict";
	var element;
	element = document.getElementById("idNumber");
    number = element.innerHTML;
	element = document.getElementById("idVibration");
    vibration = stringToBool(element.innerHTML);
	element = document.getElementById("idNotification");
    notification = stringToBool(element.innerHTML);
	element = document.getElementById("idBeep");
    beep = stringToBool(element.innerHTML);
	element = document.getElementById("idBeep_times");
    beeptimes = parseInt(element.innerHTML, 10);
	element = document.getElementById("idTimeout");
    timeout = parseInt(element.innerHTML, 10);

    require(["scripts/libreria.js"], function (Libreria) {
        Libreria.getAcelerometer(function (objAcel) {
            objAcel.addEventListener("devicemotion", storeAcelerometer);
        });
    });
}