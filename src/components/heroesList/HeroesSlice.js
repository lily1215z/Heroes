import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();
// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
})
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
    //async/await не пропсиыываем здесь т.к. уже в хуке useHttp писали
    const {request} = useHttp();
    return request("http://localhost:3001/heroes")
})
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle'
        //     state.heroes = action.payload
        // },
        // heroesFetchingError: (state) => {state.heroesLoadingStatus = 'error'},
        heroAdd: (state, action) => {
            // state.heroes.push(action.payload)
            heroesAdapter.addOne(state, action.payload)
        },
        heroDelete: (state, action) => {
            // state.heroes = state.heroes.filter(h => h.id !== action.payload)
            heroesAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'
                // state.heroes = action.payload
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {
            })
    }
})

export const HeroesReducer = heroesSlice.reducer
const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filterHeroesSelector = createSelector(
    // state => state.heroes.heroes,
    selectAll,
    state => state.filters.activeFilterChanged,
    (heroes, filter) => {
        if(filter === 'all' ) {
            console.log('render')
            return heroes
        } else {
            return heroes.filter(i=>i.element === filter)
        }
    }
)

export const {heroesFetching, heroesFetched, heroesFetchingError, heroAdd, heroDelete} = heroesSlice.actions