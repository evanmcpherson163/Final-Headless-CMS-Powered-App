// use node default modules for fs and path
//import fs from 'fs';
//import path from 'path';

import got from 'got';

// const dataDirectory = path.join( process.cwd(), 'data' );

const dataURL = "https://dev-headless-cms-powered-app.pantheonsite.io/wp-json/twentytwentyone-child/v1/movies";



export async function getSortedList(){
    //get filepath to json file
    //const filePath = path.join(dataDirectory , 'data1.json');
    //load jsong file contents
    //const jsonString = fs.readFileSync(filePath , 'utf8');
    let jsonString;
    try{
        //console.log(dataURL);
        jsonString = await got(dataURL);
        //console.log(jsonString);
    } catch(error){
        jsonString = {body: ""};
        console.log(error);
    }
    //convert string from file into json array object
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);

  /*  jsonObj.forEach(
        function(item){
            let x = '{"' + item.acf_fields + '"}';

            x = x.replaceAll(',','","');

            x = x.replaceAll(':','":"');

            let y = JSON.parse(x);
            console.log(y);
            console.log(y.first_name);
            item.acf_fields = y;
        }
    );
    */

    //sort json array by name property
    jsonObj.sort(
        function(a,b){
            return a.post_title.localeCompare(b.name);
        }
    );
    //use map() on array to extract just id + name properties into new array of obj values
    return jsonObj.map(
        function(item){
            return{
                id: item.ID.toString(),
                name: item.post_title
            };
        }
    );
}

export async function getAllIds(){
    //get filepath to json file
    //const filePath = path.join(dataDirectory , 'data1.json');
    //load jsong file contents
    //const jsonString = fs.readFileSync(filePath , 'utf8');
    let jsonString;
    try{
        jsonString = await got(dataURL);
        //console.log(jsonString.body);
    } catch(error){
        jsonString.post_content = [];
        console.log(error);
    }
    //convert string from file into json array object
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);
    //use map() on array to extract just id + name properties into new array of obj values
    return jsonObj.map(
        function(item){
            return{
                params: {
                id: item.ID.toString(),
                }
            };
        }
    );
}

// function return ALL of the preperty for one single object with a matching id property value
export async function getData(idRequested){
    //get filepath to json file
    //const filePath = path.join(dataDirectory , 'data1.json');
    //load jsong file contents
    //const jsonString = fs.readFileSync(filePath , 'utf8');
    let jsonString;
    try{
        jsonString = await got(dataURL);
        //console.log(jsonString.body);
    } catch(error){
        jsonString.body = [];
        console.log(error);
    }
    //convert string from file into json array object
    //const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);
    // find object value in array that has matching id
    const objMatch = jsonObj.filter(
        function(obj) {
            return obj.ID.toString() === idRequested;
        }
    );

    // extract object value in filtered array if any 
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else{
        objReturned = {};
    }

    //return object value found
    return objReturned;
}