import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

export default class Dots extends Component {

    diameter = 7.5

    dot(index) {
        const { selectedDot = 0, activedColor = 'red', desactivatedColor = 'hsl(0, 0%, 69%)' } = this.props
            , backgroundColor = selectedDot === index ? activedColor : desactivatedColor
            , d = this.diameter

        const style = { width: d, height: d, borderRadius: d / 2, backgroundColor }

        return <View style={style} key={`dot-${index}`} />
    }


    render() {
        const { numberOfDots } = this.props

        const height = this.diameter * 3
            , width = height * numberOfDots

        const dots = Array.from({ length: numberOfDots }, (v, i) => this.dot(i))

        const style = { width, height, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }

        return (
            <View style={style} >
                {dots}
            </View>
        )
    }
}