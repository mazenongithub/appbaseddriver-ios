import AppBasedDriver from "../appbaseddriver"


export async function  CheckUser() {
    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI
    console.log(`SERVER API: ${serverAPI}`)
   
    return fetch(`${serverAPI}/appbaseddriver/checkuser`, { credentials: 'include' }).then(resp => {
        

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}