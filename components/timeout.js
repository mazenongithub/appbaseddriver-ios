import React from 'react'
import { View, Text, TextInput} from 'react-native'
import { MyStylesheet } from './styles';
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes} from './functions';
import AppBasedDriver from './appbaseddriver'
import TimeOutCalender from './timeoutcalender';
class TimeOut {

    handleminutes(minutes) {
        this.setState({ timeoutminutes: minutes })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)

        if (myuser) {

            if (minutes.length === 2) {

                if (validateMinutes(minutes)) {


                    if (this.state.activeshiftid) {

                        const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                        if (myshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let time = this.state.timeoutampm;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            timeout = UTCTimeStringfromTime(timeout);
                            myuser.driver.shifts[i].timeout = timeout;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })


                        }

                    }



                } else {
                    alert(`${minutes} is an invalid minute format `)
                }

            }

        }

    }

    handlehours(hours) {
        this.setState({ timeouthours: hours })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {

            if (hours.length === 2) {
                if (validateMonth(hours)) {



                    if (this.state.activeshiftid) {
                        const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                        if (myshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let minutes = this.state.timeoutminutes;
                            let time = this.state.timeoutampm;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            timeout = UTCTimeStringfromTime(timeout);

                            myuser.driver.shifts[i].timeout = timeout;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })


                        }

                    }


                } else {
                    alert(`${hours} is an invalid hour format`)
                }

            }
        }
    }

    handleyear(year) {
        this.setState({ timeoutyear: year })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {


            if (year.length === 4) {

                if (validateYear(year)) {
                    appbaseddriver.updateUI.call(this,Number(year))

                    this.setState({activeyear:Number(year)}) 

                    if (this.state.activeshiftid) {
                        const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                        if (myshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            let day = this.state.timeoutday;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let minutes = this.state.timeoutminutes;
                            let time = this.state.timeoutampm;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            timeout = UTCTimeStringfromTime(timeout);
                            myuser.driver.shifts[i].timeout = timeout;
                            this.props.reduxUser(myuser)
                            appbaseddriver.updateUI.call(this,Number(year))
                            this.setState({ activeyear:Number(year) })
                            


                        }
                      

                    }
                   

                   


                } else {
                    alert(`${year} is an invalid year format`)
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ timeoutday: day })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {

       
                if (day.length === 2) {

                    if (validateDate(day)) {


                            if (this.state.activeshiftid) {
                                const myshift = appbaseddriver.getshiftbyid.call(this,this.state.activeshiftid);
                                if (myshift) {

                                    const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.driver.shifts[i].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

     
                } else {
                    alert(`${day} is an invalid day format`)
                }

            }
        }
    }

    handlemonth(month) {
        this.setState({ timeoutmonth: month })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {

                if (month.length === 2) {

                    if (validateMonth(month)) {

                        appbaseddriver.setUIMonth.call(this,month)
                     

                            if (this.state.activeshiftid) {
                                const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                                if (myshift) {

                                    const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myuser.driver.shifts[i].timeout = timeout;
                                    this.props.reduxUser(myuser)
                                    this.setState({ render: 'render' })


                                }

                            }

                        
                } else {
                    alert(`${month} is an invalid month format `)
                }

            }
        }
    }

    toggleampm(ampm) {
        if (this.state.timeoutampm === 'am' && ampm === 'pm') {
            this.setState({ timeoutampm: 'pm' })
        } else if (this.state.timeoutampm === 'pm' && ampm === 'am') {
            this.setState({ timeoutampm: 'am' })
        }

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {

                    if (this.state.activeshiftid) {
                        const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                        if (myshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let time = ampm;
                            let minutes = this.state.timeoutminutes;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                        
                            timeout = UTCTimeStringfromTime(timeout);
                 
                            myuser.driver.shifts[i].timeout = timeout;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })


                        }

                    }

        }

    }

    showampm() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const headerFont = appbaseddriver.getHeaderFont.call(this)
        const timeout = new TimeOut();
        const showam = () => {
            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{  ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...styles.generalPadding }} onPress={() => { timeout.toggleampm.call(this, 'pm') }}>AM</Text>
            </View>)

        }
        const showpm = () => {

            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{  ...styles.generalPadding, ...headerFont, ...styles.boldFont, ...styles.alignCenter }} onPress={() => { timeout.toggleampm.call(this, 'am') }}>PM</Text>
            </View>)

        }




        if (this.state.timeoutampm === 'am') {
            return showam()
        } else if (this.state.timeoutampm === 'pm') {
            return showpm()
        }


    }




    showtimeout() {
        const styles = MyStylesheet();
        const timeout = new TimeOut();
        const timeoutcalender = new TimeOutCalender();
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const headerFont = appbaseddriver.getHeaderFont.call(this)
        return(   <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <View style={{ ...styles.flex1, ...styles.calenderContainer }}>
    
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>
                        <Text style={{ ...styles.generalFont, ...regularFont }}>Time Out(MM-DD-YYYY HH mm) </Text>
                    </View>
                </View>
    
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} 
                            value={this.state.timeoutmonth.toString()}
                            onChangeText={text => { timeout.handlemonth.call(this, text) }}
                            />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeoutday.toString()}
                            onChangeText={text => { timeout.handleday.call(this, text) }} 
                            
                            />
                    </View>
                    <View style={{ ...styles.flex2, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeoutyear.toString()}
                            onChangeText={text => { timeout.handleyear.call(this, text) }} 
                            
                            />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeouthours.toString()}
                            onChangeText={text => { timeout.handlehours.call(this, text) }}
                            />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeoutminutes.toString()}
                            onChangeText={text => { timeout.handleminutes.call(this, text)
                             }}
                           
                             
                        />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
                        {timeout.showampm.call(this)}
                    </View>
                </View>

                {timeoutcalender.showTimeOutCalender.call(this)}
    
               
    
            </View>
        </View>)
    }

}
export default TimeOut;