/*=========================================================================================
    File Name: doughnut.js
    Description: Chartjs simple doughnut chart
    ----------------------------------------------------------------------------------------
    Item Name: Chameleon Admin - Modern Bootstrap 4 WebApp & Dashboard HTML Template + UI Kit
    Version: 1.0
    Author: ThemeSelection
    
==========================================================================================*/

// Doughnut chart
// ------------------------------
// $(window).on("load", function () {

//     //Get the context of the Chart canvas element we want to select
//     var ctx = $("#simple-doughnut-chart");

//     // Chart Options
//     var chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         responsiveAnimationDuration: 500,
//     };

//     var chartData = {
//         labels: ["Open", "On Progress", "Closed"],
//         datasets: [{
//             label: "My First dataset",
//             data: [3, 4, 19],
//             backgroundColor: ['#666EE8', '#FF9149', '#FF4961'],
//         }]
//     };

//     var config = {
//         type: 'doughnut',

//         // Chart Options
//         options: chartOptions,

//         data: chartData
//     };

//     // Create the chart
//     var doughnutSimpleChart = new Chart(ctx, config);

// });


$(window).on("load", function () {

    //Get the context of the Chart canvas element we want to select
    var ctx = $("#simple-doughnut-chart");

    // Hitung total
    const dataValues = [2, 6, 37];
    const totalValue = dataValues.reduce((a, b) => a + b, 0);

    // Custom plugin untuk menampilkan teks di tengah
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function (chart) {
            const width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

            ctx.restore();
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const centerX = width / 2;
            const centerY = height / 2;

            // Jarak antar baris
            const lineSpacing = 28;

            // Baris pertama: "Total"
            ctx.font = "20px sans-serif";
            ctx.fillText("Total", centerX, centerY - lineSpacing / 1);

            // Baris kedua: angka total
            ctx.font = "40px sans-serif";
            ctx.fillText(totalValue, centerX, centerY + 15);

            ctx.save();
        }
    };


    const ctxCanvas = document.getElementById('simple-doughnut-chart').getContext('2d');

    // Biru ke Ungu Cerah
    const gradientBlue = ctxCanvas.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, '#666EE8');  // biru dominan
    gradientBlue.addColorStop(1, '#5760e6');  // ungu muda (cerah dan soft)

    // Oranye ke Kuning Terang
    const gradientOrange = ctxCanvas.createLinearGradient(0, 0, 0, 300);
    gradientOrange.addColorStop(0, '#FF9149');  // oranye dominan
    gradientOrange.addColorStop(1, '#fa7d2a');  // kuning pastel (lemony)

    // (Opsional) Merah ke Merah Muda Cerah
    const gradientRed = ctxCanvas.createLinearGradient(0, 0, 0, 300);
    gradientRed.addColorStop(0, '#FF4961');  // merah utama
    gradientRed.addColorStop(1, '#f22e48');  // merah muda/soft pink

    // Chart Options
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 20,
                    padding: 25, // 👈 jarak antar item legend
                    font: {
                        size: 14
                    }
                }
            },
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 28
                },
                formatter: (value) => value
            }
        }
    };

    var chartData = {
        labels: ["Open", "On Progress", "Closed"],
        datasets: [{
            label: "My First dataset",
            data: dataValues,
            backgroundColor: [
                gradientOrange,
                gradientBlue,
                gradientRed
            ],
        }]
    };

    var config = {
        type: 'doughnut',
        options: chartOptions,
        data: chartData,
        plugins: [ChartDataLabels, centerTextPlugin] // pasang pluginnya di sini
    };

    // Create the chart
    new Chart(ctx, config);
});
