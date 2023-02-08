import {v1} from 'uuid'
import {heroAdd, heroesFetched, heroesFetchingError} from "../../actions";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useHttp} from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [element, setElement] = useState('')
    const {request} = useHttp();

    const heroAddHandler = (e) => {
        e.preventDefault();
        const hero = {
            name,
            description,
            element,
            id: v1()
        }

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(hero))
            .then(dispatch(heroAdd(hero)))
            .catch(() => dispatch(heroesFetchingError()))

        setName('')
        setDescription('')
        setElement('')
    }


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={heroAddHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    value={name}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={e=> setName(e.currentTarget.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    value={description}
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    onChange={e=>setDescription(e.currentTarget.value)}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    value={element}
                    onChange={e=>setElement(e.currentTarget.value)}
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;