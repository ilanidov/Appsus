import { MailList } from "../cmps/mail-list.jsx"
import { emailService } from "../services/mail.service.js"


export function MailIndex() {




    return (

        <div className='mail-layout'>

            <nav className="mail-nav-bar flex">
                <button className="nav-expand-btn">||</button>
                <img className='logo-img' src='' alt="" />
                <small className=''>EMAIL</small>
                <div className="filter-methods">
                    <input type="search" />

                </div>
            </nav>

            <div className="main-content flex">

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

                <div className="mails-container">
                    <MailList></MailList>
                </div>
            </div>


        </div>
    )
}

