import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import HomeContainer from '../../containers/homeContainer'
import HomeComponent from '../components/homeComponent'
import Test from '../../containers/test';



const Index = (

    <Stack>
        <Scene hideNavBar>
            <Tabs
                key="tabbar"
                swipeEnabled
                type="replace"
                showLabel={false}
                {...DefaultProps.tabProps}
            >
                <Stack
                    key="home"
                    title={AppConfig.appName.toUpperCase()}
                    icon={() => <Icon name="planet" {...DefaultProps.icons} />}
                    {...DefaultProps.navbarProps}
                >
                    <Scene key="home" component={HomeContainer} Layout={HomeComponent} />

                </Stack>
                <Stack
                    key="next"
                    title={AppConfig.appName.toUpperCase()}
                    icon={() => <Icon name="planet" {...DefaultProps.icons} />}
                    {...DefaultProps.navbarProps}
                >
                    <Scene key="next" component={Test} />

                </Stack>
            </Tabs>
        </Scene>
    </Stack>);

export default Index;
