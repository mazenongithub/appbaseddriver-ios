import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver'
import Header from './header'


class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 }
        this.updatedimesions = this.updatedimesions.bind(this)

    }

    componentDidMount() {
        const appbaseddriver = new AppBasedDriver();
        appbaseddriver.checkuser.call(this)
        this.props.reduxNavigation({ navigation: 'landing' })
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height, orientation:Dimensions.get('screen')})
        Dimensions.addEventListener('change', this.updatedimesions)

    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updatedimesions)
    }

    updatedimesions() {
        this.setState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height })
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
            <View style={{ ...getMargin() }}>
                <View style={styles.alignCenter}>
                    <Image
                        source={{ uri: 'https://civilengineer.io/appbaseddriver/icons/2x/appbaseddriver.png' }}
                        style={logoWidth()} />
                </View>
                {header.showheader.call(this)}
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



