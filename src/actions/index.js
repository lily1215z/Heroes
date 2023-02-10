export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const heroAdd = (hero) => {
    return {
        type: 'HEROES_ADD', payload: hero
    }
}

export const heroDelete = (id) => {
    return {
        type: 'HEROES_DELETE', payload: id
    }
}

export const filtersFetched = (filters) => {
    return {type: 'FILTER_FETCHED', payload: filters}
}
export const filterFetchingLoading = (loading) => {
    return {type: 'FILTER_LOADING', payload: loading}
}
export const activeFilterChanged = (activeFilter) => {
    return {type: 'ACTIVE_FILTER_CHANGED', payload: activeFilter}
}