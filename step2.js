// imports
const fs = require('fs');
const axios = require('axios');

// Prompt One
function cat(path) {
    // Using fs import var's readFile method, the path is opened and read
    fs.readFile(path, "utf8", (err, data) => {
        // Conditional acts as error handling, both logging errs and shutting down process
        if(err) {
            console.log(err);
            process.exit(1);
        } else {
            // Without any err we can log the file's data
            console.log(data);
        }
    });
}

// Prompt2
async function webCat(url) {
    try {
        // resp var stores response from axios get request to url
        const resp = await axios.get(url);
        console.log(resp.data);
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    };
}

let path = process.argv[2];

if(path.slice(0,4) === 'http'){
    webCat(path);
} else {
    cat(path);
};