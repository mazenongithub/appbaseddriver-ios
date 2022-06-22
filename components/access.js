import AppBasedDriver from './appbaseddriver'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles'
import ClientID from './clientid';
import { RegisterNewDriver } from './actions/api'
import Profile from './profile'
import { validateDriverID } from './functions'
import Spinner from './spinner';

class Access {

    async registerNewDriver() {
        const appbaseddriver = new AppBasedDriver()
        const { firstname, lastname, emailaddress, profileurl, phonenumber, apple, google, driverid } = this.state;
        const values = { firstname, lastname, emailaddress, profileurl, phonenumber, apple, google, driverid }
        if(this.state.checkdriverid) {

        try {
            this.setState({spinner:true})
            const mydriver = await RegisterNewDriver(values)
            this.setState({spinner:false})
            if(!mydriver.hasOwnProperty("invalid")) {
             appbaseddriver.resetState.call(this)
             this.props.reduxUser(mydriver)

            } else {
                this.setState({checkdriverid:false, message:mydriver.invalid})
            }

        }
        catch(err) {
            alert(err)
            this.setState({spinner:false})

        }

    }
    
    }


  
    handledriverid(driverid) {
        driverid = driverid.toLowerCase();

        this.setState({ driverid })
        let message = validateDriverID(driverid)
        if (message) {
            this.setState({ checkdriverid: false, message })
        } else {
            this.setState({ checkdriverid: true, message })
        }

    }

    showaccess() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const headerFont = appbaseddriver.getHeaderFont.call(this)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const clientid = new ClientID();
        const access = new Access();
        const myuser = appbaseddriver.getuser.call(this)
        const profile = new Profile();


        const okIconWidth = () => {
            if (this.state.width > 1200) {
                return ({ width: 90 })

            } else if (this.state.width > 600) {
                return ({ width: 80 })

            } else {
                return ({ width: 70 })
            }
        }

        const registerNow = () => {
            if ((this.state.apple || this.state.google) && this.state.driverid && this.state.checkdriverid) {

                return (

                    <View style={{ ...styles.generalContainer, ...styles.alignCenter }}>



                        <TouchableOpacity onPress={() => { access.registerNewDriver .call(this) }}>
                            <Image
                                source={require('./icons/registernow.png')}
                                style={styles.registerNow}
                                resizeMethod='scale'
                            />
                        </TouchableOpacity>

                    </View>)

            }
        }



        const register = () => {
            if (this.state.apple && this.state.driverid && this.state.checkdriverid && this.state.access ==='register') {
                return (

                    <View style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <TouchableOpacity>

                        <Image source={require('./icons/greencheck.png')}
                            style={styles.greenCheckSmall}
                            resizeMethod='scale'
                        />

                    </TouchableOpacity>

                    </View>
     )


    }  else if (!this.state.checkdriverid) {

       return( <View style={{ ...styles.generalContainer, ...styles.alignCenter }}>

                        <Image source={require('./icons/redx.png')}
                            style={styles.removeIcon}
                            resizeMethod='scale'
                        />

                    </View>)

    }
}

const showdriverid = () => {


    if (this.state.apple && this.state.access === 'register') {

        return (<View style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
            <View style={{ ...styles.flex4 }}>
                <Text style={{ ...styles.generalFont, ...regularFont }}>Please Create A Driver ID</Text>
                <TextInput style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                    onChangeText={text => { access.handledriverid.call(this, text) }}
                    value={this.state.driverid.toString()}
                    

                />

            </View>
            <View style={{ ...styles.flex1 }}>
                {register()}
            </View>
        </View>
        )
    }

}


const showspinner = () => {
    if(this.state.spinner) {
        return(<View style={{...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter}}>
            <Spinner/>
            </View>)
    }
}


if (myuser) {

    return (profile.showprofile.call(this))

} else {
    return (
        <View style={{ ...styles.generalContainer }}>


            {clientid.showclientid.call(this)}

            {showdriverid()}

            {registerNow()}

            {showspinner()}


            <View style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <Text style={{ ...styles.generalFont, ...regularFont }}>
                    {this.state.message}
                </Text>
            </View>



        </View>)

}
    }

}

export default Access;