import AppBasedDriver from "../appbaseddriver"

export async function CheckEmailAddress(emailaddress) {
    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI


    var APIURL = `${serverAPI}/appbaseddriver/${emailaddress}/checkemailaddress`

    return fetch(APIURL, {
        credentials: 'include'

    })
        .then(resp => {

            if (!resp.ok) {
           
              
                if (resp.status >= 400 && resp.status < 500) {
                  
                    return resp.json().then(data => {
                      
                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}


export async function RemoveReceipt(values) {
    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI

    const APIURL = `${serverAPI}/appbaseddriver/removereceipt`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}



export async function UploadReceipt(values) {
    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI

    const APIURL = `${serverAPI}/appbaseddriver/uploadreceipt`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        body: values
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function AppleLogin(values) {
    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI
 

    const APIURL = `${serverAPI}/appbaseddriver/users/clientlogin`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function SaveDriver(values) {
   
    const driverid = values.myuser.driverid;
    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI
    let APIURL = `${serverAPI}/appbaseddriver/${driverid}/savedriver`
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

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

export async function LogoutUser(driverid) {
    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI

    let APIURL = `${serverAPI}/appbaseddriver/${driverid}/logout`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
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

export async function CheckDriverID(driverid) {

    const appbaseddriver = new AppBasedDriver();
    const serverAPI = appbaseddriver.enviornmentalVariables().serverAPI

    var APIURL = `${serverAPI}/appbaseddriver/${driverid}/checkdriverid`

    return fetch(APIURL, { credentials: 'include' })
        .then(resp => {

            if (!resp.ok) {
                console.log(`response status ${resp.status}`)
            
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                
            }

            return resp.json();
        })
}


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