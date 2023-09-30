import * as fs from 'fs';

export function writeToFile(filename: string, data: any): void {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log(`Data written to file ${filename}`);
    });
}