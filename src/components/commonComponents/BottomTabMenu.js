import React, { useEffect } from 'react';
import BottomTab from './BottomTab';
import { Fonts, SF } from '../../utils';
import { RouteName } from '../../routes';
import { useTheme } from '@react-navigation/native';
import { VectoreIcons } from '../../components';

function BottomTabMenu(props) {
  const { Colors } = useTheme();

  const { navigation, selected } = props;
  const tabs = [
    {
      id: '1',
      name: '',
      activeIcon: <VectoreIcons icon="MaterialCommunityIcons" name="home" color={Colors.active_color} size={SF(25)} />,
      inactiveIcon: <VectoreIcons icon="MaterialCommunityIcons" name="home" color={Colors.active_color} size={SF(25)} />
    },
    {
      id: '2',
      name: '',
      activeIcon: <VectoreIcons icon="MaterialCommunityIcons" name="meditation" color={Colors.active_color} size={SF(30)} />,
      inactiveIcon: <VectoreIcons icon="MaterialCommunityIcons" name="meditation" color={Colors.active_color} size={SF(30)} />
    },
    {
      id: '3',
      name: '',
      activeIcon: <VectoreIcons icon="MaterialCommunityIcons" name="qrcode-scan" color={Colors.active_color} size={SF(25)} />,
      inactiveIcon: <VectoreIcons icon="MaterialCommunityIcons" name="qrcode-scan" color={Colors.active_color} size={SF(25)} />
    },
    {
      id: '4',
      name: '',
      activeIcon: <VectoreIcons icon="MaterialCommunityIcons" name="shopping" color={Colors.active_color} size={SF(25)} />,
      inactiveIcon: <VectoreIcons icon="MaterialCommunityIcons" name="shopping" color={Colors.active_color} size={SF(25)} />
    },
    {
      id: '5',
      name: '',
      activeIcon: <VectoreIcons icon="MaterialCommunityIcons" name="account" color={Colors.active_color} size={SF(25)} />,
      inactiveIcon: <VectoreIcons icon="MaterialCommunityIcons" name="account" color={Colors.active_color} size={SF(25)} />
    },

  ];
  onPressHandle = (id) => {
    id == 1 ?
      navigation.replace(RouteName.HOME_SCREEN)
      : id == 2 ?
        navigation.navigate(RouteName.MEDITATION_SCREEN)
        : id == 3 ?
          navigation.navigate(RouteName.YOGA_SCREEN)
          : id == 4 ?
            navigation.navigate(RouteName.PRODUCTLIST_SCREEN)
            : navigation.navigate(RouteName.EDIT_PROFILE_SCREEN)

  }
  return (
    <>
      <BottomTab
        tabs={tabs}
        tabBarContainerBackground={Colors.theme_backgound_second}
        tabBarBackground={Colors.white}
        activeTabBackground={Colors.theme_backgound_second}
        labelStyle={{ color: Colors.white, fontSize: SF(10), fontFamily: Fonts.RobotoCondensed_Bold }}
        onTabChange={(e) => onPressHandle(e.id)}
        defaultActiveTabIndex={selected}
      />
    </>
  );
}

export default BottomTabMenu;
