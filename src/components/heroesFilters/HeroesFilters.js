// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useEffect} from "react";
import {activeFilterChanged, filterFetchingLoading, filtersFetched} from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import classNames from "classnames";

const HeroesFilters = () => {
    const dispatch = useDispatch()
    const {request} = useHttp();
    const filters = useSelector(state => state.filters)
    const filtersLoading = useSelector(state => state.filterLoading)
    const filtersActive = useSelector(state => state.activeFilterChanged)

    useEffect(() => {
        dispatch(filterFetchingLoading('loading'));
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
        // .catch(() => dispatch(filterFetchingLoading()))
        dispatch(filterFetchingLoading('idle'));
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