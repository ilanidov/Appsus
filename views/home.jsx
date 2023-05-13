const { Link, NavLink , useNavigate} = ReactRouterDOM

export function Home() {
    const navigate = useNavigate()

    return <section className="home">
        <section className="headers-home">
        <h1 className="main-slogen">AppSus</h1>
        <h4>Let's get organized!</h4>
    </section>
        <section className="home-icons">

            <button className="gmail-icon-home" onClick={(()=> navigate('/mail'))}></button>

            <button className="notes-icon-home" onClick={(()=> navigate('/note'))}></button>
        </section>
    </section>
}


