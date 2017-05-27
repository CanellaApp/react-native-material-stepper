import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableNativeFeedback } from 'react-native'

const { height, width } = Dimensions.get('screen')
const grid = { paddingLeft: 16, paddingRight: 16 }

export default class MaterialStepper extends Component {

    leafThrough = (pageIndex) => {
        this.scrollView.scrollTo({ x: pageIndex * width })
    }

    render() {
        const components = Array.from({ length: 50 }, (v, i) => <Content text={i} key={`content-${i}`} />)

        return (
            <View style={{ flex: 1 }}>
                <ScrollView scrollEnabled={false} ref={e => this.scrollView = e} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={this.onScroll}>
                    {components}
                </ScrollView>
                <Controls leafThrough={this.leafThrough} numberOfPages={components.length} />
            </View>
        );
    }
}

class Controls extends Component {
    constructor(props) {
        super()
        this.state = {
            currentPage: 0
        }
    }

    leafThrough = () => {
        const { currentPage: nextPage } = this.state
        this.props.leafThrough(nextPage)
    }

    stateUpdater = (prevState, move) => {
        const nextPage = prevState.currentPage + move
            , { numberOfPages } = this.props
            , isValid = nextPage >= 0 && nextPage < numberOfPages

        return isValid && { currentPage: nextPage }
    }


    updatePageIndex = (move) => {
        this.setState(
            prevState => this.stateUpdater(prevState, move), 
            this.leafThrough
        )
    }


    next = () => {
        this.updatePageIndex(+1)
    }

    back = () => {
        this.updatePageIndex(-1)
    }


    render() {
        return (
            <View style={{ height: 50, backgroundColor: 'blue', ...grid, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableNativeFeedback onPress={this.back}>
                    <View>
                        <Text>Back</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.next}>
                    <View>
                        <Text>Next</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

}


function Content({ text }) {
    return (
        <View style={{ width, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 50, color: 'blue' }}>{text}</Text>
        </View>
    )
}

