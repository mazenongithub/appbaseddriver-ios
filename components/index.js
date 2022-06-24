import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver'
import Header from './header'
import Driver from './driver'
import Equipment from './equipment';
import ViewEquipment from './viewequipment';
import Profile from './profile'
import Access from './access';
import Receipts from './receipts';
import Landing from './landing'


class MyApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: '', message: '', driverid: '', checkdriverid: false, apple: '', google: '', emailaddresscheck: '', activeequipmentid: false, activeshiftid: false, calendertimein: true, calendertimeout: true, activeimage:'equipment',
            timeinmonth: '', timeinday: '', timeinyear: '', timeinhours: '', timeinminutes: '', timeinampm: '', timeoutmonth: '', timeoutday: '', timeoutminutes: '', timeouthours: '', timeoutyear: '', timeoutampm: '', activeyear: new Date().getFullYear(), activemonth: [], activeslideid: "driver", spinner: false, hideshifts: [], hidecosts: [], uistart: '', uiend: '', adjustment: false, highlightbutton_1: false,
            activecostid: false, equipmentday: '', equipmentmonth: '', equipmentyear: '', equipmentcalender: false, salvageday: '', salvagemonth: '', salvageyear: '', salvagecalender: false, purchasecalender: false, showrepayment: true, purchaseday: '', purchasemonth: '', purchaseyear: '', activeyear: new Date().getFullYear(), spinner: false, hidecosts: [], uistart: '', uiend: '', totalearnings:0
        }
        this.updatedimesions = this.updatedimesions.bind(this)

    }

    componentDidMount() {
        const appbaseddriver = new AppBasedDriver();
        appbaseddriver.checkuser.call(this)
        this.props.reduxNavigation({ navigation: 'landing' })
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation: Dimensions.get('screen') })
        Dimensions.addEventListener('change', this.updatedimesions)
        appbaseddriver.setActiveMonth.call(this)
        appbaseddriver.timeindefault.call(this)
        appbaseddriver.timeoutdefault.call(this)
        appbaseddriver.setUI.call(this)
        appbaseddriver.equipmentdatedefault.call(this)
        

    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updatedimesions)
    }

    updatedimesions() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
    }
    showmainbody() {
        const appbaseddriver = new AppBasedDriver();
        const navigation = appbaseddriver.getNavigation.call(this).navigation;
        const driver = new Driver();
        const equipment = new Equipment();
        const viewequipment = new ViewEquipment();
        const profile = new Profile();
        const access = new Access();
        const landing = new Landing();
        

        switch (navigation) {

            case 'landing':
                return(landing.showLanding.call(this))
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
                return(<Receipts/>);
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
               
                
                <ScrollView>
                    {header.showheader.call(this)}
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



