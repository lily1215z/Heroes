// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {activeFilterChanged, fetchFilters} from "./FilterSlice";

const HeroesFilters = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.filters)
    const filtersLoading = useSelector(state => state.filters.filterLoading)
    const filtersActive = useSelector(state => state.filters.activeFilterChanged)
    // action.payload === 'all' ? state.heroes : state.heroes.filter(i=>i.element === action.payload)

    useEffect(() => {
        dispatch(fetchFilters())

        // eslint-disable-next-line
    }, []);

    if (filtersLoading === 'loading') {
        return <div> spinner</div>
    } else if (filtersLoading === 'error') {
        return <div>Error....</div>
    }

    const renderFilters = (filters) => {
        if (filters.length === 0) {
            return <h5>Filter not found</h5>
        }

        return filters.map(({name, className, label}) => {

            const btnClass = classNames('btn', className, {
                'active': name === filtersActive
            })
            return <button key={name}
                           id={name}
                           className={btnClass}
                           onClick={()=> dispatch(activeFilterChanged(name))}
            >{label}</button>
        })
    }
    const elements = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;