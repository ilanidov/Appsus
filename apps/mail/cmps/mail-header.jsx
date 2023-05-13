const { useState, useEffect} = React
import { emailService } from "../services/mail.service.js"


export function MailHeader({ onSetFilter, filterBy }) {
    const [filterByEdit, setFilterByEdit] = useState(filterBy)



    useEffect(() => {
        onSetFilter(filterByEdit)
    }, [filterByEdit])



    // function onToggleMenu() {
    //     toggleMenu(filterByEdit)
    // }


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value || '' : target.value

        setFilterByEdit((prevFilterByEdit) => ({ ...prevFilterByEdit, [field]: value }))
    }
    const { txt } = filterByEdit

    return (
        <nav className="mail-nav-bar flex">

            <div className="mail-nav-bar-btns ">
                {/* <button className="btn-menu" onClick={() => setIsSideOpen(prevState => !prevState)}>☰</button> */}
                <div className="mail-logo-container"></div>
                <h2 className=''>G'MAM</h2>
            </div>

            <div className="filter-methods">
                <input className='mail-search-input' value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="Search" />
            </div>

        </nav>
    )
}