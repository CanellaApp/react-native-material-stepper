import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableNativeFeedback } from 'react-native'

const { height, width } = Dimensions.get('screen')
const grid = { paddingLeft: 16, paddingRight: 16 }

export default class MaterialStepper extends Component {

    constructor() {
        super()
        this.steps = []
    }

    isLastStep = (stepIndex) => {
        return stepIndex === this.steps.length
    }

    onChangeStep = (toDirection, stepIndex) => {
        if (toDirection === 'forward') {
            try {
                const step = this.steps[stepIndex]
                step && step.validate && step.validate()
            } catch (e) {
                return
            }
        }

        if (this.isLastStep(stepIndex)) this.props.onEnd()
        else this.scrollView.scrollTo({ x: stepIndex * width })
    }

    renderSteps = () => {
        const cloneMethod = child => {
            const props = { ...child.props, ref: e => this.steps.push(e) }
            return React.cloneElement(child, props)
        }

        return React.Children.map(this.props.children, cloneMethod)
    }

    render() {
        const steps = this.renderSteps()

        return (
            <View style={{ flex: 1 }}>
                <ScrollView scrollEnabled={false} ref={e => this.scrollView = e} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={this.onScroll}>
                    {steps}
                </ScrollView>
                <Controls onChangeStep={this.onChangeStep} numberOfSteps={steps.length} />
            </View>
        );
    }
}

class Controls extends Component {
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
        return (
            <View style={{ height: 50, backgroundColor: 'blue', ...grid, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button type="back" onPress={this.back} />
                <Button type="next" onPress={this.next} />
            </View>
        )
    }
}

import Icon from 'react-native-vector-icons/MaterialIcons'

class Button extends Component {

    buttons = {
        back: {
            icon: 'keyboard-arrow-left',
            description: 'Volt.'
        },
        next: {
            icon: 'keyboard-arrow-right',
            description: 'Próx.'
        }
    }

    render() {
        const { type } = this.props
            , buttonInfo = this.buttons[type]
            , style = { color: 'white', fontSize: 10 }

        const icon = <Icon key="icon" name={buttonInfo['icon']} style={style} />
            , description = <Text key="description" style={style}>{buttonInfo['description']}</Text>


        let components = []
        components[0] = type === 'back' ? icon : description
        components[1] = type === 'back' ? description : icon

        return (
            <TouchableNativeFeedback onPress={this.props.onPress}>
                <View style={{ width: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {components}
                </View>
            </TouchableNativeFeedback>
        )

    }






}



