import React from 'react'
import { View, Text } from 'react-native'
import AppBasedDriver from './appbaseddriver';
import DriverUI from './driverui';
import { MyStylesheet } from './styles';
import Svg, {
    Rect,
    Text as TextSvg,
    G,
    Line,
    Path
} from 'react-native-svg';

class Costs {

    showchart(type) {
        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        const deliveries = appbaseddriver.getdeliveriesbyequipmentid.call(this, equipmentid)
        const hoursworked = appbaseddriver.gethoursworkedbyequipmentid.call(this, equipmentid)
        const miles = appbaseddriver.getmilesbyequipmentid.call(this, equipmentid)
        const costs = appbaseddriver.getcostsbyequipmentid.call(this, equipmentid)
        const costsperhours = costs > 0 && hoursworked > 0 ? costs / hoursworked : 0;
        const costsperdelivery = costs > 0 && deliveries > 0 ? costs / deliveries : 0;
        const costspermile = miles > 0 && costs > 0 ? costs / miles : 0;


        const getheight = (type, dollarsperhours, dollarsperdelivery, dollarspermile) => {
            let height = 0
            switch (type) {
                case 'hourly':
                    height = dollarsperhours > 0 ? Math.round(4 * dollarsperhours) : 0
                    break;
                case 'delivery':
                    height = dollarsperdelivery > 0 ? Math.round(10 * dollarsperdelivery) : 0
                    break;
                case 'miles':
                    height = dollarspermile > 0 ? Math.round(80 * dollarspermile) : 0
                    break;
                default:
                    break;
            }
            return height;

        }





        const getbarchart = (height, type, dollarsperhours, dollarsperdelivery, dollarspermile) => {

            const gettext = (type) => {
                switch (type) {
                    case 'hourly':
                        return (<TextSvg className="incomechart-3" x="94" y={Math.round(200 - height)}>${Number(dollarsperhours).toFixed(2)}/hr</TextSvg>)
                    case 'delivery':
                        return (<TextSvg className="incomechart-3" x="94" y={Math.round(200 - height)}>${Number(dollarsperdelivery).toFixed(2)}/delivery</TextSvg>)
                    case 'miles':
                        return (<TextSvg className="incomechart-3" x="94" y={Math.round(200 - height)}>${Number(dollarspermile).toFixed(2)}/mile</TextSvg>)
                    default:
                        break;
                }
            }

            return (

                <G>


                    <G transform='translate(54.43,208.35) scale(1,-1)'>



                        <Rect className="driverchart-7" x="40" y="0" width="61.48" height={getheight(type, costsperhours, costsperdelivery, costspermile)} />

                    </G>

                    {gettext(type)}

                </G>)
        }

        const labels = (type) => {

            switch (type) {
                case 'hourly':
                    return (<G>
                        <TextSvg className="incomechart-3" transform="translate(31.89 174.68)">10</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 133.69)">20</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 94.85)">30</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 54.32)">40</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 13.78)">50</TextSvg>
                    </G>)
                case 'delivery':
                    return (<G>

                        <TextSvg className="incomechart-3" transform="translate(36.89 174.68)">4</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(36.89 133.69)">8</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 94.85)">12</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 54.32)">16</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 13.78)">20</TextSvg>

                    </G>)
                case 'miles':
                    return (<G>
                        <TextSvg className="incomechart-3" transform="translate(25.89 174.68)">0.5</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 133.69)">1</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(25.89 94.85)">1.5</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(31.89 54.32)">2</TextSvg>
                        <TextSvg className="incomechart-3" transform="translate(25.89 13.78)">2.5</TextSvg>
                    </G>)

                default:
                    break;
            }


        }

        return (

            <Svg  viewBox="0 0 203.15 210.85" width="408" height="422">
                <G id="Layer_2" data-name="Layer 2"><G id="Layer_2-2" data-name="Layer 2">





                    {labels(type)}


                    <Line className="incomechart-4" x1="58.47" y1="8.35" x2="51.73" y2="8.35" />
                    <Line className="incomechart-4" x1="58.47" y1="48.35" x2="51.73" y2="48.35" />
                    <Line className="incomechart-4" x1="58.47" y1="88.35" x2="51.73" y2="88.35" />
                    <Line className="incomechart-4" x1="58.47" y1="128.35" x2="51.73" y2="128.35" />
                    <Line className="incomechart-4" x1="58.47" y1="168.35" x2="51.73" y2="168.35" />


                    <TextSvg className="incomechart-5" transform="translate(85 85.14)">Costs</TextSvg>
                    {getbarchart(getheight(type, costsperhours, costsperdelivery, costspermile), type, costsperhours, costsperdelivery, costspermile)}

                    <Path className="incomechart-1" d="M55.19,8.35q.26,100,.5,200" />
                    <Line className="incomechart-2" x1="54.43" y1="208.35" x2="202.55" y2="208.35" />

                </G></G></Svg>)

    }

    showcosts(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const deliveries = appbaseddriver.getdeliveriesbyequipmentid.call(this, equipmentid)
        const hoursworked = +Number(appbaseddriver.gethoursworkedbyequipmentid.call(this, equipmentid))
        const getcosts = appbaseddriver.getcostsbyequipmentid.call(this, equipmentid)
        const dollarsperhours = getcosts > 0 && hoursworked > 0 ? Number(getcosts / hoursworked).toFixed(2) : 0;
        const dollarsperdelivery = getcosts > 0 && deliveries > 0 ? Number(getcosts / deliveries).toFixed(2) : 0
        const miles = appbaseddriver.getmilesbyequipmentid.call(this, equipmentid)
        const dollarspermile = getcosts > 0 && miles > 0 ? Number(getcosts / miles).toFixed(2) : 0;
        const styles = MyStylesheet();
        const driverui = new DriverUI();
        const costs = new Costs();


        const output = () => {
            if (this.state.width > 600) {
                return (
                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>

                            {driverui.showui.call(this)}

                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1, ...styles.alignCenter }}>




                                    <Text style={{ ...regularFont, ...styles.generalFont }}>
                                        Deliveries
                                    </Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{deliveries}</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>
                                        Hours Worked
                                    </Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{+Number(hoursworked).toFixed(2)}</Text>
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Costs</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(getcosts).toFixed(2)}</Text>
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Miles</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{Number(miles)}</Text>

                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>  <Text style={{ ...regularFont, ...styles.generalFont }}>costs/hr</Text> 
                                        <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(dollarsperhours).toFixed(2)}</Text> 
                                        <Text style={{ ...regularFont, ...styles.generalFont }}>costs/delivery</Text> 
                                        <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(dollarsperdelivery).toFixed(2)}</Text> 
                                        <Text style={{ ...regularFont, ...styles.generalFont }}>costs/mile</Text> 
                                        <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(dollarspermile).toFixed(2)}</Text> </Text>
                                </View>

                            </View>
                        </View>
                    </View>
                )

            } else {

                return (

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>

                            {driverui.showui.call(this)}

                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>

                                    <Text style={{ ...regularFont, ...styles.generalFont }}>
                                        Deliveries
                                    </Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{deliveries}</Text>
                                </View>

                                <View style={{ ...styles.flex1 }}>

                                    <Text style={{ ...regularFont, ...styles.generalFont }}>
                                        Hours Worked
                                    </Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{+Number(hoursworked).toFixed(2)}</Text>
                                </View>

                            </View>

                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                                <View style={{ ...styles.flex1 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Costs</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(getcosts).toFixed(2)}</Text>
                                </View>
                                <View style={{ ...styles.flex1 }}>

                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Miles</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{Number(miles)}</Text>
                                </View>
                            </View>

                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                                <View style={{ ...styles.flex1 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>costs/hr</Text> 
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(dollarsperhours).toFixed(2)}</Text> 
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>costs/delivery</Text> 
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(dollarsperdelivery).toFixed(2)}</Text> 
                                   
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                <Text style={{ ...regularFont, ...styles.generalFont }}>costs/mile</Text> 
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(dollarspermile).toFixed(2)}</Text> 
                                </View>
                            </View>
                            

                        </View>
                    </View>



                           
                     
                )

    }
}

const showcosts = () => {
    if (this.state.width > 1200) {
        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>
                    {costs.showchart.call(this, 'hourly')}
                </View>
                <View style={{ ...styles.flex1 }}>
                    {costs.showchart.call(this, 'delivery')}
                </View>

                <View style={{ ...styles.flex1 }}>
                    {costs.showchart.call(this, 'miles')}
                </View>
            </View>)

    } else if (this.state.width > 800) {

        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>
                            {costs.showchart.call(this, 'hourly')}
                        </View>
                        <View style={{ ...styles.flex1 }}>
                            {costs.showchart.call(this, 'delivery')}
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                            {costs.showchart.call(this, 'miles')}
                        </View>
                    </View>

                </View>
            </View>)
    } else {
        return (<View style={{ ...styles.generalFlex }}>
            <View style={{ ...styles.flex1 }}>

                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                        {costs.showchart.call(this, 'hourly')}
                    </View>
                </View>

                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                        {costs.showchart.call(this, 'delivery')}
                    </View>
                </View>

                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <View style={{ ...styles.flex1 }}>
                        {costs.showchart.call(this, 'miles')}
                    </View>
                </View>

            </View>
        </View>)
    }

}

return (
    <View style={{ ...styles.generalFlex }}>
        <View style={{ ...styles.flex1 }}>

            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

                    {output()}

                    {showcosts()}

                </View>
            </View>

        </View>
    </View>
)
    }

}

export default Costs;