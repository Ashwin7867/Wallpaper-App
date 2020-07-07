export function signupApi(signupdata) {
    console.log(signupdata);
    const req_data = {
        method: 'POST',
        body : JSON.stringify(signupdata),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : '*'
        }
    }
    return fetch("http://localhost:4000/users/signup/", req_data)
        .then((response) => {
            const status = response.status;
            return status;
        })    
        .catch(error => console.log(error))
}