import { CheckUser } from './actions/api'
import {getMonString} from './functions'


class AppBasedDriver {

    enviornmentalVariables() {
        const variables = {
            development: {
                serverAPI:'http://18.233.165.160:8081'
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

    getRegularFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: 30 })
        } else if (this.state.width > 600) {
            return ({ fontSize: 24 })
        } else {
            return ({ fontSize: 20 })
        }
    }

    getHeaderFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: 36 })
        } else if (this.state.width > 600) {
            return ({ fontSize: 30 })
        } else {
            return ({ fontSize: 24 })
        }
    }

    getremoveicon() {
        if (this.state.width > 1200) {
            return ({ width: 50 })
        } else if (this.state.width > 600) {
            return ({ width: 40 })
        } else {
            return ({ width: 30 })
        }
    }


    getequipment() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        let equipment = false;
        if (myuser) {
            if (myuser.hasOwnProperty("equipment")) {
                equipment = myuser.equipment;
            }


        }

        return equipment;

    }


    createEquipmentList() {
        const appbaseddriver = new AppBasedDriver();
        const equipment = appbaseddriver.getequipment.call(this)
        let equipmentids = [];
        if (equipment) {

            // eslint-disable-next-line
            equipment.map(equip => {
                equipmentids.push(equip.equipmentid)
            })

        }
        if (equipmentids.length > 0) {
            return equipmentids;
        } else {
            return false;
        }

    }

    updateUI(year) {

        this.setState({ uistart:year - 3, uiend:year })
    }


    setUIMonth(month) {
        const activemonth = this.state.activemonth;
        if (activemonth.hasOwnProperty("length")) {
            const monthstring = getMonString(Number(month))
            if (activemonth.indexOf(monthstring) < 0) {

                activemonth.push(monthstring)

            }

        }


    }


    getshiftkeybyid(shiftid) {
        const appbaseddriver = new AppBasedDriver();
        const shifts = appbaseddriver.getshifts.call(this)
        let key = false;
        if (shifts) {
            // eslint-disable-next-line
            shifts.map((shift, i) => {
                if (shift.shiftid === shiftid) {
                    key = i;
                }
            })
        }
        return key;

    }

    getshifts() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this);
        let shifts = false;
        if (myuser) {
            if (myuser.hasOwnProperty("driver")) {
                if (myuser.driver.hasOwnProperty("shifts")) {
                    shifts = myuser.driver.shifts;
                }
            }
        }
        return shifts;
    }



    getshiftbyid(shiftid) {
        const appbaseddriver = new AppBasedDriver();
        const shifts = appbaseddriver.getshifts.call(this)
        let myshift = false;
        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {
                if (shift.shiftid === shiftid) {
                    myshift = shift;
                }
            })
        }
        return myshift;

    }

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