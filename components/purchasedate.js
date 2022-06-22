import React from 'react';
import { View, Text, TextInput} from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import { validateMonth, validateDate, validateYear, isNumeric, trailingZeros, compareDates } from './functions';
import PurchaseCalender from './purchasecalender'

class PurchaseDate {

    handleyear(year) {
        this.setState({ purchaseyear: year })

        if (isNumeric(year)) {



            const appbaseddriver = new AppBasedDriver();


            const myuser = appbaseddriver.getuser.call(this)

            if (myuser) {

                const equipmentid = appbaseddriver.getEquipmentID.call(this)

                const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)

                if (equipment) {

                    if (equipment.hasOwnProperty("repayment")) {


                        const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid);

                        if (year.length === 4) {

                            if (validateYear(year)) {


                                let day = this.state.purchaseday;
                                let month = this.state.purchasemonth;
                                const timein = `${year}/${month}/${day}`

                                if (compareDates(timein, equipment.repayment.salvagedate)) {
                                    myuser.equipment[i].repayment.purchasedate = timein;
                                    this.props.reduxUser(myuser);
                                    this.setState({ render: 'render' })

                                } else {
                                    alert(`${equipment.equipment} purchase date ${timein} is less than the salvage date ${equipment.repayment.salvagedate}`)
                                }


                            } else {
                                alert(`Invalid Year format ${year}`)
                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }

                } else {
                    alert(`equipment not found`)
                }


            }


        } else {
            alert(`${year} should be numeric `)
        }
    }


    handleday(day) {
        this.setState({ purchaseday: day })
        if (isNumeric(day)) {
            day = day.toString();

            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            if (myuser) {
                
                const equipmentid = appbaseddriver.getEquipmentID.call(this,equipmentid)
                const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
                
                if (equipment) {

                    if (equipment.hasOwnProperty("repayment")) {

                        const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid);
                        if (day.length === 2) {


                            if (validateDate(day)) {


                                let year = this.state.purchaseyear;
                                let month = this.state.purchasemonth;
                                const timein = `${year}/${month}/${day}`
                                if (compareDates(timein, equipment.repayment.salvagedate)) {
                                    myuser.equipment[i].repayment.purchasedate = timein;
                                    this.props.reduxUser(myuser);
                                    this.setState({ render: 'render' })

                                } else {
                                    alert(`${equipment.equipment} purchase date ${timein} is less than the salvage date ${equipment.repayment.salvagedate}`)
                                }

                            } else {
                                alert(`Invalid day format ${day}`)
                            }

                        } else if (day.length === 1) {

                            
                            if(Number(day)) {
                            let purchasemonth = trailingZeros(this.state.purchasemonth)
                            let purchaseday = trailingZeros(day);
                            let purchaseyear = this.state.purchaseyear;
                            let timein = `${purchaseyear}/${purchasemonth}/${purchaseday}`
                            myuser.equipment[i].repayment.purchasedate = timein;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render', purchasemonth })

                            }
                        }

                    } else {
                        alert(`Equipment repayment not found`)
                    }



                } else {
                    alert(`Equipment not found`)
                }

            }


        } else {
            alert(`${day} should be numeric `)
        }
    }


    handlemonth(month) {

        this.setState({ purchasemonth: month })
        if (isNumeric(month)) {

            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            if (myuser) {
                const equipmentid = appbaseddriver.getEquipmentID.call(this)
                const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
                if (equipment) {

                    if (equipment.hasOwnProperty("repayment")) {



                        const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid);
                        if (month.length === 2) {

                            if (validateMonth(month)) {


                                let day = this.state.purchaseday;
                                let year = this.state.purchaseyear;

                                const timein = `${year}/${month}/${day}`
                                if (compareDates(timein, equipment.repayment.salvagedate)) {
                                    myuser.equipment[i].repayment.purchasedate = timein;
                                    this.props.reduxUser(myuser);
                                    this.setState({ render: 'render' })
                                } else {
                                    alert(`${equipment.equipment} purchase date ${timein} is less than the salvage date ${equipment.repayment.salvagedate}`)
                                }

                            } else {
                                alert(`Invalid month format ${month}`)
                            }

                        } else if (month.length === 1) {

                            if(Number(month)) {

                            let purchasemonth = trailingZeros(month)
                            let purchaseday = trailingZeros(this.state.purchaseday);
                            let purchaseyear = this.state.purchaseyear;
                            let timein = `${purchaseyear}/${purchasemonth}/${purchaseday}`
                            myuser.equipment[i].repayment.purchasedate = timein;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render', purchaseday })

                            }
                        }

                    } else {
                        alert("Equipment repayment not found")
                    }

                } else {
                    alert(`Equipment not found`)
                }
            }

        } else {
            alert(`${month} should be numeric`)
        }
    }



    showdate() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const headerFont = appbaseddriver.getHeaderFont.call(this)

        const equipment = new PurchaseDate();
        const calender = new PurchaseCalender();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const getequipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        if (getequipment) {
            if (getequipment.hasOwnProperty("repayment")) {

                if (getequipment.repayment.purchasedate) {

                    if (!this.state.purchaseday || !this.state.purchaseyear || !this.state.purchaseday) {

                        const dates = getequipment.repayment.purchasedate.split('/')

                        const year = dates[0]
                        const month = dates[1]
                        const day = dates[2]
                        
                        this.setState({ purchaseyear: year, purchasemonth: month, purchaseday: day })

                    }

                }

            }
        }



        return (
            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalContainer, ...styles.calenderContainer, ...styles.marginAuto }}>

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...styles.generalFont, ...headerFont }}>Purchase Date (MM-DD-YYYY) </Text>
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1, ...styles.addMargin }}>

                                <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} 
                                    value={this.state.purchasemonth.toString()}
                                    onChangeText={text => { equipment.handlemonth.call(this, text) }}
                                    selectTextOnFocus={true}
                                    />
                            </View>
                            <View style={{ ...styles.flex1, ...styles.addMargin }}>

                                <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                    value={this.state.purchaseday.toString()}
                                    onChangeText={text => { equipment.handleday.call(this, text) }}
                                    selectTextOnFocus={true}
                                     />
                            </View>
                            <View style={{ ...styles.flex1, ...styles.addMargin }}>

                                <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                    value={this.state.purchaseyear.toString()}
                                    onChangeText={text => { equipment.handleyear.call(this, text) }}
                                    selectTextOnFocus={true}
                                     />
                            </View>


                        </View>
                        {calender.showEquipmentCalender.call(this)}

                    </View>
                </View>
            </View>)
    }

}

export default PurchaseDate;