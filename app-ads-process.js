import fetch from 'node-fetch';
import  fs from 'fs';
import ObjectsToCsv from 'objects-to-csv';
import cp from 'child_process';

const execute  = async () => {
  const res = await fetch('https://wildlifestudios.com/app-ads.txt');
  const data = await res.text();
  let jsonFile = JSON.parse(fs.readFileSync('input.json'));
  jsonFile = jsonFile.filter((content,idx) => {
    if (jsonFile.indexOf(content) !== idx){
      return false;
    }
    return true;
  })
  const arrayAppAds = data.split('\r\n');
  const missingLines = [];
  for (const newLine of jsonFile){
    const exists = arrayAppAds.includes(newLine) || arrayAppAds.includes(newLine.replace(/\s/g, ''));
    if (!exists){
      console.log(newLine)
      missingLines.push(newLine);
    }
  }
  console.log(arrayAppAds.length);
  console.log(missingLines.length);
  const newAppAds = arrayAppAds.concat(missingLines);
  newAppAds.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  const toPrint = newAppAds.map((values) => {
    console.log(values);
    const v = values.split(',');
    return {
      domain:v[0],
      publisher:v[1],
      type:v[2],
      certificate: v.length > 3 ? v[3] : null
    }
  },{})


  const toCSV = new ObjectsToCsv(toPrint);

  await toCSV.toDisk('./raw-app-ads.txt',{headers:false});

  cp.exec("cat raw-app-ads.txt | sed 's/,*$//g' | tail -n +2 > app-ads.txt", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log('Process finished');
    console.log(`stdout: ${stdout}`);
  });
}

execute()
