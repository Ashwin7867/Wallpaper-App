export function fetchImages(pagecount, token) {
    const temp = "Bearer ".concat(token);
    const req_data = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : '*',
            'Authorization' : temp
        }
    }
    const url = "http://localhost:4000/images/?p=".concat(pagecount);
    return fetch(url, req_data)
        .then(response => response.json())
        .then(json_data => {
            console.log('These are the images objects from fetchimages api', json_data);
            return json_data
        })
        .catch(error => console.log(error))
}

export const getImageFromId = id =>
  `https://unsplash.it/${600}/${600}?image=${id}`;