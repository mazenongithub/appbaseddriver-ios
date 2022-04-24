import { CheckUser } from './actions/api'
import { getMonString, sorttimes, compareDates } from './functions'
import { MyStylesheet } from './styles';
import { View, Text } from 'react-native'
import { AppleLogin, LogoutUser, SaveDriver } from './actions/api'

class AppBasedDriver {

    enviornmentalVariables() {
        const variables = {
            development: {
                serverAPI: 'http://34.205.24.143:8081'
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

        if (this.props.navigation) {
            navigation = this.props.navigation;
            if (navigation.hasOwnProperty("equipmentid")) {

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
                height: 59
            })
        } else {
            return ({
                width: 49,
                height: 49
            })
        }

    }

    getdropicon() {
        if (this.state.width > 1200) {
            return (
                {
                    width: 93
                })

        } else if (this.state.width > 600) {
            return (
                {
                    width: 78
                })

        } else {
            return (
                {
                    width: 62
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

        this.setState({ uistart: year - 3, uiend: year })
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
        if (this.state.width < this.state.height) {
            return ('portrait')
        } else {
            return ('landscape')
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

    validatesavedriver() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)

        let error = "";
        if (myuser) {

            if (myuser.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                myuser.equipment.map(equipment => {

                    if (equipment.hasOwnProperty("repayment")) {
                        if (!compareDates(equipment.purchasedate, equipment.salvagedate)) {
                            error += `${equipment.equipment} purchase date ${equipment.repayment.purchasedate} is less than the salvage date ${equipment.repayment.salvagedate}`
                        }
                    }
                })

            }

        } else {
            error += `There is no user Logged In `


        }
        return error;
    }



    async savedriver() {

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const message = appbaseddriver.validatesavedriver.call(this)
        if (!message) {
            if (myuser) {

                try {

                    this.setState({ spinner: true })
                    let response = await SaveDriver({ myuser })
                    console.log(response)
                    if (response.hasOwnProperty("driverid")) {
                        this.props.reduxUser(response)
                        let message = `Driver Updated ${new Date().toLocaleTimeString()}`
                        this.setState({ spinner: false, message })
                    }


                } catch (err) {
                    alert(err);
                    this.setState(({ spinner: false }))

                }
            }

        } else {
            this.setState({ message })
        }


    }



    showsavedriver() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const menufont = appbaseddriver.getHeaderFont.call(this)
        const regularFont = appbaseddriver.getRegularFont.call(this)

        if (!this.state.spinner) {
            return (

                <View style={{ ...styles.generalFlex, ...styles.padding5, ...styles.bottomMargin10 }}>
                    <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                    <View style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}>{this.state.message} </Text>
                    </View>

                        <View style={{
                            ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter,
                            ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin
                        }} >
                            <Text
                                onPress={() => {
                                    appbaseddriver.savedriver.call(this)
                                }}
                                style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>Save Driver</Text>
                        </View>

                                
                    </View>
                </View>
            )
        } 
    }

    async logoutuser() {
        console.log("logout user")

    }



}
export default AppBasedDriver;