import { CheckUser } from './actions/api'
import { calculatetotalhours, getRepaymentCosts, getInterval, checkactivemonth, checkactivedate, validateLoanPayment, calculateTotalMonths, compareDates, sorttimes, getMonString} from './functions'
import { MyStylesheet } from './styles';
import { View, Text } from 'react-native'
import { AppleLogin, LogoutUser, SaveDriver } from './actions/api'
import * as AppleAuthentication from 'expo-apple-authentication';

class AppBasedDriver {

    enviornmentalVariables() {
        const variables = {
            development: {
                serverAPI: 'http://18.212.22.27:8081'
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

    getmiles() {
        const appbaseddriver = new AppBasedDriver();
        const shifts = appbaseddriver.getshifts.call(this)
        let miles = 0;
        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {
                if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                    miles += Number(shift.miles)

                }
            })

        }
        return miles;

    }

    getdrivercosts() {
        const appbaseddriver = new AppBasedDriver();
        let costs = 0;
        const myequipment = appbaseddriver.getequipment.call(this)
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                costs += Number(appbaseddriver.getcostsbyequipmentid.call(this, equipment.equipmentid))
            })
        }
        return costs;
    }

    gettransformedcostsbyequimentid(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)

        let costarray = [];
        if (equipment) {

            if (equipment.hasOwnProperty("repayment")) {
                const purchase = Number(equipment.repayment.purchase);
                const purchasedate = equipment.repayment.purchasedate;
                const salvage = Number(equipment.repayment.salvage);
                const salvagedate = equipment.repayment.salvagedate;
                const apr = Number(equipment.repayment.apr);
                // validate
                const validate = validateLoanPayment(purchase, purchasedate, salvage, salvagedate, apr)
                let payments = [];
                if (validate) {
                    payments = getRepaymentCosts(purchase, purchasedate, salvage, salvagedate, apr);
                    costarray = [...costarray, ...payments]

                } else if (purchase && !apr) {

                    payments = getInterval(salvagedate, purchasedate, 'monthly', ((purchase - salvage) / calculateTotalMonths(purchasedate, salvagedate)), 'repayment')
                    costarray = [...costarray, ...payments]

                }

            }

            if (equipment.hasOwnProperty("costs")) {

                // eslint-disable-next-line
                equipment.costs.map(cost => {


                    if (cost.hasOwnProperty("reoccurring")) {



                        if (equipment.hasOwnProperty("repayment")) {


                            const reoccurringcosts = getInterval(equipment.repayment.salvagedate, cost.purchasedate, cost.reoccurring.frequency, cost.amount, cost.detail)

                            costarray = [...costarray, ...reoccurringcosts]

                        }


                    } else {

                        costarray.push(cost)

                    }


                })




            }

        }
        costarray.sort((a, b) => {
            return sorttimes(a.purchasedate, b.purchasedate)
        })

        return costarray;
    }


    getcostsbyequipmentid(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        let mycosts = 0;
        const costs = appbaseddriver.gettransformedcostsbyequimentid.call(this, equipmentid)

        let activecosts = [];
        if (costs) {
            // eslint-disable-next-line
            costs.map(cost => {

                if (checkactivedate(cost.purchasedate, this.state.activemonth, this.state.activeyear)) {
                    activecosts.push(cost)
                    mycosts += Number(cost.amount)
                }


            })
        }

        return mycosts;
    }


    getdeliveries() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        let deliveries = 0;
        if (myuser) {

            if (myuser.hasOwnProperty("driver")) {

                if (myuser.driver.hasOwnProperty("shifts")) {
                    // eslint-disable-next-line
                    myuser.driver.shifts.map(shift => {

                        if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                            deliveries += Number(shift.deliveries);
                        }


                    })
                }
            }

        }
        return deliveries;
    }

    gethoursworked() {
        const appbaseddriver = new AppBasedDriver();
        const shifts = appbaseddriver.getshifts.call(this)
        let totalhours = 0;
        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {


                if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                    totalhours += calculatetotalhours(shift.timeout, shift.timein)

                }
            })

        }
        return totalhours;

    }

    getmilesbyequipmentid(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        const shifts = appbaseddriver.getshifts.call(this)
        let miles = 0;
        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {

                if (shift.hasOwnProperty("equipment")) {

                    if (shift.equipment.indexOf(equipmentid) > -1) {

                        if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                            miles += Number(shift.miles)

                        }

                    }

                }
            })

        }
        return miles;

    }


    gethoursworkedbyequipmentid(equipmentid) {

        const appbaseddriver = new AppBasedDriver();
        const shifts = appbaseddriver.getshifts.call(this)
        let totalhours = 0;
        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {

                if (shift.hasOwnProperty("equipment")) {

                    if (shift.equipment.indexOf(equipmentid) > -1) {


                        if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                            totalhours += calculatetotalhours(shift.timeout, shift.timein)

                        }


                    }

                }
            })

        }
        return totalhours;
    }


    getearnings() {
        const appbaseddriver = new AppBasedDriver();
        const shifts = appbaseddriver.getshifts.call(this)
        let earnings = 0;
        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {
                if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                    earnings += Number(shift.earnings)

                }
            })

        }
        return earnings;

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

    getEquipmentCostID() {
        let equipmentid = "";
        let navigation = {};

        if (this.props.navigation) {
            navigation = this.props.navigation;
       

                if(navigation.hasOwnProperty("costid")) {
                    console.log(`NAVIGATION COSTID: ${navigation.costid}`)
                    costid = navigation.costid;
                }

                

            

        }
        return costid;
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
            return ({ fontSize: 24 })
        } else if (this.state.width > 600) {
            return ({ fontSize: 20 })
        } else {
            return ({ fontSize: 16 })
        }
    }

    getHeaderFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: 30 })
        } else if (this.state.width > 600) {
            return ({ fontSize: 24 })
        } else {
            return ({ fontSize: 20 })
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

    getgoogleicon() {

        if (this.state.width > 1200) {
            return ({ width: 365, height: 87 })
        } else if (this.state.width > 600) {
            return ({ width: 277, height: 66 })
        } else {
            return ({ width: 140, height: 33 })
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



    getdeliveriesbyequipmentid(equipmentid) {

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        let deliveries = 0;
        if (myuser) {

            if (myuser.hasOwnProperty("driver")) {

                if (myuser.driver.hasOwnProperty("shifts")) {

                    // eslint-disable-next-line
                    myuser.driver.shifts.map(shift => {

                        if (shift.hasOwnProperty("equipment")) {

                            if (shift.equipment.indexOf(equipmentid) > -1) {

                                if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                                    deliveries += Number(shift.deliveries);
                                }

                            }

                        }


                    })
                }
            }

        }
        return deliveries;

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

    resetState() {

        this.setState({ firstname: '', lastname: '', emailaddress: '', profileurl: '', phonenumber: '', apple: '', google: '', driverid: '', message: '' })

    }

    async appleSignIn() {
        const appbaseddriver = new AppBasedDriver();


        try {

            console.log(`Apple Sign In`)
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            // signed in

            console.log("CREDENTIAL", credential)

            if (credential.hasOwnProperty("user")) {
                console.log("CREDENTIAL", credential)
                let emailaddress = credential.email;
                let clientid = credential.user;
                let firstname = credential.fullName.givenName;
                let lastname = credential.fullName.familyName;
                
                this.setState({ emailaddress, apple:clientid, firstname, lastname})

                appbaseddriver.clientlogin.call(this)
            }



        } catch (err) {
            alert(err)
        }
    }

    async clientlogin() {
        const appbaseddriver = new AppBasedDriver();
        const { firstname, lastname, emailaddress, profileurl, phonenumber, apple, google, driverid } = this.state;
        const values = { firstname, lastname, emailaddress, profileurl, phonenumber, apple, google, driverid }
        try {
            this.setState({ spinner: true })
            let response = await AppleLogin(values)
            this.setState({ spinner: false })

            if (response.hasOwnProperty("driverid")) {

                appbaseddriver.resetState.call(this)
                this.props.reduxUser(response)

            } else if (response.hasOwnProperty("register")) {

                this.setState({ access: 'register' })
            }


        } catch (err) {
            this.setState({ spinner: false })
            alert(err)
        }
    }



}
export default AppBasedDriver;