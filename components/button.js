import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const padding = { padding: 16 } 

export default class Button extends Component {

    buttons = {
        back: {
            icon: 'keyboard-arrow-left',
            description: 'VOLT'
        },
        next: {
            icon: 'keyboard-arrow-right',
            description: 'PROX'
        }
    }

    render() {
        const { type, fontFamily, iconSize = 16, textColor = 'hsl(0, 0%, 43%)', textFontSize = 24 } = this.props
            , buttonInfo = this.buttons[type]

        const textStyle = { color: textColor, fontSize: textFontSize, fontFamily: 'Roboto-Regular', position: 'relative', top: 1 }
            , iconStyle = { color: textColor, fontSize: iconSize }

        const icon = <Icon key="icon" name={buttonInfo['icon']} style={textStyle} />
            , description = <Text key="description" style={iconStyle}>{buttonInfo['description']}</Text>


        let components = []
        components[0] = type === 'back' ? icon : description
        components[1] = type === 'back' ? description : icon

        const style = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }

        return (
            <TouchableNativeFeedback onPress={this.props.onPress}>
                <View style={style}>
                    {components[0]}
                    <View style={{ marginRight: 5 }} />
                    {components[1]}
                </View>
            </TouchableNativeFeedback>
        )

    }

}

