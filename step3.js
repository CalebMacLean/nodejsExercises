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
        return resp;
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    };
}

// Prompt 3
async function changeOutput(output, input) {
    // declare content var that will be changed in diff cases
    let content = undefined;

    // Checking input to see if it is a url
    if(input.slice(0,4) === 'http') {
        // use webCat to get content from url
        content = await webCat(input)
            .then(resp => {return resp.data})
            .catch(err => {console.log(`Error with axios request: ${err}`)});

    } else {
        try {
            content = await fs.promises.readFile(input, "utf8");
        }
        catch (err) {
            console.log(`Error occured while reading file: ${err}`);
            process.exit(1);
        }
    };

    // use fs.writeFile to push content into output destination.
    fs.writeFile(output, content, "utf8", err => {
        if(err) {
            console.log(`Error with fs.writeFile: ${err}`);
            process.exit(1);
        } 
    });
}

let path = process.argv[2];

if(path.slice(0, 4) === 'http') {
    webCat(path);
} else if (path === '--out') {
    const output = process.argv[3];
    const input = process.argv[4]
    changeOutput(output, input);
} else {
    cat(path);
}