import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/sliderEntry.style';
import SliderEntry from './sliderEntry';
import styles, { colors } from './styles/index.style';

const SLIDER_FIRST_ITEM = 0;

export default class CarouselFiles extends Component {

    constructor (props) {
        super(props);
        this.state = {
            sliderActiveSlide: SLIDER_FIRST_ITEM,
            sliderRef: null
        };
    }

    renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    render () {
        const { sliderActiveSlide, sliderRef } = this.state;
        return (
          <View style={styles.exampleContainer}>
            <Carousel
              ref={(c) => { if (!this.state.sliderRef) { this.setState({ sliderRef: c }); } }}
              data={this.props.carouselList}
              renderItem={this.renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              enableMomentum={false}
              loop={false}
              loopClonesPerSide={2}
              onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
            />
          </View>
        );
    }
}