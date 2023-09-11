const fs = require('fs');
const Papa = require('papaparse');

function csvToJson(csv) {
    const parsed = Papa.parse(csv, {
        header: false,
        skipEmptyLines: true
    });

    const jsonData = {
        "languages": parsed.data.map((row, index) => ({
            "id": index + 1,
            "name": row[0],
            "iso_639_1": row[1],
        }))
    };

    return jsonData;
}

function convertCsvFileToJSON(filePath) {
    const csvData = fs.readFileSync(filePath, 'utf-8');
    const result = csvToJson(csvData);
    console.log(`CSV file ${filePath} has been converted to JSON.`);
    console.log(result);
    return result;
}

function writeJsonToFile(jsonData, outputPath) {
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(outputPath, jsonString, 'utf-8');
    console.log(`JSON data has been written to ${outputPath}`);
}

const filePath = 'languages.csv';  // Replace with the path to your CSV file.
const outputPath = 'languages.json';  // Path to the output JSON file.

const jsonData = convertCsvFileToJSON(filePath);
writeJsonToFile(jsonData, outputPath);


// Path: libs/shared/data/languages/languages.json
// call in folder with: node language-converter.js
