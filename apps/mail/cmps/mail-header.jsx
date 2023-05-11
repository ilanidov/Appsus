

export function MailHeader() {




    return (
        <nav className="mail-nav-bar flex">

            <div className="mail-nav-bar-btns ">
                <div className="nav-expand-btn"></div>
                {/* <button className="nav-expand-btn"></button> */}
                <div className="mail-logo-container"></div>
                <h2 className=''>G'MAM</h2>
            </div>

            <div className="filter-methods">
                <input type="search" />
            </div>

        </nav>
    )
}