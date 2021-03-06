import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Palette } from '../../styles';
import { Avatar, Typo, ButtonTag, ButtonGradient } from '../index.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient, BlurView } from 'expo';
import { Image } from 'react-native-expo-image-cache';

const Coupon = ({
  image,
  title,
  maker,
  office,
  endAt,
  startAt,
  status = { label: 'unavailable', color: Palette.neutralLight },
  totalCoupons = 0,
  onPress,
  tagButton = {},
  hideTag = false,
  hideTotalCoupons,
  canHunt = true,
  small,
  background,
  ...rest,
}) => {
  const imageSource = image && { uri: image };
  const companyLogo = (((office || {}).company || {}).logo) && { uri: office.company.logo };
  const businessName = ((office || {}).company || {}).businessName || '';

  return (
    <Container {...rest}>
      <CouponContainer onPress={onPress}>
        <Box small={small} background={background}>
          <LeftCouponContainer>
            <Avatar size={50} source={companyLogo} />
            {!hideTotalCoupons && <Coupons>
              <Icon size={17} name="ticket-confirmation" color={Palette.white.css()} />
              <Typo.Header bold inverted>{totalCoupons}</Typo.Header>
            </Coupons>}
          </LeftCouponContainer>

          <RightContainer>
            <ImageContainer
              resizeMode="cover"
              {...imageSource}
            />
            {small && <Overlay />}

            <ContentTop colors={[small ? 'transparent' : Palette.dark.css(), 'transparent']}>
              <SubTitle numberOfLines={1} small inverted bold>{businessName.toUpperCase()}</SubTitle>
              {!hideTag &&
                <ButtonTag
                  onPress={tagButton.onPress && tagButton.onPress}
                  backgroundColor={status.color}
                  title={status.label}
                  {...tagButton}
                />}
            </ContentTop>

            <GradientContainer colors={['transparent', small ? 'transparent' : Palette.dark.css()]}>
              <Content>
                <DateText small inverted>{`${startAt} - ${endAt}`}</DateText>
                <Title small smallCoupon={small} inverted numberOfLines={2}>{title}</Title>
                {office.address && <Direction small inverted numberOfLines={1}>{office.address}</Direction>}
              </Content>
            </GradientContainer>
          </RightContainer>

        </Box>
      </CouponContainer>
    </Container>
  );
};

Coupon.defaultProps = {
  onPress: () => null,
};

Coupon.propTypes = {
  image: PropTypes.any,
  avatarSource: PropTypes.any,
  title: PropTypes.string,
  endAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maker: PropTypes.object,
  totalCoupons: PropTypes.number,
};

// Styles
const COUPON_HEIGHT = 250;
const Container = styled(View)`
  box-shadow: 5px 5px 5px ${Palette.dark.alpha(0.4).css()};
  align-self: stretch;
  border-radius: 10;
  margin-horizontal: 10;
  position: relative;
  align-items: center;
`;

const CouponContainer = styled(TouchableWithoutFeedback)``;

const RightContainer = styled(View)`
  position: relative;
  top: 0;
  left: 0;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
`;

const Overlay = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${Palette.colors.black};
  opacity: 0.7;
`;
const ImageContainer = styled(Image)`
  background-color: grey;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-end;
`;

const GradientContainer = styled(LinearGradient)`
  align-self: stretch;
  paddingTop: 20;
  justify-content: space-between;
`;

const Content = styled(View)`
  margin-bottom: 5;
  padding: 0px 10px;
`;

const ContentTop = styled(LinearGradient)`
  align-self: stretch;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10;
  padding-top: 10;
  padding-bottom: 30;
`;

const LeftCouponContainer = styled(View)`
  height: 100%;
  padding-horizontal: 20;
  padding-vertical: 10;
  align-items: center;
  justify-content: space-between;
`;

const Coupons = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled(MaterialCommunityIcons)`
  margin-right: 10;
`;

const DateText = styled(Typo.TextBody)`
  margin-bottom: 10;
`;

const SubTitle = styled(Typo.TextBody)`
`;

const Direction = styled(Typo.TextBody)`
  margin-bottom: 10;
`;

const Title = styled(Typo.Title)`
  line-height: 22;
  margin-bottom: ${props => props.smallCoupon ? '1' : 10};
`;

const Box = styled(View)`
  overflow: hidden;
  background-color: ${props => props.background ? props.background : Palette.dark};
  height: ${props => props.small ? 150 : COUPON_HEIGHT};
  border-radius: 10;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const HuntButton = styled(ButtonGradient)`
  position: absolute;
  bottom: -15;
  min-width: 120;
`;

export default Coupon;