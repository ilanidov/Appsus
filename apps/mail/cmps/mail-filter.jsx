

export function MailFilter() {
 const filterOptions = [{name: "Compose", value: "compose"}]

    return (
      

        <section className="nav-options flex">
            <a href="">Compose</a>
            <br />
            <a href="">Inbox</a>
            <br />
            <a href="">Starred</a>
            <br />
            <a href="">Sent</a>
            <br />
            <a href="">Trash</a>
            <br />
            {/* <Link>Compose</Link>
    <Link>Inbox</Link>
    <Link>Starred</Link>
    <Link>Sent</Link>
    <Link>Trash</Link> */}
        </section>
    )
}