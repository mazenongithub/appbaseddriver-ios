import AppBasedDriver from './appbaseddriver'
import { View, Text, TextInput} from 'react-native'
import { MyStylesheet } from './styles'
import ClientID from './clientid';
import { CheckDriverID } from './actions/api'
import Profile from './profile'
import { validateDriverID } from './functions'

class Access {

    

    async checkdriverid() {
        const driverid = this.state.driverid;
        console.log(driverid)
        try {
            this.setState({ spinner: true })
            const response = await CheckDriverID(driverid)
            console.log(response)

            if (response.hasOwnProperty("invalid")) {
                this.setState({ checkdriverid: false, message: response.invalid, spinner: false})
            } else {
                this.setState({ checkdriverid: true, message:`${driverid} is valid, press ok to register`, spinner: false })
            }

        } catch (err) {
            alert(err)
            this.setState({ spinner: false })
        }
    }

    handledriverid(driverid) {
        driverid = driverid.toLowerCase();

        this.setState({ driverid })
        let message = validateDriverID(driverid)
        if (message) {
            this.setState({ checkdriverid:false, message })
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



        const register = () => {
            if ((this.state.apple || this.state.google) && this.state.driverid && this.state.checkdriverid && (!this.state.spinner)) {
                return (

                <Text style={{ ...styles.generalButton, ...okIconWidth()}} onPress={() => { appbaseddriver.clientlogin.call(this) }}>
                    {okIcon()}
                </Text>)


            } else if (this.state.spinner) {
                return(<Text>...</Text>)
            }
        }

        const showdriverid = () => {


            if (!myuser && (this.state.access === 'register')) {

                return (<View style={{ ...styles.generalContainer, ...styles.bottomMargin10 }}>
                    <Text style={{ ...styles.generalFont, ...regularFont }}>Please Create A Driver ID</Text>
                    <TextInput style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                        onChangeText={text => { access.handledriverid.call(this, text) }}
                        value={this.state.driverid.toString()}
                         />
                </View>
                )
            }

        }


        if (myuser) {

            return (profile.showprofile.call(this))

        } else {
            return (
                <View style={{ ...styles.generalContainer }}>


                    {clientid.showclientid.call(this)}

                    {showdriverid()}
                    {register()}

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