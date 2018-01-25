import React from 'react';
import { Scene, Tabs, Stack, StatusBar } from 'react-native-router-flux';
// import { Icon } from 'native-base';

import DefaultProps from '../constants/navigationConstants';
import AppConfig from '../../constants/config';

import HomeContainer from '../../containers/homeContainer'
import HomeComponent from '../components/homeComponent'
//
import CoinListContainer from '../../containers/coinListContainer'
import CoinListComponent from '../components/coinListComponent'
//
import CoinDetailsContainer from '../../containers/coinDetailContainer'
import CoinDetailComponent from '../components/coinDetailComponent'
//
import FavouriteCoinContainer from '../../containers/favouriteCoinContainer'
import FavouriteListComponent from '../components/favouriteListComponent'
//
import ProfileContainer from '../../containers/profileContainer';
import ProfileComponent from '../components/profileComponent';
//

//
import { HomeIcon, FavouriteIcon } from '../routes/tabarIcons/homeIcon'


const Index = (
    <Stack>
        <Scene hideNavBar titleStyle={{ alignSelf: 'center' }} >
            <Tabs
                key="tabbar"
                swipeEnabled
                type="replace"
                showLabel={false}
                {...DefaultProps.tabProps}
            >
                <Stack
                    key="CoinListScreen"
                    title="Home"
                    iconName={'file-text'}
                    icon={HomeIcon}
                    {...DefaultProps.navbarProps}
                >
                    <Scene key="CoinListScreen" component={CoinListContainer} Layout={CoinListComponent} />
                    <Scene key="CoinDetailScreen" component={CoinDetailsContainer} title="" Layout={CoinDetailComponent} />

                </Stack>
                <Stack
                    key="FavouriteCoinScreen"
                    title={"FAVOURITE"}
                    icon={FavouriteIcon}
                    {...DefaultProps.navbarProps}
                >
                    <Scene key="FavouriteCoinScreen" component={FavouriteCoinContainer} Layout={FavouriteListComponent} />
                    <Scene key="CoinDetailScreen" component={CoinDetailsContainer} title="" Layout={CoinDetailComponent} />
                </Stack>



            </Tabs>
        </Scene>
    </Stack>);

{/* <Stack
    key="ProfileScreen"
    title={"FAVOURITE"}
    icon={FavouriteIcon}
    {...DefaultProps.navbarProps}
>
    <Scene key="FavouriteCoinScreen" component={ProfileContainer} Layout={ProfileComponent} />

</Stack> */}
export default Index;
