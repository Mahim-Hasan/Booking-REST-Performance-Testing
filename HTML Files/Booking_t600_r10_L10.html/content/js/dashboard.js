/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 95.14047619047619, "KoPercent": 4.859523809523809};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5953095238095238, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.447, 500, 1500, "PartialUpdateBooking"], "isController": false}, {"data": [0.6685, 500, 1500, "GetBooking"], "isController": false}, {"data": [0.6548333333333334, 500, 1500, "Get Updated Booking"], "isController": false}, {"data": [0.43733333333333335, 500, 1500, "DeleteBooking"], "isController": false}, {"data": [0.5895, 500, 1500, "CreateBooking"], "isController": false}, {"data": [0.9098333333333334, 500, 1500, "CreateToken"], "isController": false}, {"data": [0.46016666666666667, 500, 1500, "UpdateBooking"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 42000, 2041, 4.859523809523809, 1061.4127380952348, 0, 29495, 406.0, 1815.0, 2660.9000000000015, 6325.980000000003, 425.7130693912303, 172.0039868630775, 121.17252196350017], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["PartialUpdateBooking", 6000, 541, 9.016666666666667, 1225.6920000000018, 0, 12530, 1180.0, 2100.800000000001, 2506.0, 5221.229999999961, 63.22911068255825, 25.35507920763386, 18.369651788725196], "isController": false}, {"data": ["GetBooking", 6000, 88, 1.4666666666666666, 936.0791666666681, 0, 28695, 924.0, 1272.0, 1590.9499999999998, 5363.899999999998, 63.038453456608536, 29.0469579021328, 11.49995198242803], "isController": false}, {"data": ["Get Updated Booking", 6000, 260, 4.333333333333333, 878.896, 0, 29495, 872.0, 1239.0, 1444.0, 4704.679999999971, 63.15789473684211, 34.10130550986842, 11.39514802631579], "isController": false}, {"data": ["DeleteBooking", 6000, 653, 10.883333333333333, 1145.7288333333317, 0, 25350, 1056.5, 2042.0, 2261.0, 3914.959999999999, 63.32119677061897, 18.21752067832832, 14.543118601920744], "isController": false}, {"data": ["CreateBooking", 6000, 109, 1.8166666666666667, 1495.0621666666682, 0, 24521, 966.0, 3143.9000000000005, 6437.749999999999, 13612.809999999996, 61.82443920081608, 28.355239685622724, 25.472705395599128], "isController": false}, {"data": ["CreateToken", 6000, 56, 0.9333333333333333, 538.9613333333352, 0, 12160, 385.0, 1017.9000000000005, 1377.9499999999998, 5048.98, 63.04308995198218, 17.712337828218086, 15.679936963477036], "isController": false}, {"data": ["UpdateBooking", 6000, 334, 5.566666666666666, 1209.4696666666666, 0, 18738, 1165.0, 2090.0, 2355.95, 4231.99, 63.059654433093705, 25.176053851631146, 28.29215940232585], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["503/Service Unavailable", 390, 19.10828025477707, 0.9285714285714286], "isController": false}, {"data": ["405/Method Not Allowed", 186, 9.113179813816757, 0.44285714285714284], "isController": false}, {"data": ["403/Forbidden", 572, 28.02547770700637, 1.361904761904762], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 390, 19.10828025477707, 0.9285714285714286], "isController": false}, {"data": ["404/Not Found", 503, 24.644781969622734, 1.1976190476190476], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 42000, 2041, "403/Forbidden", 572, "404/Not Found", 503, "503/Service Unavailable", 390, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 390, "405/Method Not Allowed", 186], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["PartialUpdateBooking", 6000, 541, "403/Forbidden", 229, "503/Service Unavailable", 126, "404/Not Found", 109, "405/Method Not Allowed", 62, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 15], "isController": false}, {"data": ["GetBooking", 6000, 88, "503/Service Unavailable", 54, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 19, "404/Not Found", 15, "", "", "", ""], "isController": false}, {"data": ["Get Updated Booking", 6000, 260, "404/Not Found", 161, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 84, "503/Service Unavailable", 15, "", "", "", ""], "isController": false}, {"data": ["DeleteBooking", 6000, 653, "403/Forbidden", 266, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 126, "404/Not Found", 109, "503/Service Unavailable", 90, "405/Method Not Allowed", 62], "isController": false}, {"data": ["CreateBooking", 6000, 109, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 90, "503/Service Unavailable", 19, "", "", "", "", "", ""], "isController": false}, {"data": ["CreateToken", 6000, 56, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 54, "503/Service Unavailable", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["UpdateBooking", 6000, 334, "404/Not Found", 109, "503/Service Unavailable", 84, "403/Forbidden", 77, "405/Method Not Allowed", 62, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: restful-booker.herokuapp.com:443 failed to respond", 2], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
