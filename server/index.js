
import dataForge from 'data-forge';
import 'data-forge-fs' // For loading files.
import 'data-forge-indicators';// For the moving average indicator.
import 'data-forge-plot';
import '@plotex/render-image'; // Extends Data-Forge Plot with the 'renderImage' function.
import { backtest, analyze, computeEquityCurve, computeDrawdown } from 'grademark';

import Table from 'easy-table';

import fs from 'fs';
import moment from 'moment';

export function getBacktest(req, res, next) {
    let ticker = req.params.ticker;
    let type = req.params.type;
    let typeDayCount = parseInt(type.substring(0, type.indexOf('DayMoving')));
    console.log('req.param', req.params)
    console.log('hi', ticker)
    let inputSeries = dataForge.readFileSync("server/stockTables/" + ticker + ".csv")     // Read input file.
    .parseCSV()
    .parseDates("Date", "YYYY/MM/DD")
    .dropSeries("Adj Close")               // Don't want column 5.
    .parseFloats(["Open", "High", "Low", "Close", "Volume"])
    .setIndex("Date") // Index so we can later merge on date.
    .renameSeries({ Date: "time",  Open: "open", "High": "high", "Close": "close", "Volume": "volume"});
    

    const movingAverage = inputSeries
        .deflate(bar => bar.close)          // Extract closing price series.
        .sma(typeDayCount);                           // typeDayCount day moving average.

    inputSeries = inputSeries
        .withSeries("sma", movingAverage)   // Integrate moving average into data, indexed on date.
        .skip(typeDayCount)                           // Skip blank sma entries.

    const strategy = {
        entryRule: (enterPosition, args) => {
            if (args.bar.close < args.bar.sma) { // Buy when price is below average.
                enterPosition({ direction: "long" }); // Long is default, pass in "short" to short sell.
            }
        },

        exitRule: (exitPosition, args) => {
            if (args.bar.close > args.bar.sma) {
                exitPosition(); // Sell when price is above average.
            }
        },

        stopLoss: args => { // Optional intrabar stop loss.
            return args.entryPrice * (5/100); // Stop out on 5% loss from entry price.
        },
    };

    const trades = backtest(strategy, inputSeries)
    console.log("Made " + trades.length + " trades!");

    const dataFrame = new dataForge.DataFrame(trades)
        .transformSeries({
            entryTime: d => moment(d).format("YYYY/MM/DD"),
            exitTime: d => moment(d).format("YYYY/MM/DD"),
        })
        .asCSV()
        .writeFileSync("server/output/trades.csv");

        console.log('dataFrame', dataFrame);

    const startingCapital = 10000;
    const analysis = analyze(startingCapital, trades);
    console.log(analysis);


    const analysisTable = new Table();

    for (const key of Object.keys(analysis)) {
        analysisTable.cell("Metric", key);
        analysisTable.cell("Value", analysis[key]);
        analysisTable.newRow();
    }

    const analysisOutput = analysisTable.toString();
    console.log(analysisOutput);
    const analysisOutputFilePath = "server/output/analysis.txt";
    fs.writeFileSync(analysisOutputFilePath, analysisOutput);
    console.log(">> " + analysisOutputFilePath);
    let typeString = type + 'analysis';

    console.log("Plotting...");
    const plotting = async (dataFrame) => {
        // Visualize the equity curve and drawdown chart for your backtest:
        // const equityCurve = computeEquityCurve(startingCapital, trades);
        // const equityCurveOutputFilePath = "server/output/my-equity-curve.png";
        // await dataFrame.plot(equityCurve, { chartType: "area", y: { label: "Equity $" }})
        //     .renderImage(equityCurveOutputFilePath);
        // console.log(">> " + equityCurveOutputFilePath);

        // const equityCurvePctOutputFilePath = "server/output/my-equity-curve-pct.png";
        // const equityPct = equityCurve.map(v => ((v - startingCapital) / startingCapital) * 100);
        // await dataFrame.plot(equityPct, { chartType: "area", y: { label: "Equity %" }})
        //     .renderImage(equityCurvePctOutputFilePath);
        // console.log(">> " + equityCurvePctOutputFilePath);
            
        // const drawdown = computeDrawdown(startingCapital, trades);
        // const drawdownOutputFilePath = "server/output/my-drawdown.png";
        // await dataFrame.plot(drawdown, { chartType: "area", y: { label: "Drawdown $" }})
        //     .renderImage(drawdownOutputFilePath);
        // console.log(">> " + drawdownOutputFilePath);
            
        // const drawdownPctOutputFilePath = "server/output/my-drawdown-pct.png";
        // const drawdownPct = drawdown.map(v => (v / startingCapital) * 100);
        // await dataFrame.plot(drawdownPct, { chartType: "area", y: { label: "Drawdown %" }})
        //     .renderImage(drawdownPctOutputFilePath);
        // console.log(">> " + drawdownPctOutputFilePath);
    }
    // plotting(dataFrame);
    // dataFrame.plot(equityCurve, { chartType: "area", y: { label: "Equity $" }})
    //         .renderImage(equityCurveOutputFilePath);
    res.status(200).json({ typeString: analysis });
}