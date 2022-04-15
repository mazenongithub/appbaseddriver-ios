import { CheckUser } from './actions/api'

class AppBasedDriver {

    async checkuser() {
             
        try {
          let response = await CheckUser();
          if (response.hasOwnProperty("driverid")) {
            this.props.reduxUser(response)
            this.setState({ render: 'render' })
          }
    
        } catch (err) {
        
          
          alert(err)
        }
      }


    enviornmentalVariables() {
        const variables = {
            development: {
                serverAPI:'http://184.73.117.155:8081'
            },
            production: {
                serverAPI: 'https://api.civilengineer.io'
            }
        };

        if (__DEV__) {

            return variables.development; // return this if in development mode
        }

        return variables.production; // otherwise, return this
    }

    getOrientation() {
        if(this.state.width<this.state.height) {
            return ('portrait')
        } else {
            return('landscape')
        }
    }

    getNavigation() {
        let nav = false;
        if (this.props.hasOwnProperty("navigation")) {
            nav = this.props.navigation;

        }
        return nav;
    }

    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("driverid")) {
                user = this.props.myusermodel
            }
        }
        return user;
    }

    async logoutuser() {
        console.log("logout user")

    }



}
export default AppBasedDriver;