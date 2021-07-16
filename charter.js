
const ChartJSImage = require('chart.js-image');
const { v4: uuidv4 } = require('uuid');


exports.getChart = async () => {
    const line_chart = ChartJSImage().chart({
        "type": "line",
        "data": {
            "datasets": [
                {
                    "label": "My First dataset",
                    "borderColor": "rgb(255,+99,+132)",
                    "backgroundColor": "rgba(255,+99,+132,+.5)",
                    "data": [
                        { x: '2017-01-06 18:39:30', y: 100 },
                        { x: '2017-01-07 18:39:28', y: 101 },
                    ]
                },
                {
                    "label": "My Second dataset",
                    "borderColor": "rgb(54,+162,+235)",
                    "backgroundColor": "rgba(54,+162,+235,+.5)",
                    "data": [
                        { x: '2017-01-07 18:00:00', y: 90 },
                        { x: '2017-01-08 18:00:00', y: 105 },
                    ]
                },
            ]
        },
        "options": {
            "title": {
                "display": true,
                "text": "Chart.js Line Chart"
            },
            "scales": {
                "xAxes": [
                    {
                        type: 'time',
                        time: {
                            displayFormats: {
                                millisecond: 'DD.MMM YYYY - HH:mm',
                                second: 'DD.MMM YYYY - HH:mm',
                                minute: 'DD.MMM YYYY - HH:mm',
                                hour: 'DD.MMM YYYY - HH:mm'
                            }
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time', 
                        }
                    }
                ]
            }
        }
    }) // Line chart
        .backgroundColor('white')
        .width(1920 / 2) // 500px
        .height(1080 / 2);

    return line_chart.toURL();
};

