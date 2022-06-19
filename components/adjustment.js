import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import { calculateDays, getOffsetDate, calculatetotalhours } from './functions';


class Adjustment {

    compareTime(timein, timeout, compare) {
        // timein = '10-29-2021'
        // timeout = '10-31-2021'
        // compare = '2021/10/27 16:00:00-07:00'

        timein = timein.split('-');
        timein = `${timein[2]}/${timein[0]}/${timein[1]}`

        timeout = timeout.split('-');
        timeout = `${timeout[2]}/${timeout[0]}/${timeout[1]}`

        const offsetstart = getOffsetDate(timein);
        timein = new Date(`${timein} 00:00:00${offsetstart}`)
        const offsetcompletion = getOffsetDate(timeout);
        timeout = new Date(`${timeout} 23:59:59${offsetcompletion}`)
        compare = new Date(compare)
        timein = timein.getTime();
        timeout = timeout.getTime();
        compare = compare.getTime();


        if (timein <= compare && timeout >= compare) {

            return true
        } else {

            return false
        }


    }



    getTimeOut() {
        const day = this.state.timeoutday;
        const year = this.state.timeoutyear;
        const month = this.state.timeoutmonth;
        return (`${month}-${day}-${year}`)

    }
    getTimeIn() {
        const day = this.state.timeinday;
        const year = this.state.timeinyear;
        const month = this.state.timeinmonth;
        return (`${month}-${day}-${year}`)

    }

    handleAdjustment() {

        if (this.state.adjustment) {
            this.setState({ adjustment: false })
        } else {
            this.setState({ adjustment: true })
        }
    }

    getAdjustment() {

        const styles = MyStylesheet();
        if (this.state.adjustment) {
            return (<Image source={require('./icons/greencheck.png')}
                style={styles.greenCheckSmall}
                resizeMethod='scale'
            />)

        } else {
            return (<Image source={require('./icons/emptybox.png')}
                style={styles.emptyBox}
                resizeMethod='scale'
            />)
        }


    }

    getShifts() {
        const appbaseddriver = new AppBasedDriver();
        const adjustment = new Adjustment();
        const shifts = appbaseddriver.getshifts.call(this)
        const timein = adjustment.getTimeIn.call(this)
        const timeout = adjustment.getTimeOut.call(this)
        let getshifts = [];
        if (shifts) {
            // eslint-disable-next-line
            shifts.map(shift => {
                if (adjustment.compareTime.call(this, timein, timeout, shift.timein)) {
                    getshifts.push(shift)
                }
            })
        }
        return getshifts;
    }

    getTotalHours() {
        const adjustment = new Adjustment();
        const shifts = adjustment.getShifts.call(this)
        let totalhours = 0;
        if (shifts.length > 0) {
            // eslint-disable-next-line
            shifts.map(shift => {
                totalhours += calculatetotalhours(shift.timeout, shift.timein)
            })

        }
        return totalhours;

    }

    showData() {
        const adjustment = new Adjustment();
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const styles = MyStylesheet();
        const timein = adjustment.getTimeIn.call(this)
        const timeout = adjustment.getTimeOut.call(this)
        const days = calculateDays(timein, timeout)
        const totalhours = +Number(adjustment.getTotalHours.call(this)).toFixed(2)

        const shifts = adjustment.getShifts.call(this).length

        if (this.state.adjustment) {
            return (
                <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                    <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                        <Text style={{ ...regularFont, ...styles.generalFont }}>
                            Use Time UI to Set Adjustment Day Interval
                        </Text>

                    </View>

                    <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                        <Text style={{ ...regularFont, ...styles.generalFont }}>
                            Date Interval {timein} to {timeout} ({days} days)
                        </Text>

                    </View>

                    <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                        <Text style={{ ...regularFont, ...styles.generalFont }}>
                            Total Shifts: {shifts}    Total Hours: {totalhours}
                        </Text>

                    </View>


                </View>
            )

        }
    }

    getEarningsPerHour() {
        const adjustment = new Adjustment();
        const totalhours = adjustment.getTotalHours.call(this)
        let earnings = 0;
        if (Math.abs(this.state.totalearnings)) {
            earnings = this.state.totalearnings;
        }
        let earningsperhour = 0;
        if (totalhours > 0 && Math.abs(earnings) > 0) {
            earningsperhour = earnings / totalhours
        }

        return earningsperhour

    }
    adjustEarnings() {
        const adjustment = new Adjustment();
        const startdate = adjustment.getTimeIn.call(this)
        const enddate = adjustment.getTimeOut.call(this)
        const dollarsperhour = Number(adjustment.getEarningsPerHour.call(this)).toFixed(2);
        const shifts = adjustment.getShifts.call(this).length;
        const totalhours = +Number(adjustment.getTotalHours.call(this)).toFixed(2);
        const totalamount = this.state.totalearnings
        const earningsafter = Number(adjustment.getEarningsAfter.call(this)).toFixed(2)
        const earningsbefore = Number(adjustment.getEarningsBefore.call(this)).toFixed(2)

        Alert.alert(
            'Adjust Shifts',
            `Are you sure you want to adjust earnings from ${startdate} to ${enddate}? $${dollarsperhour}/hr for ${shifts} shifts and ${totalhours} totalhours adding a total of $${totalamount} to $${earningsbefore} making $${earningsafter}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel '), style: 'cancel' },
                { text: 'OK', onPress: () => { adjustment.confirmadjustearnings.call(this) } },
            ],
            { cancelable: false }
        )

    }

    confirmadjustearnings() {

        const adjustment = new Adjustment();

        const appbaseddriver = new AppBasedDriver();

        const myuser = appbaseddriver.getuser.call(this)

        if (myuser) {

            const dollersperhour = adjustment.getEarningsPerHour.call(this)

            if (Math.abs(dollersperhour) > 0) {

                const shifts = adjustment.getShifts.call(this)
                if (shifts.length > 0) {
                    // eslint-disable-next-line
                    shifts.map(shift => {
                        const earnings = Number((calculatetotalhours(shift.timeout, shift.timein) * dollersperhour) + Number(shift.earnings)).toFixed(2);
                        const getshift = appbaseddriver.getshiftbyid.call(this, shift.shiftid)
                        if (getshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, shift.shiftid)
                            myuser.driver.shifts[i].earnings = earnings;
                        }

                    })
                }

            }

            this.props.reduxUser(myuser)
            this.setState({ totalearnings: 0 })

        }






    }

    getEarningsBefore() {
        const adjustment = new Adjustment();
        const shifts = adjustment.getShifts.call(this)
        let earnings = 0;
        if (shifts.length > 0) {
            // eslint-disable-next-line
            shifts.map(shift => {
                earnings += Number(shift.earnings)
            })
        }
        return earnings;

    }

    getEarningsAfter() {
        const adjustment = new Adjustment();
        const shifts = adjustment.getShifts.call(this)
        let earningsafter = 0;
        if (shifts.length > 0) {
            const earningsperhour = adjustment.getEarningsPerHour.call(this)
            if (Math.abs(earningsperhour)) {
                // eslint-disable-next-line
                shifts.map(shift => {
                    earningsafter += calculatetotalhours(shift.timeout, shift.timein) * earningsperhour + Number(shift.earnings);
                })
            }
        }
        return earningsafter;


    }


    highlightButton() {
        this.setState({ highlightbutton_1: true })
    }
    unhighlightButton() {
        this.setState({ highlightbutton_1: false })
    }



    showEarningsAdjustment() {
        const styles = MyStylesheet();
        const adjustment = new Adjustment();
        const appbaseddriver = new AppBasedDriver();
        const earningsperhour = `$${Number(adjustment.getEarningsPerHour.call(this)).toFixed(2)}`
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const earningsbefore = `$${Number(adjustment.getEarningsBefore.call(this)).toFixed(2)}`
        const earningsafter = `$${Number(adjustment.getEarningsAfter.call(this)).toFixed(2)}`

        const buttonBackground = () => {
            if (this.state.highlightbutton_1) {
                return ({ ...styles.highlightbutton })
            }
        }

        if (this.state.adjustment) {
            return (
                <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                    <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <Text style={{ ...regularFont, ...styles.generalFont }}>
                            Enter Earnings Adjustment for Set Interval
                        </Text>
                    </View>

                    <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <TextInput style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addBorder }}
                            value={this.state.totalearnings.toString()}
                            onChangeText={text => { this.setState({ totalearnings: text }) }}
                        />
                    </View>


                    <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <Text style={{ ...regularFont, ...styles.generalFont }}>
                            Adjustment = {earningsperhour}/hr Earnings Before: {earningsbefore} Earnings After: {earningsafter}
                        </Text>
                    </View>


                    <View style={{
                        ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter,

                    }}>
                        <TouchableOpacity
                            onPress={() => { adjustment.adjustEarnings.call(this) }}
                            style={{ ...styles.menuBackColor, ...styles.padding5, ...styles.addMargin, ...styles.radius5 }}>
                            <Text

                                style={{
                                    ...styles.boldFont, ...styles.font24, ...styles.menuColor,

                                }}>  Adjust  </Text>


                        </TouchableOpacity>
                    </View>


                </View>
            )
        }
    }


    showAdjustment() {
        const styles = MyStylesheet();
        const adjustment = new Adjustment();
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)

        const buttonWidth = () => {
            if (this.state.width > 1200) {
                return ({ width: 60 })
            } else if (this.state.width > 600) {
                return ({ width: 50 })
            } else {
                return ({ width: 40 })
            }

        }
        if (!this.state.activeshiftid) {
            return (
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                    <View style={{ ...styles.flex1 }}>

                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                            <View style={{ ...styles.generalContainer, ...styles.addMargin }}>
                                <TouchableOpacity

                                    onPress={() => adjustment.handleAdjustment.call(this)}>

                                    {adjustment.getAdjustment.call(this)}

                                </TouchableOpacity>
                                <Text style={{ ...regularFont, ...styles.generalFont }}>
                                    Adjustment
                                </Text>
                            </View>


                        </View>

                        {adjustment.showData.call(this)}

                        {adjustment.showEarningsAdjustment.call(this)}

                    </View>

                </View>
            )

        }
    }

}

export default Adjustment;