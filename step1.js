// imports
const fs = require('fs');
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

// We call cat on process.argv[2] because that is the index where addtional args begin
cat(process.argv[2]);