// --------------------DC SLIDER--------------------
var dcsliderval;
function dcsliderChange() {
  dcsliderval = document.getElementById("dc-slider").value;
  document.getElementById("dc-value").value = dcsliderval;
  fbias();
}
// --------------------RL SLIDER--------------------
var rlsliderval;
function rlsliderChange() {
  rlsliderval = document.getElementById("rl-slider").value;
  document.getElementById("rl-value").value = rlsliderval;
  fbias();
}
// --------------------TEMP SLIDER--------------------
var tempsliderval;
function tpsliderChange() {
  tempsliderval = document.getElementById("tp-slider").value;
  document.getElementById("temp-value").value = tempsliderval;
  fbias();
}
var tc;
function txtchng() {
    tc = document.getElementById("dc-value").value;
    document.getElementById("dc-slider").value = tc;
}
var rc;
function txtchnge() {
    rc = document.getElementById("rl-value").value;
    document.getElementById("rl-slider").value = rc;
}
var rtc;
function txtchnge() {
    rtc = document.getElementById("temp-value").value;
    document.getElementById("tp-slider").value = rtc;
}
// --------------------FORWARD BIAS SIMULATOR--------------------
var rl,vs,rt,vt,irev,isc,nl1,nl2,vd,id;
var n = 1, vfmin = 0.6, vfmax = 0.7, rd = 0.3, k = 273, dn = 11600, rtmax = 100, rtmin = 26, iscmax = 50, iscmin = 5;

function fbias(){
  vs = document.getElementById("dc-value").value;
  rl = document.getElementById("rl-value").value;
  rt = document.getElementById("temp-value").value;

  vt = (parseInt(k) + parseFloat(rt))/parseInt(dn);
  irev = ((parseInt(iscmax)-(parseInt(iscmin))/(parseInt(rtmax))-parseInt(rtmin))) * ((parseFloat(rt)-parseInt(rtmin))) + parseInt(iscmin);
  isc = parseInt(irev) * Math.pow(10,-12);
  nl1 = (parseFloat(vs) / parseInt(rl));
  nl2 = Math.log(nl1 / isc);
  vd = n * vt * nl2; //Forward voltage across the diode in VOLTS
  id = ((parseFloat(vs) - parseFloat(vfmin)) / ((parseInt(rl))+parseFloat(rd))) * Math.pow(10, 3); //Forward current across the diode in MICROAMPERE

  if (vs < vfmin) {
    document.getElementById("am-value").value = 0;
    document.getElementById("vm-value").value = 0;
  }
  else {
    document.getElementById("am-value").value = id.toPrecision(3);//in MICROAMPERE
    document.getElementById("vm-value").value = vd.toPrecision(3);//in VOLTS
  }
}
// --------------------TABULATION--------------------
var tabrowindex1 = 0;
var arr1 = [];
var table1;
var dcvolt1;
var columns1;
var dataPoints = [];
var p2;

var tabrowindex = 0;
var arr = [];
var table;
var dcvolt;
var columns;

function obstable() {
  table = document.getElementById("obs-table");
  arr[0] = tabrowindex + 1;
  arr[1] = document.getElementById("vm-value").value;
  arr[2] = document.getElementById("am-value").value;

  if (document.getElementById("dc-value").value == "") {
    alert("Enter the DC Source Voltage");
  }
  else if(document.getElementById("rl-value").value == "") {
    alert("Enter the Load Resistance Value");
  }
  else if (dcvolt == document.getElementById("dc-value").value) {
    alert("Vary the DC Source Voltage");
  }
  else if (table.rows.length <= 40) {

      var row = table.insertRow(++tabrowindex);
      for (var a = 0; a < 3; a++) {
      var cell = row.insertCell(a);
      cell.innerHTML = arr[a];
    }
  }
  columns = table.rows[tabrowindex].cells[1];
  dcvolt = columns.innerHTML;
}

function obstable1() {
  table1 = document.getElementById("obs-1-table");
  arr1[0] = tabrowindex1 + 1;
  arr1[1] = document.getElementById("vm-value").value;
  arr1[2] = document.getElementById("am-value").value;

  if (document.getElementById("dc-value").value == "") {
    alert("Enter the DC Source Voltage");
  }
  else if(document.getElementById("rl-value").value == "") {
    alert("Enter the Load Resistance Value");
  }
  else if (dcvolt1 == document.getElementById("dc-value").value) {
    alert("Vary the DC Source Voltage");
  }
  else if (table1.rows.length <= 40) {

      var row1 = table1.insertRow(++tabrowindex1);
      for (var b = 0; b < 3; b++) {
      var cell1 = row1.insertCell(b);
      cell1.innerHTML = arr1[b];
    }
  }
  columns1 = table1.rows[tabrowindex1].cells[1];
  dcvolt1 = columns1.innerHTML;
}
// --------------------CHANGE TEMPERATURE--------------------
function chngtemp() {
  document.getElementById("control-buttons").style.display = "none";
  document.getElementById("control-buttons-1").style.display = "block";
  document.getElementById("dc-slider").value = "";
  document.getElementById("rl-slider").value = "100";
  document.getElementById("dc-value").value = "";
  document.getElementById("rl-value").value = "";
}
// --------------------PLOTTING--------------------
// function plotting() {
//   for (var tabrowindex = 1; tabrowindex < table.rows.length; tabrowindex++) {
//     var p1 = table.rows[tabrowindex].cells;

//     dataPoints.push({x: parseFloat(p1[1].innerHTML), y: parseFloat(p1[2].innerHTML)});
//   }

//   p2 = new CanvasJS.Chart("vi-plot", {
//     theme: "theme1",
//     title: {text: "V-I CHARACTERISTICS OF A DIODE"},
//     legend: {verticalAlign: "bottom", horizontalAlign: "center"},
//     axisX: {title: "Voltage (V)", minimum:0, maximum:2},
//     axisY: {title:"Current (mAmp)"},
//     data: [{type: "line", dataPoints: dataPoints}]
//   });
//   p2.render();
// }

function plotting() {
  Highcharts.chart("vi-plot", {
    data: {
      table: "obs-table",
      startRow: 1,
      startColumn: 1,
      endColumn: 2
    },
    chart: {
      type: "spline"
    },
    title: {
      text: "V-I CHARACTERISTICS OF A DIODE IN A FORWARD BIAS CONDITION"
    },
    yAxis: {
      title: {
        text: "Forward Current in mAmp"
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      title: {
        text: "Forward Voltage in Volts"
      }
    },
    tooltip: {
      pointFormat: "{point.x}<b>{point.y}</b>"
    }
  });
  alert("Graph Plotted Successfully");
  document.getElementById("rev-btn").style.display = "block";
}

function plotting1() {
  Highcharts.chart("vi-plot-1", {
    data: {
      table: "obs-1-table",
      startRow: 1,
      startColumn: 1,
      endColumn: 2
    },
    chart: {
      type: "spline"
    },
    title: {
      text: "V-I CHARACTERISTICS OF A DIODE IN A FORWARD BIAS CONDITION AT INCREASED TEMPERATURE"
    },
    yAxis: {
      title: {
        text: "Forward Current in mAmp"
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      
      title: {
        text: "Forward Voltage in Volts"
      }
    },
    tooltip: {
      pointFormat: "{point.x}<b>{point.y}</b>"
    }
  });
  alert("Graph Plotted Successfully");
  document.getElementById("rev-btn").style.display = "block";
}
