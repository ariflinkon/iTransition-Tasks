const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { sha3_256 } = require('js-sha3');

// Function to calculate SHA3-256 hash of a file
function calculateFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return sha3_256(fileBuffer);
}

// Function to process all files in a directory
async function processFiles(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    const hashes = [];

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const hash = calculateFileHash(filePath);
        hashes.push(hash);
    }

    return hashes;
}

// Main function
async function main() {
    // 1. Download and extract the archive
    const zipFilePath = 'task2.zip';
    const extractPath = 'extracted_files';
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(extractPath, true);

    // 2. Process files and calculate hashes
    const hashes = await processFiles(extractPath);

    // 3. Sort hashes
    const sortedHashes = hashes.sort();

    // 4. Concatenate sorted hashes
    const concatenatedHashes = sortedHashes.join('');

    // 5. Append email address
    const email = 'arifjahanlinkon7931@gmail.com';
    const concatenatedWithEmail = concatenatedHashes + email.toLowerCase();

    // 6. Calculate final SHA3-256 hash
    const finalHash = sha3_256(concatenatedWithEmail);

    console.log('Final hash:', finalHash);
}

main().catch(console.error);