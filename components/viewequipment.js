import React from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import MakeID from './makeid';
import AppBasedDriver from './appbaseddriver';
import EquipmentDate from './equipmentdate';
import SalvageDate from './salvagedate'
import PurchaseDate from './purchasedate'
import { isNumeric, formatDateStringDisplay, checkactivedate } from './functions'
import Costs from './costs';
// import SmallDiagram from './smallcostdiagram';
// import MediumDiagram from './mediumcostdiagram'
// import Diagrams from './costdiagrams';
import Recharge from './recharge'




class ViewEquipment {

    equipmentdatedefault() {
        const equipmentmonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const equipmentday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const equipmentyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ equipmentyear: equipmentyear(), equipmentmonth: equipmentmonth(), equipmentday: equipmentday() })
    }




    getdetail() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        let detail = ""
        if (this.state.activecostid) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
            if (cost) {
                detail = cost.detail;
            }
        }
        return detail;

    }

    handledetail(detail) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const makeid = new MakeID();

        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {

                        const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)

                        myuser.equipment[i].costs[j].detail = detail;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })



                    }
                } else {


                    const newCost = (costid, detail, purchasedate) => {

                        return ({ costid, detail, purchasedate, amount: 0 })


                    }
                    const costid = makeid.costid.call(this, equipmentid)
                    const costs = appbaseddriver.getequipmentscosts.call(this, equipmentid)
                    const year = this.state.equipmentyear;
                    const day = this.state.equipmentday;
                    const month = this.state.equipmentmonth;
                    const purchasedate = `${year}/${month}/${day}`;
                    const newcost = newCost(costid, detail, purchasedate)
                    if (costs) {
                        myuser.equipment[i].costs.push(newcost)

                    } else {

                        myuser.equipment[i].costs = [newcost]
                    }

                    this.props.reduxUser(myuser)
                    this.setState({ activecostid: costid, activeyear: Number(year) })

                }

            }
        }


    }



    reoccurringForm() {

        const appbaseddriver = new AppBasedDriver();
        const styles = MyStylesheet();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const viewequipment = new ViewEquipment();
        return (
            <View style={{ ...styles.generalContainer }}>


                <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <Text style={{ ...headerFont, ...styles.generalFont }}>Frequency</Text>

                </View>



            </View>
        )

    }

    getamount() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        let amount = "";
        if (this.state.activecostid) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)

            amount = cost.amount;

        }
        return amount;

    }

    handleamount(amount) {
        if (isNumeric(amount)) {
            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            const makeid = new MakeID();

            if (myuser) {
                const equipmentid = appbaseddriver.getEquipmentID.call(this)
                const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
                if (equipment) {
                    const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                    if (this.state.activecostid) {
                        const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                        if (cost) {

                            const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)

                            myuser.equipment[i].costs[j].amount = amount;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })



                        }
                    } else {


                        const newCost = (costid, purchasedate, detail, amount) => {
                            return ({ costid, purchasedate, detail, amount })
                        }

                        const costid = makeid.costid.call(this, equipmentid)
                        const costs = appbaseddriver.getequipmentscosts.call(this, equipmentid)
                        const year = this.state.equipmentyear;
                        const day = this.state.equipmentday;
                        const month = this.state.equipmentmonth;
                        const purchasedate = `${year}/${month}/${day}`;
                        const newcost = newCost(costid, purchasedate, "", amount)
                        if (costs) {
                            myuser.equipment[i].costs.push(newcost)

                        } else {

                            myuser.equipment[i].costs = [newcost]
                        }

                        this.props.reduxUser(myuser)
                        this.setState({ activecostid: costid })

                    }

                }
            }

        } else {
            alert(`${amount} should be numeric`)
        }


    }

    handlepurchase(purchase) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (isNumeric(purchase)) {

            if (myuser) {

                const activeequipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
                if (activeequipment) {
                    const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                    if (activeequipment.hasOwnProperty("repayment")) {


                        myuser.equipment[i].repayment.purchase = purchase;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }



                }

            }

        } else {
            alert(`${purchase} should be numeric`)
        }


    }

    getpurchase() {
        const appbaseddriver = new AppBasedDriver();
        let equipment = "";
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const myequipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        if (myequipment.hasOwnProperty("repayment")) {
            equipment = myequipment.repayment.purchase;
        }

        return equipment;

    }



    handlesalvage(salvage) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (isNumeric(salvage)) {

            if (myuser) {

                const activeequipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
                if (activeequipment) {
                    const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                    if (activeequipment.hasOwnProperty("repayment")) {


                        myuser.equipment[i].repayment.salvage = salvage;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }



                }

            }

        } else {
            alert(`${salvage} should be numeric`)
        }


    }

    getsalvage() {
        const appbaseddriver = new AppBasedDriver();
        let equipment = "";
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const myequipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        if (myequipment.hasOwnProperty("repayment")) {
            equipment = myequipment.repayment.salvage;
        }

        return equipment;

    }


    getfrequency() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (this.state.activecostid) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
            if (cost.hasOwnProperty("reoccurring")) {
                return cost.reoccurring.frequency;
            }
        }

    }

    handlefrequency(amount) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        if (cost.hasOwnProperty("reoccurring")) {
                            const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                            myuser.equipment[i].costs[j].reoccurring.frequency = amount;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    }
                }

            }
        }


    }





    handleapr(apr) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (isNumeric(apr)) {
            if (myuser) {

                const activeequipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
                if (activeequipment) {
                    const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                    if (activeequipment.hasOwnProperty("repayment")) {


                        myuser.equipment[i].repayment.apr = apr;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }



                }

            }

        } else {
            alert(`${apr} should be numeric`)
        }


    }

    getapr() {
        const appbaseddriver = new AppBasedDriver();
        let equipment = "";
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const myequipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        if (myequipment.hasOwnProperty("repayment")) {
            equipment = myequipment.repayment.apr;
        }

        return equipment;

    }

    removecost(costid) {

        const viewequipment = new ViewEquipment();
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        if (equipment) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, costid)
            if (cost) {
                Alert.alert(
                    'Remove Cost',
                    `Are your sure you want to remove ${cost.detail}?`,
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
                        { text: 'OK', onPress: () => { viewequipment.confirmremovecost.call(this, cost.costid) } },
                    ],
                    { cancelable: false }
                )

            }

        }

    }




    confirmremovecost(costid) {
        const appbaseddriver = new AppBasedDriver();
        const viewequipment = new ViewEquipment();
        const myuser = appbaseddriver.getuser.call(this)
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (myuser) {
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)

                const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, costid)
                if (cost) {

                    const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, costid)

                    myuser.equipment[i].costs.splice(j, 1)
                    viewequipment.equipmentdatedefault.call(this);
                    this.props.reduxUser(myuser)
                    this.setState({ activecostid: false })



                }

            }

        }
    }

    makecostactive(costid) {

        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (this.state.activecostid === costid) {

            this.setState({ activecostid: false })
        } else {

            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, costid)
            let equipmentyear = "";
            let equipmentmonth = "";
            let equipmentday = "";

            if (cost) {

                equipmentyear = cost.purchasedate.substring(0, 4)
                equipmentmonth = cost.purchasedate.substring(5, 7);
                equipmentday = cost.purchasedate.substring(8, 10)

            }
            this.setState({ activecostid: costid, equipmentyear, equipmentmonth, equipmentday, activeyear: Number(equipmentyear) })
        }

    }


    getequipment() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        return appbaseddriver.getequipmentbyid.call(this, equipmentid)
    }

    showequipmentids() {
        const appbaseddriver = new AppBasedDriver();
        const viewequipment = new ViewEquipment();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const costs = appbaseddriver.getequipmentscosts.call(this, equipmentid)
        const styles = MyStylesheet();
        const headerFont = appbaseddriver.getHeaderFont.call(this);
        const TextWidth = appbaseddriver.radioIconWidth.call(this)
        const recharge = new Recharge();
        let ids = [];
        const removeIcon = appbaseddriver.getremoveicon.call(this)
        const driver = appbaseddriver.getuser.call(this)
        if (driver) {

            const equipment = viewequipment.getequipment.call(this)
            if (equipment) {
                const activebackground = (cost) => {
                    if (this.state.activecostid === cost.costid) {
                        return (styles.activeBackground)
                    } else {
                        return ({ backgroundColor: '#FFFFFF' })
                    }
                }

                const getreimburseable = (equipment) => {

                    if (this.state.activecostid) {
                        const cost = appbaseddriver.getequipmentcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                        if (cost) {
                            if (cost.hasOwnProperty("reimbursable")) {
                                return (<TouchableOpacity onPress={() => { viewequipment.handlereimbursable.call(this) }}>
                                    <Image source={require('./icons/greencheck.png')}
                                        style={styles.greenCheck}
                                        resizeMethod='scale'
                                    />
                                </TouchableOpacity>)

                            } else {
                                return (<TouchableOpacity onPress={() => { viewequipment.handlereimbursable.call(this) }}>
                                    <Image source={require('./icons/emptybox.png')}
                                        style={styles.emptyBox}
                                        resizeMethod='scale'
                                    />
                                </TouchableOpacity>)
                            }
                        } else {
                            return (<TouchableOpacity onPress={() => { viewequipment.handlereimbursable.call(this) }}>
                                <Image source={require('./icons/emptybox.png')}
                                    style={styles.emptyBox}
                                    resizeMethod='scale'
                                />
                            </TouchableOpacity>)
                        }
                    } else {
                        return (<TouchableOpacity onPress={() => { viewequipment.handlereimbursable.call(this) }}>
                            <Image source={require('./icons/emptybox.png')}
                                style={styles.emptyBox}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>)
                    }

                }


                const getrecharge = (equipment) => {

                    if (this.state.activecostid) {
                        const cost = appbaseddriver.getequipmentcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                        if (cost) {
                            if (cost.hasOwnProperty("recharge")) {
                                return (<TouchableOpacity onPress={() => { viewequipment.handlerecharge.call(this) }}>
                                    <Image source={require('./icons/greencheck.png')}
                                        style={styles.greenCheck}
                                        resizeMethod='scale'
                                    />
                                </TouchableOpacity>)

                            } else {
                                return (<TouchableOpacity onPress={() => { viewequipment.handlerecharge.call(this) }}>
                                    <Image source={require('./icons/emptybox.png')}
                                        style={styles.emptyBox}
                                        resizeMethod='scale'
                                    />
                                </TouchableOpacity>)
                            }
                        } else {
                            return (<TouchableOpacity onPress={() => { viewequipment.handlerecharge.call(this) }}>
                                <Image source={require('./icons/emptybox.png')}
                                    style={styles.emptyBox}
                                    resizeMethod='scale'
                                />
                            </TouchableOpacity>)
                        }
                    } else {
                        return (<TouchableOpacity onPress={() => { viewequipment.handlerecharge.call(this) }}>
                            <Image source={require('./icons/emptybox.png')}
                                style={styles.emptyBox}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>)
                    }

                }


                const Reoccurring = (equipment, cost) => {

                    if (this.state.activecostid === cost.costid) {
                        return (


                            <View style={{ ...styles.generalContainer }}>

                                <View style={{ ...styles.generalFlex }}>



                                    <View style={{ ...styles.flex1, ...styles.addMargin }}>

                                        {getrecharge(equipment)}

                                        <Text style={{ ...headerFont, ...styles.generalFont }}>
                                            Recharge Costs
                                        </Text>



                                    </View>

                                    <View style={{ ...styles.flex1, ...styles.addMargin }}>


                                        {getreimburseable(equipment)}

                                        <Text style={{ ...headerFont, ...styles.generalFont }}>
                                            Reimburseable
                                        </Text>
                                    </View>



                                </View>

                                {recharge.showRecharge.call(this)}

                            </View>




                        )
                    }
                }


                const reoccurring = (cost) => {
                    if (cost.hasOwnProperty("reoccurring")) {
                        return `Reoccurring ${cost.reoccurring.frequency}`
                    }
                }

                const showreceipt = (cost) => {
                    if (this.state.activecostid === cost.costid) {

                        return (<View style={{ ...styles.flex1 }} >
                            <TouchableOpacity onPress={(e) => {
                                this.props.reduxNavigation({ navigation: 'receipts', equipmentid, costid: cost.costid })
                                this.setState({ render: 'render' })
                            }}>
                                <Image source={require('./icons/uploadreceipt.png')}
                                    style={styles.receiptIcon}
                                    resizeMethod='scale'
                                />
                            </TouchableOpacity>
                        </View>)
                    }
                }
                const singular = (cost) => {


                    return (
                        <View style={{ ...styles.generalContainer }} key={cost.costid}>
                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15, }} >
                                {showreceipt(cost)}
                                <View style={{ ...styles.flex3 }}>
                                    <Text style={{ ...headerFont, ...styles.generalFont, ...activebackground(cost) }} onPress={(e) => { viewequipment.makecostactive.call(this, cost.costid) }}>
                                        {reoccurring(cost)} PurchaseDate: {formatDateStringDisplay(cost.purchasedate)} Detail: {cost.detail} Amount: ${cost.amount}
                                    </Text>
                                </View>
                                <View style={{ ...styles.flex1 }}>

                                    <TouchableOpacity onPress={(e) => { viewequipment.removecost.call(this, cost.costid) }}>
                                        <Image source={require('./icons/redx.png')}
                                            style={styles.removeIcon}
                                            resizeMethod='scale'
                                        />
                                    </TouchableOpacity>

                                </View>




                            </View>

                            {Reoccurring(equipment, cost)}

                        </View>

                    )
                }



                const receipitUI = () => {
                    if (this.state.width > 1200) {
                        return ({ width: 135 })
                    } else if (this.state.width > 600) {
                        return ({ width: 95 })
                    } else {
                        return ({ width: 65 })
                    }
                }




                if (costs) {

                    // eslint-disable-next-line
                    costs.map(cost => {


                        if (checkactivedate(cost.purchasedate, this.state.activemonth, this.state.activeyear)) {

                            ids.push(singular(cost))



                        }



                    })



                }

            }

        }
        return ids;
    }

    handlereimbursable() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                        if (cost.hasOwnProperty("reimbursable")) {
                            delete myuser.equipment[i].costs[j].reimbursable
                        } else {
                            myuser.equipment[i].costs[j].reimbursable = true;
                        }
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }
                }
            }

        }

    }

    handlereoccurring() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                        if (cost.hasOwnProperty("reoccurring")) {
                            delete myuser.equipment[i].costs[j].reoccurring
                        } else {
                            myuser.equipment[i].costs[j].reoccurring = { frequency: '' }
                        }
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }
                }
            }

        }

    }

    handlerecharge() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                        if (cost.hasOwnProperty("recharge")) {
                            delete myuser.equipment[i].costs[j].recharge
                        } else {
                            myuser.equipment[i].costs[j].recharge = { totalenergy: '', duration: { hours: 0, minutes: 0, seconds: 0 } }
                        }
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }
                }
            }

        }

    }


    removerepayment() {

        if (this.state.showrepayment) {
            this.setState({ showrepayment: false })
        } else {
            this.setState({ showrepayment: true })
        }



    }

    showViewEquipment() {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const styles = MyStylesheet();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const headerFont = appbaseddriver.getHeaderFont.call(this)
        const TextWidth = appbaseddriver.radioIconWidth.call(this)
        const viewequipment = new ViewEquipment();

        const equipmentdate = new EquipmentDate();
        const salvagedate = new SalvageDate();
        const purchasedate = new PurchaseDate();
        const costs = new Costs();
        // const smalldiagram = new SmallDiagram();
        // const mediumdiagram = new MediumDiagram();
        // const diagrams = new Diagrams()
        const recharge = new Recharge();
        const menufont = appbaseddriver.getHeaderFont.call(this)

        // const showdiagram = () => {
        //     if (this.state.width > 1200) {
        //         return (diagrams.showdiagrams.call(this))

        //     } else if (this.state.width > 600) {
        //         return (mediumdiagram.showdiagrams.call(this))
        //     } else {
        //         return (smalldiagram.showdiagrams.call(this))
        //     }
        // }




        if (myuser) {

            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid);

            if (equipment) {

                const showpurchase = () => {
                    if (this.state.width > 1200) {
                        return (
                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>
                                    {purchasedate.showdate.call(this)}

                                </View>
                                <View style={{ ...styles.flex1 }}>


                                    <Text style={{ ...headerFont, ...styles.generalFont }}>Purchase Amount </Text>
                                    <TextInput style={{ ...headerFont, ...styles.generalFont, ...styles.generalField }}
                                        value={viewequipment.getpurchase.call(this).toString()}
                                        onChangeText={text => { viewequipment.handlepurchase.call(this, text) }}
                                    />


                                </View>
                            </View>)

                    } else {

                        return (
                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1 }}>

                                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <View style={{ ...styles.flex1 }}>
                                            {purchasedate.showdate.call(this)}

                                        </View>
                                    </View>

                                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <View style={{ ...styles.flex1 }}>
                                            <Text style={{ ...headerFont, ...styles.generalFont }}>Purchase Amount </Text>
                                            <TextInput style={{ ...headerFont, ...styles.generalFont, ...styles.generalField }}
                                                value={viewequipment.getpurchase.call(this).toString()}
                                                onChangeText={text => { viewequipment.handlepurchase.call(this, text) }}
                                            />

                                        </View>
                                    </View>

                                </View>
                            </View>)

                    }
                }


                const showsalvage = () => {
                    if (this.state.width > 1200) {
                        return (
                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>
                                    {salvagedate.showdate.call(this)}

                                </View>
                                <View style={{ ...styles.flex1 }}>


                                    <Text style={{ ...headerFont, ...styles.generalFont }}>Salvage Amount </Text>
                                    <TextInput style={{ ...headerFont, ...styles.generalFont, ...styles.generalField }}
                                        value={viewequipment.getsalvage.call(this).toString()}
                                        onChangeText={text => { viewequipment.handlesalvage.call(this, text) }}
                                    />


                                </View>
                            </View>)

                    } else {

                        return (
                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1 }}>

                                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <View style={{ ...styles.flex1 }}>
                                            {salvagedate.showdate.call(this)}
                                        </View>
                                    </View>

                                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <View style={{ ...styles.flex1 }}>
                                            <Text style={{ ...headerFont, ...styles.generalFont }}>Salvage Amount </Text>
                                            <TextInput style={{ ...headerFont, ...styles.generalFont, ...styles.generalField }}
                                                value={viewequipment.getsalvage.call(this).toString()}
                                                onChangeText={text => { viewequipment.handlesalvage.call(this, text) }}
                                            />

                                        </View>
                                    </View>

                                </View>
                            </View>)

                    }
                }

                const repayment = (equipment) => {
                    if (equipment.hasOwnProperty("repayment") && this.state.showrepayment) {
                        return (
                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1 }}>

                                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <View style={{ ...styles.flex1 }}>

                                        </View>
                                        <View style={{ ...styles.flex1 }}>

                                        </View>
                                    </View>

                                    {showsalvage()}

                                    {showpurchase()}



                                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <View style={{ ...styles.flex1 }}>

                                            <Text style={{ ...headerFont, ...styles.generalFont }}>Interest Rate - APR</Text>
                                            <TextInput style={{ ...headerFont, ...styles.generalFont, ...styles.generalField }}
                                                value={viewequipment.getapr.call(this).toString()}
                                                onChangeText={text => { viewequipment.handleapr.call(this, text) }} />

                                        </View>
                                        <View style={{ ...styles.flex1 }}>

                                        </View>

                                    </View>



                                </View>
                            </View>

                        )

                    }

                }





                const getreoccuring = (equipment) => {

                    if (this.state.activecostid) {
                        const cost = appbaseddriver.getequipmentcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                        if (cost) {
                            if (cost.hasOwnProperty("reoccurring")) {
                                return (`X`)

                            } else {
                                return (`O`)
                            }
                        } else {
                            return (`O`)
                        }
                    } else {
                        return (`O`)
                    }

                }






                return (
                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>


                            {repayment(equipment)}


                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>
                                    <Text style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>Costs</Text>
                                </View>
                            </View>

                            {equipmentdate.showequipment.call(this)}

                            <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <Text style={{ ...headerFont, ...styles.generalFont }}>Detail</Text>
                                <TextInput style={{ ...headerFont, ...styles.generalFont, ...styles.generalField }}
                                    value={viewequipment.getdetail.call(this).toString()}
                                    onChangeText={text => { viewequipment.handledetail.call(this, text) }}
                                />
                            </View>

                            <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <Text style={{ ...headerFont, ...styles.generalFont }}>Amount</Text>
                                <TextInput style={{ ...headerFont, ...styles.generalFont, ...styles.generalField }}
                                    value={viewequipment.getamount.call(this).toString()}
                                    onChangeText={text => { viewequipment.handleamount.call(this, text) }}
                                />
                            </View>





                            {viewequipment.showequipmentids.call(this)}

                            {appbaseddriver.showsavedriver.call(this)}

                            {costs.showcosts.call(this, equipmentid)}





                        </View>
                    </View>)

            } else {
                return (<View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>
                        <Text style={{ ...styles.generalFont, ...headerFont }}> Equipment Not Found</Text>
                    </View>
                </View>)

            }
        } else {
            return (<View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.generalFont, ...headerFont }}>Please Login to View Equipment</Text>
                </View>
            </View>)
        }
    }

}



export default ViewEquipment;