import React from 'react';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens} from 'react-native-screens';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import mealsReducer from './store/reducers/meals';
import authReducer from './store/reducers/authReducer';


enableScreens();


const rootReducer = combineReducers({
    meals: mealsReducer,
    auth: authReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer,middleware)

export default function App(){
    return(
        <Provider store={store
        }>
            <MealsNavigator />
        </Provider>
        
    )
}