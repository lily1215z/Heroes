import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook';

const filterAdapter = createEntityAdapter();
// const initialState = {
//     filters: [],
//     filterLoading: 'idle',
//     activeFilterChanged: 'all',
// }
const initialState = filterAdapter.getInitialState({
    filterLoading: 'idle',
    activeFilterChanged: 'all',
})
export const fetchFilters = createAsyncThunk('filter/fetchFilters', async () => {
    const {request} = useHttp();
    return await request('http://localhost:3001/filters')
})

const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // filtersFetched: (state, action) => {
        //     state.filters = action.payload
        // },
        // filterFetchingLoading: (state, action) => {
        //     state.filterLoading = action.payload
        // },
        activeFilterChanged: (state, action) => {
            state.activeFilterChanged = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filterLoading = 'loading'
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filterLoading = 'idle'
                // state.filters = action.payload
                filterAdapter.setAll(state, action.payload)
            })
            .addDefaultCase(() => {
            })
    }
})

export const FilterReducer = FilterSlice.reducer


export const {selectAll} = filterAdapter.getSelectors(state => state.filters)

export const {activeFilterChanged} = FilterSlice.actions