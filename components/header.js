
import React from 'react'
import { View, Text } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';

class Header {

    showsubheader() {
        const appbaseddriver = new AppBasedDriver();
        const mynav = appbaseddriver.getNavigation.call(this)    
        const myuser = appbaseddriver.getuser.call(this)
        const styles = MyStylesheet();
        let subheader = [];
        if (mynav) {
            if (myuser) {
                switch (mynav.navigation) {
                    case 'driver':
                        subheader.push(
                            <View style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }} key={`subheader-2`}>
                                <Text  style={{  ...styles.boldFont, ...styles.font24, ...styles.menuColor, ...styles.menuBackColor, ...styles.radius5, ...styles.padding5,  ...styles.addMargin }}>/driver</Text>
                            </View>
                        )
                        break
                    case 'equipment':
                        subheader.push(
                            <View style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }} key={`subheader-2`}>
                                <Text style={{  ...styles.boldFont, ...styles.font24, ...styles.menuColor, ...styles.menuBackColor, ...styles.radius5, ...styles.padding5,  ...styles.addMargin }}>/equipment</Text>
                            </View>
                        )
                        break;
              
                    default:
                        break;

                }
            }

        }
        return subheader;
    }



    showheader() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver()
        const myuser = appbaseddriver.getuser.call(this)
   

        const loginlink = (myuser) => {
            if (myuser) {
                return (<Text 
                style={{  ...styles.boldFont, ...styles.font24, ...styles.menuColor, ...styles.menuBackColor, ...styles.radius5, ...styles.padding5,  ...styles.addMargin }} 
                onPress={() => appbaseddriver.logoutuser.call(this)}>
                Logout 
                </Text>
                )

            } else {
                return (<Text style={{  ...styles.boldFont, ...styles.font24, ...styles.menuColor, ...styles.menuBackColor, ...styles.radius5, ...styles.padding5,  ...styles.addMargin }}
                    onPress={() => {
                    this.props.reduxNavigation({ navigation: 'login' })
                    this.setState({ render: 'render' })
                }}
                >Access</Text>)

            }

        }
        const equipmentlink = (myuser) => {

            if (myuser) {
                return (<Text onPress={() => {
                    this.props.reduxNavigation({ navigation: 'equipment' })
                    this.setState({ render: 'render' })
                }}
                     style={{  ...styles.boldFont, ...styles.font24, ...styles.menuColor, ...styles.menuBackColor, ...styles.radius5, ...styles.padding5,  ...styles.addMargin }}>/equipment</Text>)

            } 

        }

        const showdriver = (myuser) => {
            if (myuser) {
                return (<Text onPress={() => {
                    this.props.reduxNavigation({ navigation: 'driver' })
                    this.setState({ render: 'render' })
                }}
                    style={{  ...styles.boldFont, ...styles.font24, ...styles.menuColor, ...styles.menuBackColor, ...styles.radius5, ...styles.padding5,  ...styles.addMargin }}>/driver</Text>)

            }
        }

        const homelink = (myuser) => {
            if (myuser) {
                return (<Text onPress={() => {
                    this.props.reduxNavigation({ navigation: 'profile' })
                    this.setState({ render: 'render' })
                }} style={{  ...styles.boldFont, ...styles.font24, ...styles.menuColor, ...styles.menuBackColor, ...styles.radius5, ...styles.padding5,  ...styles.addMargin }}>/{myuser.driverid}</Text>)
            } 
        }


        const menu = () => {

            return (
                <View style={{ ...styles.generalFlex }}>


                    <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <View style={{ ...styles.generalContainer, ...styles.padding5, ...styles.bottomMargin10 }}>
                            {homelink(myuser)}
                            {equipmentlink(myuser)}
                            {showdriver(myuser)}
                            {loginlink(myuser)}
                        </View>

                    </View>

                </View>
            )


        }
        return (

            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>



                    {menu()}



                </View>

            </View>)
    }
}

export default Header;