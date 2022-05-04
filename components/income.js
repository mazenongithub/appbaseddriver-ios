import React from 'react'
import { View, Text } from 'react-native'
import AppBasedDriver from './appbaseddriver';
import { MyStylesheet } from './styles'
import { getXcoord, abbDateStr } from './functions'
import Svg, {
    Rect,
    Text as TextSvg,
    G,
    Line,
    Path
} from 'react-native-svg';

class Income {



    handleshowincome(shiftid) {
        if (this.state.showincome === shiftid) {
            this.setState({ showincome: false })
        } else {
            this.setState({ showincome: shiftid })
        }

    }

    showpoint(shift) {
        const income = new Income();

        const xcoord = (shift) => {
            return (getXcoord(shift.timein))
        }
        const getDisplay = (shift) => {
            if (this.state.showincome !== shift.shiftid) {
                return ({ display: 'none' })
            }
        }

        return (<G transform="translate(75,205) scale(1,-1)" onClick={() => { income.handleshowincome.call(this, shift.shiftid) }}>
            <TextSvg class="income-4" x={xcoord(shift)} y={shift.earnings}>x</TextSvg>
            <TextSvg style={{ ...getDisplay(shift) }} class="income-5" transform="scale(1,-1)" x={xcoord(shift) - 16} y={-shift.earnings - 2}>${Number(shift.earnings).toFixed(2)}</TextSvg>
            <TextSvg style={{ ...getDisplay(shift) }} class="income-5" transform="scale(1,-1)" x={xcoord(shift) - 11} y={-(shift.earnings - 20)}>{abbDateStr(shift.timein)}</TextSvg>
        </G>)

    }

    showpoints() {

        const appbaseddriver = new AppBasedDriver();
        const income = new Income();
        const shifts = appbaseddriver.getshifts.call(this)

        let points = [];
        if (shifts) {
            // eslint-disable-next-Line
            shifts.map(shift => {
                points.push(income.showpoint.call(this, shift))



            })



        }
        return points;

    }

    showdollarsperhour() {
        return (
            <G transform="translate(105.95 141.77)">
                <TextSvg class="income-4" >$15.24/hr</TextSvg>
                <Line class="income-7" x1="879.63" y1="149.58" x2="79.11" y2="149.58" />
            </G>)
    }

    showchart(type) {
        const appbaseddriver = new AppBasedDriver();

        const deliveries = appbaseddriver.getdeliveries.call(this)
        const hoursworked = appbaseddriver.gethoursworked.call(this)
        const earnings = appbaseddriver.getearnings.call(this)

        const dollarsperhours = earnings > 0 && hoursworked > 0 ? Number(earnings / hoursworked).toFixed(2) : 0;
        const dollarsperdelivery = earnings > 0 && deliveries > 0 ? Number(earnings / deliveries).toFixed(2) : 0;
        const miles = appbaseddriver.getmiles.call(this)
        const dollarspermile = miles > 0 && earnings > 0 ? Number(earnings / miles).toFixed(2) : 0;
        const costs = appbaseddriver.getdrivercosts.call(this)
        const costsperhours = costs > 0 && hoursworked > 0 ? costs / hoursworked : 0;
        const costsperdelivery = costs > 0 && deliveries > 0 ? costs / deliveries : 0;
        const costspermile = miles > 0 && costs > 0 ? costs / miles : 0;
        const netperhour = dollarsperhours - costsperhours;
        const netperdelivery = dollarsperdelivery - costsperdelivery;
        const netpermile = dollarspermile - costspermile;

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

        const getnetbarchart = (height, type, netperhour, netperdelivery, netpermile) => {

            const getnettext = (type, netperhour, netperdelivery, netpermile) => {
                switch (type) {
                    case 'hourly':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="328.48" y={Math.round(200 - height)}>${Number(netperhour).toFixed(2)}/hr</TextSvg>)
                    case 'delivery':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="300.48" y={Math.round(200 - height)}>${Number(netperdelivery).toFixed(2)}/delivery</TextSvg>)
                    case 'miles':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="328.48" y={Math.round(200 - height)}>${Number(netpermile).toFixed(2)}/mile</TextSvg>)
                    default:
                        break;
                }
            }

            return (

                <G>


                    <G transform='translate(54.43,208.35) scale(1,-1)'>



                        <Rect stroke='#231f20' fill='#015d40' x="286.74" y="0" width="61.48" height={getheight(type, netperhour, netperdelivery, netpermile)} />

                    </G>

                    {getnettext(type, netperhour, netperdelivery, netpermile)}

                </G>)
        }




        const getcostbarchart = (height, type, costsperhours, costsperdelivery, costspermile) => {

            const getcosttext = (type, costsperhours, costsperdelivery, costspermile) => {
                switch (type) {
                    case 'hourly':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="210.48" y={Math.round(200 - height)}>${Number(costsperhours).toFixed(2)}/hr</TextSvg>)
                    case 'delivery':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="200.48" y={Math.round(200 - height)}>${Number(costsperdelivery).toFixed(2)}/delivery</TextSvg>)
                    case 'miles':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="210.48" y={Math.round(200 - height)}>${Number(costspermile).toFixed(2)}/mile</TextSvg>)
                    default:
                        break;
                }
            }

            return (

                <G>


                    <G transform='translate(54.43,208.35) scale(1,-1)'>



                        <Rect fill='#f1a41f' stroke='#231f20'  x="155.92" y="0" width="61.48" height={getheight(type, costsperhours, costsperdelivery, costspermile)} />

                    </G>

                    {getcosttext(type, costsperhours, costsperdelivery, costspermile)}

                </G>)
        }

        const getbarchart = (height, type, dollarsperhours, dollarsperdelivery, dollarspermile) => {

            const gettext = (type) => {
                switch (type) {
                    case 'hourly':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="94" y={Math.round(200 - height)}>${Number(dollarsperhours).toFixed(2)}/hr</TextSvg>)
                    case 'delivery':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="94" y={Math.round(200 - height)}>${Number(dollarsperdelivery).toFixed(2)}/delivery</TextSvg>)
                    case 'miles':
                        return (<TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' x="94" y={Math.round(200 - height)}>${Number(dollarspermile).toFixed(2)}/mile</TextSvg>)
                    default:
                        break;
                }
            }

            return (

                <G>


                    <G transform='translate(54.43,208.35) scale(1,-1)'>



                        <Rect fill='#1c4033' stroke='#231f20'  x="40" y="0" width="61.48" height={getheight(type, dollarsperhours, dollarsperdelivery, dollarspermile)} />

                    </G>

                    {gettext(type)}

                </G>)
        }

        const labels = (type) => {

            switch (type) {
                case 'hourly':
                    return (<G>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 174.68)">10</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 133.69)">20</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 94.85)">30</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 54.32)">40</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 13.78)">50</TextSvg>
                    </G>)
                case 'delivery':
                    return (<G>

                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(36.89 174.68)">4</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(36.89 133.69)">8</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 94.85)">12</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 54.32)">16</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 13.78)">20</TextSvg>

                    </G>)
                case 'miles':
                    return (<G>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(25.89 174.68)">0.5</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 133.69)">1</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(25.89 94.85)">1.5</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(31.89 54.32)">2</TextSvg>
                        <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(25.89 13.78)">2.5</TextSvg>
                    </G>)

                default:
                    break;
            }


        }
        

        return (

            <Svg viewBox="0 0 403.15 210.85" width="360" height="180">
                <G id="Layer_2" data-name="Layer 2"><G id="Layer_2-2" data-name="Layer 2">
                    {labels(type)}

                    <Line stroke='#231f20' strokeWidth='1' x1="58.47" y1="8.35" x2="51.73" y2="8.35" />
                    <Line stroke='#231f20' strokeWidth='1' x1="58.47" y1="48.35" x2="51.73" y2="48.35" />
                    <Line stroke='#231f20' strokeWidth='1' x1="58.47" y1="88.35" x2="51.73" y2="88.35" />
                    <Line stroke='#231f20' strokeWidth='1' x1="58.47" y1="128.35" x2="51.73" y2="128.35" />
                    <Line stroke='#231f20' strokeWidth='1' x1="58.47" y1="168.35" x2="51.73" y2="168.35" />


                    <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(85 85.14)">Income</TextSvg>
                    {getbarchart(getheight(type, dollarsperhours, dollarsperdelivery, dollarspermile), type, dollarsperhours, dollarsperdelivery, dollarspermile)}
                    {getcostbarchart(getheight(type, costsperhours, costsperdelivery, costspermile), type, costsperhours, costsperdelivery, costspermile)}
                    {getnetbarchart(getheight(type, netperhour, netperdelivery, netpermile), type, netperhour, netperdelivery, netpermile)}

                    <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(190.56 122.79)">Costs</TextSvg>
                    <TextSvg fill='#231f20' fontSize='16' strokeWidth='2' fontWeight='700' transform="translate(326.25 144.96)">Net</TextSvg>
                    <Path fill='none' strokeWidth='2' stroke='#231f20'  d="M55.19,8.35q.26,100,.5,200" />
                    <Line fill='none' strokeWidth='5' stroke='#231f20'  x1="54.43" y1="208.35" x2="402.55" y2="208.35" />

                </G></G></Svg>)

    }

    showincome() {
        const appbaseddriver = new AppBasedDriver();
        const income = new Income();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const deliveries = appbaseddriver.getdeliveries.call(this)
        const hoursworked = appbaseddriver.gethoursworked.call(this)

        const earnings = appbaseddriver.getearnings.call(this)
        const costs = appbaseddriver.getdrivercosts.call(this)
        const net = earnings - costs;
        const miles = appbaseddriver.getmiles.call(this)

        const showchart = () => {
            if (this.state.width > 1200) {
                return (
                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>
                            {income.showchart.call(this, 'hourly')}
                        </View>
                        <View style={{ ...styles.flex1}}>
                            {income.showchart.call(this, 'delivery')}
                        </View>

                        <View style={{ ...styles.flex1}}>
                            {income.showchart.call(this, 'miles')}
                        </View>
                    </View>)

            } else if (this.state.width > 800) {

                return (
                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>

                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>
                                    {income.showchart.call(this, 'hourly')}
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    {income.showchart.call(this, 'delivery')}
                                </View>
                            </View>

                            <View style={{ ...styles.generalFlex }}>
                                <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    {income.showchart.call(this, 'miles')}
                                </View>
                            </View>

                        </View>
                    </View>)

            } else {

                return(<View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1}}>
                            {income.showchart.call(this, 'hourly')}
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>
                            {income.showchart.call(this, 'delivery')}
                        </View>
                    </View>

                    <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1}}>
                            {income.showchart.call(this, 'miles')}
                        </View>
                    </View>

                </View>
            </View>)

            }

        }




        const output = () => {
            if (this.state.width > 600) {
                return (
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
                            <Text style={{ ...regularFont, ...styles.generalFont }}>Earnings</Text>
                            <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(earnings).toFixed(2)}</Text> 
                            <Text style={{ ...regularFont, ...styles.generalFont }}>Costs</Text>
                            <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(costs).toFixed(2)}</Text> 
                            <Text style={{ ...regularFont, ...styles.generalFont }}>Net</Text>
                            <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(net).toFixed(2)}</Text> 
                        </View>
                        <View style={{ ...styles.flex1 }}>

                            <Text style={{ ...regularFont, ...styles.generalFont }}>Miles</Text>
                            <Text style={{ ...regularFont, ...styles.generalFont }}>{Number(miles)}</Text>

                        </View>


                    </View>
                )

            } else {

                return (

                    <View style={{ ...styles.generalFlex }}>
                        <View style={{ ...styles.flex1 }}>

                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>

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
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Earnings</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(earnings).toFixed(2)}</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Costs</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(costs).toFixed(2)}</Text> 
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Net</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>${Number(net).toFixed(2)}</Text> 
                                </View>
                            </View>
                            <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>

                                    <Text style={{ ...regularFont, ...styles.generalFont }}>Miles</Text>
                                    <Text style={{ ...regularFont, ...styles.generalFont }}>{Number(miles)}</Text>
                                </View>

                            </View>

                        </View>
                    </View>
                )

            }
        }


        const styles = MyStylesheet();
        return (
            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>

                    {output()}

                    {showchart()}

                

                </View>
            </View>

        )

    }

}
export default Income;