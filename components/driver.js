import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import TimeIn from './timein';
import TimeOut from './timeout'
import { makeTimeString, UTCTimeStringfromTime, inputUTCStringForLaborID, isNumeric, getMonthfromTimein, getDayfromTimein, getHoursfromTimein, getYearfromTimein, getMinutesfromTimein, getAMPMfromTimeIn, calculatetotalhours, sorttimes, checkactivemonth, trailingZeros, getMonString } from './functions'
import DriverUI from './driverui';
import MakeID from './makeid';
import Income from './income'
import EquipmentUI from './equipmentui';
import Adjustment from './adjustment'
import SmallDiagram from './smalldiagram';

class Driver {

    updateUI() {
        const month = Number(this.state.timeinmonth)
        const mon = getMonString(Number(month))

        let activemonth = this.state.activemonth;
        if (activemonth.indexOf(mon) === -1) {
            activemonth.push(mon)


        }



        this.setState({ activemonth })
    }


    getearnings() {
        const appbaseddriver = new AppBasedDriver();
        let earnings = "";
        if (this.state.activeshiftid) {
            const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
            earnings = shift.earnings;

        }

        return earnings;
    }

    makeshiftactive(shiftid) {
        const appbaseddriver = new AppBasedDriver();

        if (this.state.activeshiftid === shiftid) {

            this.setState({ activeshiftid: false })


        } else {
            const shift = appbaseddriver.getshiftbyid.call(this, shiftid)
            if (shift) {

                const timeinmonth = getMonthfromTimein(shift.timein);
                const timeinday = getDayfromTimein(shift.timein);
                const timeinyear = getYearfromTimein(shift.timein)
                const timeinhours = getHoursfromTimein(shift.timein)
                const timeinminutes = getMinutesfromTimein(shift.timein)
                const timeinampm = getAMPMfromTimeIn(shift.timein)


                const timeoutmonth = getMonthfromTimein(shift.timeout);
                const timeoutday = getDayfromTimein(shift.timeout);
                const timeoutyear = getYearfromTimein(shift.timeout)
                const timeouthours = getHoursfromTimein(shift.timeout)
                const timeoutminutes = getMinutesfromTimein(shift.timeout)
                const timeoutampm = getAMPMfromTimeIn(shift.timeout);

                this.setState({ timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm, timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm, activeshiftid: shiftid, activeyear: Number(timeinyear) })

            } else {
                this.setState({ activeshiftid: shiftid })

            }




        }
    }

    confirmremoveshift(shiftid) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const shift = appbaseddriver.getshiftbyid.call(this, shiftid)
            if (shift) {

                const i = appbaseddriver.getshiftkeybyid.call(this, shiftid)
                myuser.driver.shifts.splice(i, 1)
                this.props.reduxUser(myuser)
                this.setState({ activeshiftid: false })



            }



        }


    }

    removeshift(shiftid) {


        const driver = new Driver();

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const shift = appbaseddriver.getshiftbyid.call(this, shiftid)
            if (shift) {

                Alert.alert(
                    'Remove Shift',
                    `Are you sure you want to delete shift ${inputUTCStringForLaborID(shift.timein)} to ${inputUTCStringForLaborID(shift.timeout)} ?`,
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel '), style: 'cancel' },
                        { text: 'OK', onPress: () => { driver.confirmremoveshift.call(this, shiftid) } },
                    ],
                    { cancelable: false }
                )

            }

        }

    }





    createnewshift(earnings, deliveries, miles) {

        const makeid = new MakeID();
        const appbaseddriver = new AppBasedDriver()
        const driver = new Driver();
        const shiftid = makeid.shiftid.call(this)
        const timeinday = trailingZeros(this.state.timeinday);
        const timeinyear = this.state.timeinyear;
        const timeinmonth = trailingZeros(this.state.timeinmonth);
        const timeinhours = trailingZeros(this.state.timeinhours);
        const timeinampm = this.state.timeinampm;
        const timeinminutes = trailingZeros(this.state.timeinminutes);
        let timein = makeTimeString(timeinyear, timeinmonth, timeinday, timeinhours, timeinminutes, timeinampm);
        timein = UTCTimeStringfromTime(timein);
        const timeoutday = trailingZeros(this.state.timeoutday);
        const timeoutyear = this.state.timeoutyear;
        const timeoutmonth = trailingZeros(this.state.timeoutmonth);
        const timeouthours = trailingZeros(this.state.timeouthours);
        const timeoutminutes = trailingZeros(this.state.timeoutminutes);
        const timeoutampm = this.state.timeoutampm;
        let timeout = makeTimeString(timeoutyear, timeoutmonth, timeoutday, timeouthours, timeoutminutes, timeoutampm);
        timeout = UTCTimeStringfromTime(timeout);
        const equipment = appbaseddriver.createEquipmentList.call(this)

        const newShift = (shiftid, timein, timeout, earnings, deliveries, miles) => {
            return ({ shiftid, timein, timeout, earnings, deliveries, miles, equipment })
        }
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const createShift = newShift(shiftid, timein, timeout, earnings, deliveries, miles)
            if (myuser.hasOwnProperty("driver")) {

                if (myuser.driver.hasOwnProperty("shifts")) {
                    myuser.driver.shifts.push(createShift)

                } else {
                    myuser.driver.shifts = [createShift]

                }

            } else {
                myuser.driver = { shifts: [createShift] }

            }

            this.props.reduxUser(myuser)

            this.setState({ activeshiftid: shiftid, timeinyear, timeinmonth, timeinday, timeinhours, timeinminutes, timeinampm, timeoutyear, timeoutmonth, timeoutday, timeouthours, timeoutminutes, timeoutampm })
            driver.updateUI.call(this);


        }
    }

    handleearnings(earnings) {


        if (isNumeric(earnings)) {

            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            const driver = new Driver();

            if (myuser) {

                if (myuser.hasOwnProperty("driver")) {

                    if (this.state.activeshiftid) {

                        const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)

                        if (shift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            myuser.driver.shifts[i].earnings = earnings;
                            this.props.reduxUser(myuser)

                            driver.updateUI.call(this);

                        }

                    } else {

                        driver.createnewshift.call(this, earnings, 0, 0)


                    }


                } else {
                    driver.createnewshift.call(this, earnings, 0, 0)

                }

            }

        } else {
            alert(`${earnings} should be numeric`)
        }


    }


    getdeliveries() {
        const appbaseddriver = new AppBasedDriver();
        let deliveries = "";
        if (this.state.activeshiftid) {
            const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
            deliveries = shift.deliveries;

        }
        return deliveries;
    }


    handledeliveries(deliveries) {
        if (isNumeric(deliveries)) {
            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            const driver = new Driver();
            if (myuser) {
                if (myuser.hasOwnProperty("driver")) {

                    if (this.state.activeshiftid) {
                        const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
                        if (shift) {
                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            myuser.driver.shifts[i].deliveries = deliveries;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    } else {

                        driver.createnewshift.call(this, 0, deliveries, 0)


                    }


                } else {
                    driver.createnewshift.call(this, 0, deliveries, 0)

                }

            }

        } else {
            alert(`${deliveries} should be numeric`)
        }

    }


    getmiles() {
        const appbaseddriver = new AppBasedDriver();
        let miles = "";
        if (this.state.activeshiftid) {
            const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
            miles = shift.miles;

        }
        return miles;
    }


    handlemiles(miles) {
        if (isNumeric(miles)) {
            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            const driver = new Driver();
            if (myuser) {
                if (myuser.hasOwnProperty("driver")) {

                    if (this.state.activeshiftid) {
                        const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
                        if (shift) {
                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            myuser.driver.shifts[i].miles = miles;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    } else {

                        driver.createnewshift.call(this, 0, 0, miles)


                    }


                } else {
                    driver.createnewshift.call(this, 0, 0, miles)

                }

            }

        } else {
            alert(`${miles} should be numeric `)
        }


    }


    getearnings() {
        const appbaseddriver = new AppBasedDriver();
        let earnings = "";
        if (this.state.activeshiftid) {
            const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
            earnings = shift.earnings;

        }
        return earnings;
    }




    createnewshift(earnings, deliveries, miles) {

        const makeid = new MakeID();
        const appbaseddriver = new AppBasedDriver()
        const driver = new Driver();
        const shiftid = makeid.shiftid.call(this)
        const timeinday = trailingZeros(this.state.timeinday);
        const timeinyear = this.state.timeinyear;
        const timeinmonth = trailingZeros(this.state.timeinmonth);
        const timeinhours = trailingZeros(this.state.timeinhours);
        const timeinampm = this.state.timeinampm;
        const timeinminutes = trailingZeros(this.state.timeinminutes);
        let timein = makeTimeString(timeinyear, timeinmonth, timeinday, timeinhours, timeinminutes, timeinampm);
        timein = UTCTimeStringfromTime(timein);
        const timeoutday = trailingZeros(this.state.timeoutday);
        const timeoutyear = this.state.timeoutyear;
        const timeoutmonth = trailingZeros(this.state.timeoutmonth);
        const timeouthours = trailingZeros(this.state.timeouthours);
        const timeoutminutes = trailingZeros(this.state.timeoutminutes);
        const timeoutampm = this.state.timeoutampm;
        let timeout = makeTimeString(timeoutyear, timeoutmonth, timeoutday, timeouthours, timeoutminutes, timeoutampm);
        timeout = UTCTimeStringfromTime(timeout);
        const equipment = appbaseddriver.createEquipmentList.call(this)

        const newShift = (shiftid, timein, timeout, earnings, deliveries, miles) => {
            return ({ shiftid, timein, timeout, earnings, deliveries, miles, equipment })
        }
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const createShift = newShift(shiftid, timein, timeout, earnings, deliveries, miles)
            if (myuser.hasOwnProperty("driver")) {

                if (myuser.driver.hasOwnProperty("shifts")) {
                    myuser.driver.shifts.push(createShift)

                } else {
                    myuser.driver.shifts = [createShift]

                }

            } else {
                myuser.driver = { shifts: [createShift] }

            }

            this.props.reduxUser(myuser)

            this.setState({ activeshiftid: shiftid, timeinyear, timeinmonth, timeinday, timeinhours, timeinminutes, timeinampm, timeoutyear, timeoutmonth, timeoutday, timeouthours, timeoutminutes, timeoutampm })
            driver.updateUI.call(this);


        }
    }

    handleearnings(earnings) {

        if (isNumeric(earnings)) {

            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            const driver = new Driver();

            if (myuser) {

                if (myuser.hasOwnProperty("driver")) {

                    if (this.state.activeshiftid) {

                        const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)

                        if (shift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            myuser.driver.shifts[i].earnings = earnings;
                            this.props.reduxUser(myuser)
                            this.setState({render:`render`})

                     

                        }

                    } else {

                        driver.createnewshift.call(this, earnings, 0, 0)


                    }


                } else {
                    driver.createnewshift.call(this, earnings, 0, 0)

                }

            }

        } else {
            alert(`${earnings} should be numeric`)
        }


    }


    getdeliveries() {
        const appbaseddriver = new AppBasedDriver();
        let deliveries = "";
        if (this.state.activeshiftid) {
            const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
            deliveries = shift.deliveries;

        }
        return deliveries;
    }


    handledeliveries(deliveries) {
        if (isNumeric(deliveries)) {
            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            const driver = new Driver();
            if (myuser) {
                if (myuser.hasOwnProperty("driver")) {

                    if (this.state.activeshiftid) {
                        const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
                        if (shift) {
                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            myuser.driver.shifts[i].deliveries = deliveries;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    } else {

                        driver.createnewshift.call(this, 0, deliveries, 0)


                    }


                } else {
                    driver.createnewshift.call(this, 0, deliveries, 0)

                }

            }

        } else {
            alert(`${deliveries} should be numeric`)
        }

    }


    getmiles() {
        const appbaseddriver = new AppBasedDriver();
        let miles = "";
        if (this.state.activeshiftid) {
            const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
            miles = shift.miles;

        }
        return miles;
    }


    handlemiles(miles) {
        if (isNumeric(miles)) {
            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            const driver = new Driver();
            if (myuser) {
                if (myuser.hasOwnProperty("driver")) {

                    if (this.state.activeshiftid) {
                        const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
                        if (shift) {
                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            myuser.driver.shifts[i].miles = miles;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    } else {

                        driver.createnewshift.call(this, 0, 0, miles)


                    }


                } else {
                    driver.createnewshift.call(this, 0, 0, miles)

                }

            }

        } else {
            alert(`${miles} should be numeric `)
        }


    }



    showtimes() {
        const appbaseddriver = new AppBasedDriver()
        const timein = new TimeIn();
        const timeout = new TimeOut();
        const styles = MyStylesheet();
        const orientation = appbaseddriver.getOrientation.call(this);
        if (orientation === 'portrait') {
            return (
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {timein.showtimein.call(this)}
                            </View>

                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {timeout.showtimeout.call(this)}
                            </View>

                        </View>






                    </View>
                </View>)

        } else {
            return (
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {timein.showtimein.call(this)}
                            </View>



                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {timeout.showtimeout.call(this)}
                            </View>

                        </View>






                    </View>
                </View>
            )
        }
    }


    showshifts() {
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        let shiftids = [];
        let shifts = appbaseddriver.getshifts.call(this);
       
        const styles = MyStylesheet();

        const driver = new Driver();
        const removeIcon = appbaseddriver.getremoveicon.call(this)
        const activebackground = (shiftid) => {
            if (this.state.activeshiftid === shiftid) {
                return (styles.activeBackground)
            } else {
                return ({ backgroundColor: '#ffffff' })
            }
        }
        const showshift = (shift) => {

            return (
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={shift.shiftid}>
                    <View style={{ ...styles.flex5 }} key={shift.shiftid}>
                        <Text style={{ ...regularFont, ...styles.generalFont, ...activebackground(shift.shiftid) }} onPress={() => { driver.makeshiftactive.call(this, shift.shiftid) }}>
                            TimeIn: {inputUTCStringForLaborID(shift.timein)} TimeOut: {inputUTCStringForLaborID(shift.timeout)} Total Hours: {+Number(calculatetotalhours(shift.timeout, shift.timein)).toFixed(2)} Earnings: ${shift.earnings} Deliveries: {shift.deliveries} Miles: {shift.miles}
                        </Text>

                    </View>
                    <View style={{ ...styles.flex1 }}>

                        <TouchableOpacity onPress={() => { driver.removeshift.call(this, shift.shiftid) }}>
                            <Image source={require('./icons/redx.png')}
                                style={styles.removeIcon}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>


                    </View>

                </View>
            )

        }

        if (shifts) {

            shifts.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })
            
            // eslint-disable-next-line
            shifts.map(shift => {





                if (checkactivemonth(shift.timein, this.state.activemonth, this.state.activeyear)) {
                    shiftids.push(showshift(shift))
                }




            })
        }
        return shiftids;

    }

    showDriver() {

        const styles = MyStylesheet();
        const driver = new Driver();
        const driverui = new DriverUI();
        const equipmentui = new EquipmentUI();
        const appbaseddriver = new AppBasedDriver();
        const income = new Income();
        const adjustment = new Adjustment();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const headerFont = appbaseddriver.getHeaderFont.call(this);
        const diagram = new SmallDiagram()


        return (<View style={{ ...styles.generalContainer }}>
            {driver.showtimes.call(this)}

            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1, ...styles.alignCenter, ...styles.addMargin }}>
                    <Text style={{ ...styles.generalFont, ...headerFont }}>Earnings</Text>
                    <TextInput
                        value={driver.getearnings.call(this).toString()}
                        onChangeText={text => { driver.handleearnings.call(this, text) }}
                        type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField }} />
                </View>
                <View style={{ ...styles.flex1, ...styles.alignCenter, ...styles.addMargin }}>
                    <Text style={{ ...styles.generalFont, ...headerFont }}>Deliveries</Text>
                    <TextInput type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField }}
                        value={driver.getdeliveries.call(this).toString()}
                        onChangeText={text => { driver.handledeliveries.call(this, text) }}
                    />
                </View>
                <View style={{ ...styles.flex1, ...styles.alignCenter, ...styles.addMargin }}>
                    <Text style={{ ...styles.generalFont, ...headerFont }}>Miles</Text>
                    <TextInput type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField }}
                        value={driver.getmiles.call(this).toString()}
                        onChangeText={text => { driver.handlemiles.call(this, text) }}
                    />
                </View>
            </View>

            {adjustment.showAdjustment.call(this)}

            {equipmentui.showEquipmentUI.call(this)}

            {driverui.showui.call(this)}

            {driver.showshifts.call(this)}
            {appbaseddriver.showsavedriver.call(this)}


            
            {income.showincome.call(this)}

            {diagram.showdiagrams.call(this)}

           


        </View>)
    }
}

export default Driver;