import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';



const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily:'OpenSans-Bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A screen'
}
const MealsNavigator = createStackNavigator(
    {
        Categories:{
            screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetail: MealDetailScreen
    },{
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return(
                    <Icon 
                        name="restaurant"
                        size= {25}
                        color={tabInfo.tintColor}/>
                )
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return(
                    <Icon 
                        name="star"
                        size={25}
                        color={tabInfo.tintColor}/>
                )
            },
            tabBarColor: Colors.accentColor
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig,{
    activeTintColor: 'white',
    shifting: true,
    barStyle: {
        backgroundColor: Colors.primaryColor
    }
})
: createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
})

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FiltersNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor
        }
    }
)
// const MealsFavTabNavigator = createBottomTabNavigator(
//     {
//         Meals: {
//             screen: MealsNavigator,
//             navigationOptions: {
//                 tabBarIcon: tabInfo => {
//                     return(
//                         <Icon 
//                           name="restaurant"
//                           size={25}
//                           color = {tabInfo.tintColor}
//                         />
//                     )
//                 }
//             }
//         },
//         Favorites: {
//             screen: FavoritesScreen,
//             navigationOptions: {
//                 tabBarLabel: 'Favorites!',
//                 tabBarIcon: tabInfo => {
//                     return(
//                         <Icon 
//                             name="star"
//                             size={25}
//                             color={tabInfo.tintColor}/>
//                     )
                    
//                 } 
//             }
//         }
//     },{
//         tabBarOptions: {
//             activeTintColor: Colors.accentColor
//         }
//     }
// )

export default createAppContainer(MainNavigator);