import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver'
import Header from './header'
import Driver from './driver'
import { getMonString } from './functions'
import Equipment from './equipment';
import ViewEquipment from './viewequipment';
import Profile from './profile'
import Access from './access';
import Receipts from './receipts';

class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: '', message: '', driverid: '', checkdriverid: false, apple: '', google: '', emailaddresscheck: '', activeequipmentid: false, activeshiftid: false, calendertimein: true, calendertimeout: true,
            timeinmonth: '', timeinday: '', timeinyear: '', timeinhours: '', timeinminutes: '', timeinampm: '', timeoutmonth: '', timeoutday: '', timeoutminutes: '', timeouthours: '', timeoutyear: '', timeoutampm: '', activeyear: new Date().getFullYear(), activemonth: this.setActiveMonth(), activeslideid: "driver", spinner: false, hideshifts: [], hidecosts: [], uistart: '', uiend: '', adjustment: false, highlightbutton_1: false,
            activecostid: false, equipmentday: '', equipmentmonth: '', equipmentyear: '', equipmentcalender: false, salvageday: '', salvagemonth: '', salvageyear: '', salvagecalender: false, purchasecalender: false, showrepayment: true, purchaseday: '', purchasemonth: '', purchaseyear: '', activeyear: new Date().getFullYear(), activemonth: false, spinner: false, hidecosts: [], uistart: '', uiend: '' 
        }
        this.updatedimesions = this.updatedimesions.bind(this)

    }

    componentDidMount() {
        const appbaseddriver = new AppBasedDriver();
        appbaseddriver.checkuser.call(this)
        this.props.reduxNavigation({ navigation: 'landing' })
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: Dimensions.get('screen') })
        Dimensions.addEventListener('change', this.updatedimesions)
        this.timeindefault();
        this.timeoutdefault();
        this.setUI();
        this.equipmentdatedefault()

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




    showmainbody() {
        const appbaseddriver = new AppBasedDriver();
        const navigation = appbaseddriver.getNavigation.call(this).navigation;
        const driver = new Driver();
        const equipment = new Equipment();
        const viewequipment = new ViewEquipment();
        const profile = new Profile();
        const access = new Access();
        const receipts = new Receipts();
        

        switch (navigation) {
            case 'profile':
                return (profile.showprofile.call(this));
            case 'driver':
                return (driver.showDriver.call(this))
            case 'equipment':
                return(equipment.showequipment.call(this))
            case 'viewequipment':
                return(viewequipment.showViewEquipment.call(this));
            case 'access':
                return(access.showaccess.call(this));  
            case 'receipts':
                return(receipts.showComponent.call(this));
            default:
                break;
        }


    }


    render() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const orientation = appbaseddriver.getOrientation.call(this)
      
        const getMargin = () => {
            if (orientation === 'portrait') {
                return { marginTop: 40, marginLeft: 5 }
            } else {
                return { marginTop: 5, marginLeft: 5 }
            }
        }

        const header = new Header();


        return (
            <View style={{ ...getMargin(), ...styles.generalContainer }}>
               
                {header.showheader.call(this)}
                <ScrollView>
                    {this.showmainbody()}

                    <View style={{ height: 0.5 * this.state.height }}>

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



