

import {configureStore} from "@reduxjs/toolkit";
import {HeroesReducer} from "../components/heroesList/HeroesSlice";
import {FilterReducer} from "../components/heroesFilters/FilterSlice";


const stringMiddleWare = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const enhancer = (createStore) => (...args) => {
    const store = createStore(...args)
    const oldDispatch = store.dispatch
    store.dispatch = action => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store
}
// export const store = createStore(combineReducers({
//         heroes: HeroesReducer,
//         filters: FiltersReducer
//     }),
//     compose(applyMiddleware(ReduxThunk, stringMiddleWare),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

export const store = configureStore({
    reducer: {
        heroes: HeroesReducer,
        filters: FilterReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production',
})