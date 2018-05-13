import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, Animated } from 'react-native';
import styled, { css } from 'styled-components/native';
import Typo from '../Typography';
import Button from '../Button/Button';
import { Palette } from '../../styles';

const Action = ({ text, onPress, type, template }) => {

  if(type === 'cancel') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Typo.TextBody color={Palette.dark.alpha(0.6).css()}>{text}</Typo.TextBody>
      </TouchableOpacity>
    )
  } else if (type === 'template') {
    return template;
  }

  return (
    <ButtonAction pill title={text} onPress={onPress} />
  )
};

const ButtonAction = styled(Button)`
  margin-bottom: 10;
  margin-horizontal: 20;
  align-self: stretch;
`;


class CustomAlert extends Component {
  state = {
    visible: false,
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open !== this.props.open) {
      this.setState({ visible: nextProps.open });
    }
  }

  render() {
    const { actions, alertContent } = this.props;
    const { visible } = this.state;

    return (
      <Container>
        <Modal
          visible={visible}
          transparent
          animationType='fade'
          onShow={this.onShow}
          onDismiss={this.onDismiss}
        >
          <ContainerAlert>
            <Card>
              <TileContainer>
                {alertContent && alertContent}
              </TileContainer>

              <ActionsContainer>
                {(actions || []).map((action, i) => {
                  return (
                    <Action
                      {...action}
                      key={`alert-action-${i}`}
                      onPress={() => {
                        if(action.onPress) action.onPress();
                        if(!(action || {}).notCloseOnPress) this.setState({ visible: false });
                      }}
                    />
                  );
                })}
              </ActionsContainer>
            </Card>
          </ContainerAlert>
        </Modal>
      </Container>
    );
  }
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`;

const ContainerAlert = styled(View)`
  flex: 1;
  justify-content: center;
  background-color: ${Palette.dark.alpha(0.5).css()}
`;

const Card = styled(Animated.View)`
  background-color: white;
  margin-horizontal: 40;
  box-shadow: 5px 5px 5px ${Palette.dark.alpha(0.4).css()};
  border-radius: 10;
  padding: 10px 10px;
`;

const TileContainer = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 20;
  padding: 10px 10px;
`;

const ActionsContainer = styled(View)`
  align-items: center;
`;

export default CustomAlert;