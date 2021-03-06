import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native';

import { Palette, Typography } from '../../styles'

const Title = styled(Text)`
  font-weight: ${(props) => {
    if(props.light) return 300;
    else if(props.normal) return 'normal';
    else if(props.extraBold) return 900;
    return 800;
  }};
  background-color: transparent;
  color: ${props => {
    if (props.color) return props.color
    else if (props.inverted) return Palette.white
    else if (props.highlight) return Palette.accent
    else if (props.error) return Palette.error
    else if (props.secondary) return Palette.secondary
    else if (props.disabled) return Palette.neutral
    return Palette.text
  }};
  font-size: ${props => {
    if (props.small) return Typography.size.large
    if (props.jumbo) return Typography.size.jumbo
    return Typography.size.big
  }}
`

export default Title
