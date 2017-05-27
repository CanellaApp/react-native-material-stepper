import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import Dots from './dots.js'
import Button from './button.js'

const grid = { paddingLeft: 16, paddingRight: 16 }

export default class Controls extends Component {
    constructor(props) {
        super()
        this.state = {
            currentStep: 0
        }
    }

    changeStep = (direction) => {
        const { currentStep: stepIndex } = this.state
        this.props.onChangeStep(direction, stepIndex)
    }

    stateUpdater = (prevState, move) => {
        const nextStep = prevState.currentStep + move
            , { numberOfSteps } = this.props
            , isValid = nextStep >= 0 && nextStep <= numberOfSteps

        return isValid && { currentStep: nextStep }
    }


    updateStepIndex = (move) => {
        const direction = move > 0 ? 'forward' : 'backward'
            , callback = () => this.changeStep(direction)

        this.setState(
            prevState => this.stateUpdater(prevState, move),
            callback
        )
    }


    next = () => {
        this.updateStepIndex(+1)
    }

    back = () => {
        this.updateStepIndex(-1)
    }


    render() {
        const {
            activatedDotColor,
            textFontFamily,
            textColor,
            textFontSize,
            backgroundColor,
            desactivatedDotColor = 'hsl(0, 0%, 69%)',
            arrowIconSize = 15,
        } = this.props.style

        const buttonStyle = {
            fontFamily: textFontFamily,
            textFontSize,
            iconSize: arrowIconSize,
            textColor
        }

        return (
            <View style={{ backgroundColor, ...grid, paddingTop: 16, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button type="back" onPress={this.back}  {...buttonStyle} />
                <Dots selectedDot={this.state.currentStep} numberOfDots={this.props.numberOfSteps} activedColor={activatedDotColor} desactivatedColor={desactivatedDotColor} />
                <Button type="next" onPress={this.next} {...buttonStyle} />
            </View>
        )
    }
}