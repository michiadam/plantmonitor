
const { v4: uuidv4 } = require('uuid');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
}
function roundMinutes(date) {
 
    date.setMinutes(date.getMinutes(), 0, 0); // Resets also seconds and milliseconds

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute:'numeric' };

    return date.toLocaleDateString('de-DE', options);
}
exports.getChart = async (bot, chatId, data) => {


    const width = 800; //px
    const height = 600; //px
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });



    let dataset = []

    for (const [key, value] of Object.entries(groupBy(data, 'name'))) {
        let entry = {};
        entry.label = key; 
        entry.borderColor = random_rgb();
        data = [];

        value.forEach(element => {
            data.push({ x: roundMinutes(new Date(element["time"])), y: element["data"] });
        });
 

        entry.data = data;
        

        dataset.push(entry);
    }

    console.log(dataset);
    dataset.forEach(async (set)=>{
        const configuration = {
            "type": "line",
            "data": {
                "datasets": [set]
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
                            unit: 'minute',
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
    
        };
        const dataUrl = await chartJSNodeCanvas.renderToBuffer(configuration);
    
        bot.sendPhoto(chatId,  await chartJSNodeCanvas.renderToBuffer(configuration), {
            caption: set.label
        }); 
    })
   
};

