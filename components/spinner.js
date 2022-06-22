import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, {
    Rect,
    G
} from 'react-native-svg';
import { MyStylesheet } from './styles'


class Spinner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeposition: 0
        }


    }

    componentDidMount() {

        this.getSpinner = window.setInterval(() => {

            let currentposition = this.state.activeposition;
            const activeposition = this.spinnerPosition(currentposition);
        
            this.setState({ activeposition })



        }, 333)





    }

    componentWillUnmount() {

        window.clearInterval(this.getSpinner);

    }


    spinnerPosition(num) {
        console.log(num)
        switch (num) {

            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 0;
            default:
                return 0;



        }



    }



    render() {
        const styles = MyStylesheet();
        const activeposition = this.state.activeposition;

        const rect_1 = (activeposition) => {
            if(activeposition === 0) {
                return(  <Rect fill='#bcbec0' stroke='#231f20' x=".5" y=".5" width="21.57" height="21.57" />)

            } else {
                return(  <Rect fill='none' stroke='#231f20' x=".5" y=".5" width="21.57" height="21.57" />)
            }


        }

        const rect_2 = (activeposition) => {

            if(activeposition === 1) {

                return(<Rect fill='#bcbec0' stroke='#231f20' x="36.63" y=".5" width="21.57" height="21.57" />)

            } else {
                return(<Rect fill='none' stroke='#231f20' x="36.63" y=".5" width="21.57" height="21.57" />)
            }


        }

        const rect_3 = (activeposition) => {

            if(activeposition === 2) {

                return(<Rect fill='#bcbec0' stroke='#231f20' x="72.77" y=".5" width="21.57" height="21.57" />)

            } else {

                return(<Rect fill='none' stroke='#231f20' x="72.77" y=".5" width="21.57" height="21.57" />)

            }


        }

        return (<View styles={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
            <Svg width='95'  height='23' viewBox="0 0 94.84 22.57">
                <G>
                    {rect_1(activeposition)}
                    {rect_2(activeposition)}
                    {rect_3(activeposition)}
                    
                </G>
            </Svg>

        </View>)
    }


}


export default Spinner;


