import React from 'react';
import { Scene, Tabs, Stack, StatusBar } from 'react-native-router-flux';
import { Image } from 'react-native'

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
import Sidebar from '../../containers/sidebarContainer'
//
import CoinFilter from '../../containers/coinFilterContainer'
import { HomeIcon, FavouriteIcon } from '../routes/tabarIcons/homeIcon'


const Index = (
    <Stack>

        <Scene hideNavBar titleStyle={{ alignSelf: 'center' }} >
            <Scene key="drawer" drawer contentComponent={Sidebar} initial drawerPosition="left" drawerWidth={300} drawerIcon={<Image source={require('../../assets/images/menu.png')} style={{ width: 24, height: 24, marginRight: 25, }} />}>
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
                        <Scene key="CoinDetailScreen" component={CoinDetailsContainer} title="" Layout={CoinDetailComponent} back />


                    </Stack>
                    <Stack
                        key="FavouriteCoinScreen"
                        title={"FAVOURITE"}
                        icon={FavouriteIcon}
                        {...DefaultProps.navbarProps}
                    >
                        <Scene key="FavouriteCoinScreen" component={FavouriteCoinContainer} Layout={FavouriteListComponent} />
                        <Scene key="CoinDetailScreen" component={CoinDetailsContainer} title="" Layout={CoinDetailComponent} back />
                    </Stack>


                    <Stack
                        key="ProfileScreen"
                        title={"FAVOURITE"}
                        icon={FavouriteIcon}
                        {...DefaultProps.navbarProps}
                    >
                        <Scene key="CoinProfileScreen" component={ProfileContainer} Layout={ProfileComponent} />
                    </Stack>

                    <Stack

                        key="CoinFilter"
                        title={"Hero/Zero"}
                        icon={FavouriteIcon}
                        {...DefaultProps.navbarProps}
                    >
                        <Scene key="CoinFilterScreen" component={CoinFilter} Layout={FavouriteListComponent} />
                        <Scene key="CoinDetailScreen" component={CoinDetailsContainer} title="" Layout={CoinDetailComponent} back />

                    </Stack>

                </Tabs>
            </Scene>
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
