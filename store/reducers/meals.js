import { AccessibilityInfo } from 'react-native';
import {MEALS} from '../../data/dummy-data';
import {SET_FILTERS} from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}

const mealsReducer = (state = initialState,action) => {
    switch(action.type){
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                return false;
                }
                if (appliedFilters.vegetarian && !meal.isVegetarian) {
                return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                return false;
                }
                return true;
            });
            return { ...state, filteredMeals: updatedFilteredMeals };
            default:
            return state;
            }
}

export default mealsReducer;