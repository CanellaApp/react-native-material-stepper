import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Stepper from '../index.js'

const { height, width } = Dimensions.get('screen')

class Content extends React.Component {
    render() {
        return (
            <View style={{ width, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 50, color: '#673ab7' }}>{this.props.text}</Text>
            </View>
        )
    }
}

const steps = Array.from({ length: 5 }, (v, i) => <Content text={i} key={`content-${i}`} />)

const style = {
    activatedDotColor: '#673ab7',
    textFontFamily: 'Roboto-Regular',
    textColor: 'hsl(0, 0%, 43%)',
    backgroundColor: '#E6E6E6',
}

export default function App() {
    return <Stepper onEnd={() => alert('END!!')} controlsStyle={style} onChangeStep={(data)=>console.log(data)}>{steps}</Stepper>
}

