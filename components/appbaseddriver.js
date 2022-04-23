import { CheckUser } from './actions/api'
import {getMonString, sorttimes} from './functions'


class AppBasedDriver {

    enviornmentalVariables() {
        const variables = {
            development: {
                serverAPI:'http://44.203.141.218:8081'
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

    getEquipmentID() {
        let equipmentid = "";
        let navigation = {};
      
        if(this.props.navigation) {
            navigation = this.props.navigation;
            if(navigation.hasOwnProperty("equipmentid")) {
           
                equipmentid = navigation.equipmentid;

            } 

        } 
        return equipmentid;
    }

    radioIconWidth() {
        if (this.state.width > 1200) {
            return ({ width: 60 })
        } else if (this.state.width > 600) {
            return ({ width: 50 })
        } else {
            return ({ width: 40 })
        }
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

    getgocheckheight() {
        if (this.state.width > 1200) {
            return ({
                width: 69,
                height: 69
            })
        } else if (this.state.width > 600) {
            return ({
                width: 59,
                height:59
            })
        } else {
            return ({
                width: 49,
                height: 49
            })
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


    getequipmentkeybyid(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        const myequipment = appbaseddriver.getequipment.call(this)
        let key = false;
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map((equipment, i) => {

                if (equipment.equipmentid === equipmentid) {
                    key = i;
                }
            })
        }

        return key;

    }

    getequipmentcostkeybyid(equipmentid, costid) {

        const appbaseddriver = new AppBasedDriver();
        const costs = appbaseddriver.getequipmentscosts.call(this, equipmentid)
        let key = false;
        if (costs) {
            // eslint-disable-next-line
            costs.map((cost, i) => {
                if (cost.costid === costid) {
                    key = i
                }
            })
        }
        return key;

    }

    getequipmentscosts(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        let costs = false;
        if (equipment) {
            if (equipment.hasOwnProperty("costs")) {
                costs = equipment.costs;
                costs.sort((a, b) => {
                    return sorttimes(a.purchasedate, b.purchasedate)
                })
            }
        }
        return costs;

    }


    getequipmentcostbyid(equipmentid, costid) {
        const appbaseddriver = new AppBasedDriver();
        const costs = appbaseddriver.getequipmentscosts.call(this, equipmentid)
        let mycost = false;
        if (costs) {
            // eslint-disable-next-line
            costs.map(cost => {
                if (cost.costid === costid) {
                    mycost = cost;
                }
            })
        }
        return mycost;

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


    getequipmentbyid(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        const myequipment = appbaseddriver.getequipment.call(this)
        let getequipment = false;

        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipment => {

                if (equipment.equipmentid === equipmentid) {
                    getequipment = equipment;
                }
            })
        }

        return getequipment;

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