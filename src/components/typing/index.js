'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Animated, ART, Easing} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from './animatedCircle';

export default class DotsLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        betweenSpace: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 8,
        betweenSpace: 5
    };

    constructor(props) {
        super(props);
        this.state = {
            scales: [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]
        };
        this.animation = this.animation.bind(this);
    }

    renderCircle(i) {
        const {color, size, betweenSpace} = this.props;
        return (
            <AnimatedCircle radius={size} fill={color} x={size+4 + i * (size+betweenSpace)} y={size}
                            scale={this.state.scales[i]}/>
        );
    }

    render() {
        const {size, betweenSpace} = this.props;
        return (
            <Surface width={size*4 + betweenSpace*4} height={size+8}>
                {this.renderCircle(0)}
                {this.renderCircle(1)}
                {this.renderCircle(2)}
            </Surface>
        );
    }

    componentDidMount() {
        this.animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    animation() {
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.scales[i], {toValue: 1, duration: 300, delay: (i+1)*2}),
                Animated.timing(self.state.scales[i], {toValue: 0, duration: 300, delay: 10})
            ])
        }

        Animated.parallel([
            seq(this, 0), seq(this, 1), seq(this, 2)
        ]).start(() => {
            if (!this.unmounted)
                this.animation();
        });
    }
}