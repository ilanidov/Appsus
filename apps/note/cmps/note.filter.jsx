const { useState, useEffect } = React

export function NotesFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    const { title, type } = filterByToEdit
    return (
        <section className="note-filter">
            <h2>Filter your notes</h2>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title"></label>
                <input className="filter-by-title-input" value={title} onChange={handleChange} name="title" id="title" type="text" placeholder="By title" />
                <select className="filter-by-type-input" value={type} onChange={handleChange} name="type" id="type"  >
                    <option value="all">All</option>
                    <option value="noteTxt">Txt</option>
                    <option value="noteImg">Image</option>
                    <option value="noteTodos">Todos</option>
                    <option value="noteVideo">Video</option>
                </select>
                <button className="filter-btn">Filter notes</button>
            </form>
        {/* <button onClick={showPinned}>pinned</button> */}
        </section>
    )
}

