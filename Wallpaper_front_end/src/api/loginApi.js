export function loginApi(logindata) {
    console.log(logindata);
    const req_data = {
        method: 'POST',
        body : JSON.stringify(logindata),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : '*'
        }
    }
    return fetch("http://localhost:4000/users/login/", req_data)
        .then(async (response) => {
            const status = response.status;
            const json_data = await response.json();
            return {
                status : status,
                token : json_data['token']
            }
        })    
        .catch(error => console.log(error))
}