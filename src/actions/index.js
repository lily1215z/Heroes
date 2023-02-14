import {heroesFetched, heroesFetching, heroesFetchingError} from "../components/heroesList/HeroesSlice";
import {filterFetchingLoading, filtersFetched} from "../components/heroesFilters/FilterSlice";

export const _fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const _fetchFilters = (request) => (dispatch) => {
    dispatch(filterFetchingLoading('loading'));
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
    // .catch(() => dispatch(filterFetchingLoading()))
    dispatch(filterFetchingLoading('idle'));
}

//not needed because I create Slice
export const _heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const _heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const _heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const _heroAdd = (hero) => {
    return {
        type: 'HEROES_ADD', payload: hero
    }
}

export const _heroDelete = (id) => {
    return {
        type: 'HEROES_DELETE', payload: id
    }
}

export const _filtersFetched = (filters) => {
    return {type: 'FILTER_FETCHED', payload: filters}
}
export const __filterFetchingLoading = (loading) => {
    return {type: 'FILTER_LOADING', payload: loading}
}
export const _activeFilterChanged = (activeFilter) => {
    return {type: 'ACTIVE_FILTER_CHANGED', payload: activeFilter}
}