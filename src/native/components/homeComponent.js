import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, H3 } from 'native-base';

const Test = ({ numbers }) => {
    console.log(numbers, "ooo")
    return (
        <Container>
            <Content>
                <H3>{numbers}</H3>
            </Content>
        </Container>
    );
}

export default Test;



