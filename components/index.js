import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver'
import Header from './header'
import Driver from './driver'
import { getMonString } from './functions'


class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = { width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation:'', message: '', driverid: '', checkdriverid: false, apple: '', google: '', emailaddresscheck: '', activeequipmentid: false, activeshiftid: false, calendertimein:true, calendertimeout:true,
        timeinmonth: '', timeinday: '', timeinyear: '', timeinhours: '', timeinminutes: '', timeinampm: '', timeoutmonth: '', timeoutday: '', timeoutminutes: '', timeouthours: '', timeoutyear: '', timeoutampm: '', activeyear: new Date().getFullYear(), activemonth: this.setActiveMonth(), activeslideid: "driver", spinner: false,  hideshifts: [], hidecosts: [], uistart: '', uiend: '', adjustment:false,  highlightbutton_1:false }
        this.updatedimesions = this.updatedimesions.bind(this)

    }

    componentDidMount() {
        const appbaseddriver = new AppBasedDriver();
        appbaseddriver.checkuser.call(this)
        this.props.reduxNavigation({ navigation: 'landing' })
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation:Dimensions.get('screen')})
        Dimensions.addEventListener('change', this.updatedimesions)
        this.timeindefault();
        this.timeoutdefault();
        this.setUI();

    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updatedimesions)
    }

    updatedimesions() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
    }

    setUI() {
        const uiend = new Date().getFullYear();
        let uistart = 0;
    
        if (this.state.width > 1200) {
          uistart = uiend - 3;
        } else if (this.state.width > 600) {
          uistart = uiend - 2;
        } else {
          uistart = uiend - 1;
    
        }
        this.setState({ uistart, uiend })
    
    
      }


  setActiveMonth() {
    const timeinmonth = () => {
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = `0${month}`
      }
      return month;
    }

    return [getMonString(Number(timeinmonth()))]


  }

  timeoutdefault() {
    const timeoutmonth = () => {
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = `0${month}`
      }
      return month;
    }
    const timeoutday = () => {
      let day = new Date().getDate();
      if (day < 10) {
        day = `0${day}`
      }
      return day;
    }
    const timeoutyear = () => {
      let year = new Date().getFullYear();

      return year;
    }
    const timeouthours = () => {
      let hours = new Date().getHours();
      if (hours > 12) {
        hours = hours - 12;
      } else if (hours < 10 && hours > 0) {
        hours = `0${hours}`
      } else if (Number(hours) === 0) {
        hours = 12;
      }
      return hours;

    }
    const timeoutminutes = () => {
      let minutes = new Date().getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      return minutes;
    }
    const timeoutampm = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        return 'am'
      } else {
        return 'pm'
      }
    }
    this.setState({ timeoutmonth: timeoutmonth(), timeoutday: timeoutday(), timeoutyear: timeoutyear(), timeouthours: timeouthours(), timeoutminutes: timeoutminutes(), timeoutampm: timeoutampm() })
  }


  timeindefault() {
    const timeinmonth = () => {
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = `0${month}`
      }
      return month;
    }
    const timeinday = () => {
      let day = new Date().getDate();
      if (day < 10) {
        day = `0${day}`
      }
      return day;
    }
    const timeinyear = () => {
      let year = new Date().getFullYear();

      return year;
    }
    const timeinhours = () => {
      let hours = new Date().getHours();
      if (hours > 12) {
        hours = hours - 12;
      } else if (hours < 10 && hours > 0) {
        hours = `0${hours}`
      } else if (Number(hours) === 0) {
        hours = 12;
      }
      return hours;
    }
    const timeinminutes = () => {
      let minutes = new Date().getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      return minutes;
    }
    const timeinampm = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        return 'am'
      } else {
        return 'pm'
      }
    }


    this.setState({ timeinmonth: timeinmonth(), timeinday: timeinday(), timeinyear: timeinyear(), timeinhours: timeinhours(), timeinminutes: timeinminutes(), timeinampm: timeinampm() })
  }




    showmainbody() {
        const appbaseddriver = new AppBasedDriver();
        const navigation = appbaseddriver.getNavigation.call(this).navigation;
        const driver = new Driver();

        switch (navigation) {
            case 'driver':
            return(driver.showDriver.call(this))
            default:
                break;
        }

        
    } 


    render() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const orientation = appbaseddriver.getOrientation.call(this)
        // const checkdimensions = () => {
        //     console.log(`checkdemisions , width:${this.state.width}, height: ${this.state.height}`)
        // }
        const logoWidth = () => {
            if(orientation === 'portrait') {
            return ({ width: Math.round(0.9 * this.state.width), height: Math.round(0.12 * this.state.width) })

            } else {
                return ({ width: Math.round(0.6 * this.state.width), height: Math.round(0.09 * this.state.width) })
            }
        }
        const getMargin = () => {
            if(orientation === 'portrait') {
                return { marginTop: 40, marginLeft: 5}
            } else {
                return { marginTop: 5, marginLeft: 5 }
            }
        }

        const header = new Header();


        return (
            <View style={{ ...getMargin(), ...styles.generalContainer }}>
                <View style={{...styles.alignCenter, ...styles.generalContainer }}>
                    <Image
                        source={{ uri: 'https://civilengineer.io/appbaseddriver/icons/2x/appbaseddriver.png' }}
                        style={logoWidth()} />
                </View>
                {header.showheader.call(this)}
                <ScrollView>
                {this.showmainbody()}
               
                <View style={{ height: 0.5*Dimensions.get('window').height }}>
                         
                </View>
                </ScrollView>
            </View>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation

    }

}

export default connect(mapStateToProps, actions)(MyApp)



