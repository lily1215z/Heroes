const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filterLoading: 'idle',
    activeFilterChanged: 'all',
    // filteredHeroes: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_ADD':
            const newAddHero = [action.payload, ...state.heroes]
            return {
                ...state, heroes: newAddHero,
                filteredHeroes: state.activeFilterChanged === 'all' ? newAddHero : newAddHero.filter(i=>i.element === state.activeFilterChanged)
            }
        case 'HEROES_DELETE':
            const newHeroList = state.heroes.filter(h => h.id !== action.payload)
            return {
                ...state, heroes: newHeroList,
                filteredHeroes: state.activeFilterChanged === 'all' ? newHeroList : newHeroList.filter(i=>i.element===state.activeFilterChanged)
            }
        case 'FILTER_FETCHED':
            return {
                ...state, filters: action.payload
            }
        case 'FILTER_LOADING':
            return {
                ...state, filterLoading: action.payload
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state, activeFilterChanged: action.payload,
                filteredHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter(i=>i.element === action.payload)
            }
        default:
            return state
    }
}
