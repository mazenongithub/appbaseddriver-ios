import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './actions';


class AppBasedDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        
        
    }

    render(){
        return(<View>
            <Text>Hello App</Text>
        </View>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation

    }

}

export default connect(mapStateToProps, actions)(AppBasedDriver)



