const apiData = [];
async function fetchData() { // fetch stop directions api
    try{
        const api = `https://data.cityofnewyork.us/resource/f9bf-2cp4.json`;
        const response = await fetch(api);
        const data = await response.json();
        apiData.push(data);
        if(response.status != 200){
            throw new Error(response.statusText);
        }
    } catch (error){
        console.log(error, "API Error");
    }
};
fetchData();
export {apiData};