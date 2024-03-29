const { Link, NavLink , useNavigate } = ReactRouterDOM

export function AppHeader() {
    const navigate = useNavigate()

    return <header className="app-header full">
        <Link to="/">
            <h3 className="logo">appsus</h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}