# app-ads.txt generation script

## This process download the app-ads.txt from https://wildlifestudios.com/app-ads.txt 
## and inserts all the new lines introduced in the input.json. Once finished, the new app-ads.txt 
## be seen as "app-ads.txt".

# How to execute 

## Install dependencies

`npm ci`

## Run script

First, introduce the new lines in a file called `input.json`. For example, you should generate this file if you would like to add the following lines:

```json
[
  "adcolony.com,382d79cd1387e603,reseller,1ad675c9de6b5176",
  "adcolony.com,7d04a18a58085918,reseller,1ad675c9de6b5176",
]
```

Then execute:

`node app-ads-process.js`

## Check the result

In `app-ads.txt` you can see the new app-ads.txt information.
