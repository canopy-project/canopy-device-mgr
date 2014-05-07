function CanoPlotNode()
{
    /*google.load("visualization", "1", {packages:["corechart"]});*/
    //google.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Hour of Day', 'Length'],
                ['1am', 0],
                ['2am', 0],
                ['3am', 0],
                ['4am', 0],
                ['5am', 1],
                ['6am', 40],
                ['7am', 60],
                ['8am', 36],
                ['9am', 12],
                ['10am', 0],
                ['11am', 2],
                ['12pm', 8],
                ['1pm', 3],
                ['2pm', 0],
                ['3pm', 0],
                ['4pm', 0],
                ['5pm', 0],
                ['6pm', 0],
                ['7pm', 8],
                ['8pm', 0],
                ['9pm', 0],
                ['10pm', 6],
                ['11pm', 0],
                ['12pm', 0],
                ]);

        var options = {
            title: '# Toastings by time of day (over past 12 months)',
            legend: { position: 'none' },
            chartArea : {left: 24, top: 24, width: '100%', height: '80%'},
            height: 400,
            fontName : "Titillium Web",
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    drawChart();
    window.onresize = drawChart;
}

