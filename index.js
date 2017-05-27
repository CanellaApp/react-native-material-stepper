import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableNativeFeedback } from 'react-native'
import Controls from './components/controls'

const { height, width } = Dimensions.get('screen')

export default class MaterialStepper extends Component {

    constructor() {
        super()
        this.steps = []
    }

    static propTypes = {
        onEnd: PropTypes.func.isRequired,

        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element
        ]).isRequired,

        controlsStyle: PropTypes.shape({
            activatedDotColor: PropTypes.string,
            textFontFamily: PropTypes.string,
            textColor: PropTypes.string,
            textFontSize: PropTypes.number,
            backgroundColor: PropTypes.string,
            desactivatedDotColor: PropTypes.string,
            arrowIconSize: PropTypes.number,
        })
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
                <Controls onChangeStep={this.onChangeStep} numberOfSteps={steps.length} style={this.props.controlsStyle} />
            </View>
        );
    }
}







