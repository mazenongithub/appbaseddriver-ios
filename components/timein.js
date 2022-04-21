import React from 'react'
import { View, Text, TextInput} from 'react-native'
import { MyStylesheet } from './styles';
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes} from './functions';
import AppBasedDriver from './appbaseddriver'
import TimeInCalender from './timeincaleder';
class TimeIn {

    handleminutes(minutes) {
        this.setState({ timeinminutes: minutes })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)

        if (myuser) {

            if (minutes.length === 2) {

                if (validateMinutes(minutes)) {


                    if (this.state.activeshiftid) {

                        const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                        if (myshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            let day = this.state.timeinday;
                            let year = this.state.timeinyear;
                            let month = this.state.timeinmonth;
                            let hours = this.state.timeinhours;
                            let time = this.state.timeinampm;
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                            timein = UTCTimeStringfromTime(timein);
                            myuser.driver.shifts[i].timein = timein;
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
        this.setState({ timeinhours: hours })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {

            if (hours.length === 2) {
                if (validateMonth(hours)) {



                    if (this.state.activeshiftid) {
                        const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                        if (myshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            let day = this.state.timeinday;
                            let year = this.state.timeinyear;
                            let month = this.state.timeinmonth;
                            let minutes = this.state.timeinminutes;
                            let time = this.state.timeinampm;
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                            timein = UTCTimeStringfromTime(timein);

                            myuser.driver.shifts[i].timein = timein;
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
        this.setState({ timeinyear: year })
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
                            let day = this.state.timeinday;
                            let month = this.state.timeinmonth;
                            let hours = this.state.timeinhours;
                            let minutes = this.state.timeinminutes;
                            let time = this.state.timeinampm;
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                            timein = UTCTimeStringfromTime(timein);
                            myuser.driver.shifts[i].timein = timein;
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
        this.setState({ timeinday: day })
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {

       
                if (day.length === 2) {

                    if (validateDate(day)) {


                            if (this.state.activeshiftid) {
                                const myshift = appbaseddriver.getshiftbyid.call(this,this.state.activeshiftid);
                                if (myshift) {

                                    const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.driver.shifts[i].timein = timein;
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
        this.setState({ timeinmonth: month })
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
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myuser.driver.shifts[i].timein = timein;
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
        if (this.state.timeinampm === 'am' && ampm === 'pm') {
            this.setState({ timeinampm: 'pm' })
        } else if (this.state.timeinampm === 'pm' && ampm === 'am') {
            this.setState({ timeinampm: 'am' })
        }

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {

                    if (this.state.activeshiftid) {
                        const myshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid);
                        if (myshift) {

                            const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)
                            let day = this.state.timeinday;
                            let year = this.state.timeinyear;
                            let month = this.state.timeinmonth;
                            let hours = this.state.timeinhours;
                            let time = ampm;
                            let minutes = this.state.timeinminutes;
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                        
                            timein = UTCTimeStringfromTime(timein);
                 
                            myuser.driver.shifts[i].timein = timein;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })


                        }

                    }

        }

    }

    showampm() {
        const styles = MyStylesheet();
        
        const timein = new TimeIn();
        const showam = () => {
            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{  ...styles.headerFont, ...styles.boldFont, ...styles.alignCenter, ...styles.generalPadding }} onPress={() => { timein.toggleampm.call(this, 'pm') }}>AM</Text>
            </View>)

        }
        const showpm = () => {

            return (<View style={{ ...styles.generalContainer }}>
                <Text style={{  ...styles.generalPadding, ...styles.headerFont, ...styles.boldFont, ...styles.alignCenter }} onPress={() => { timein.toggleampm.call(this, 'am') }}>PM</Text>
            </View>)

        }




        if (this.state.timeinampm === 'am') {
            return showam()
        } else if (this.state.timeinampm === 'pm') {
            return showpm()
        }


    }




    showtimein() {
        const styles = MyStylesheet();
        const timein = new TimeIn();
        const timeincalender = new TimeInCalender();
        return(   <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <View style={{ ...styles.flex1, ...styles.calenderContainer }}>
    
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>
                        <Text style={{ ...styles.generalFont, ...styles.regularFont }}>Time In (MM-DD-YYYY HH mm) </Text>
                    </View>
                </View>
    
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...styles.headerFont, ...styles.generalField, ...styles.alignCenter }} 
                            value={this.state.timeinmonth.toString()}
                            onChangeText={text => { timein.handlemonth.call(this, text) }}
                            />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...styles.headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeinday.toString()}
                            onChangeText={text => { timein.handleday.call(this, text) }} 
                            
                            />
                    </View>
                    <View style={{ ...styles.flex2, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...styles.headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeinyear.toString()}
                            onChangeText={text => { timein.handleyear.call(this, text) }} 
                            
                            />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...styles.headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeinhours.toString()}
                            onChangeText={text => { timein.handlehours.call(this, text) }}
                            />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
    
                        <TextInput style={{ ...styles.generalFont, ...styles.headerFont, ...styles.generalField, ...styles.alignCenter }}
                            value={this.state.timeinminutes.toString()}
                            onChangeText={text => { timein.handleminutes.call(this, text)
                             }}
                           
                             
                        />
                    </View>
                    <View style={{ ...styles.flex1, ...styles.addMargin }}>
                        {timein.showampm.call(this)}
                    </View>
                </View>

                {timeincalender.showTimeInCalender.call(this)}
    
               
    
            </View>
        </View>)
    }

}
export default TimeIn;