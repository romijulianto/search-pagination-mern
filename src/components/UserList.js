import React, { useState, useEffect } from 'react'
import axios from "axios";
import ReactPaginate from "react-paginate";

const UserList = () => {

    /* create variable to get data from backend */
    const [users, setUsers] = useState([]); // initial value []
    const [page, setPage] = useState(0); // initial value [0]
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0); // total pages
    const [keyword, setKeyword] = useState(""); // initial value empity string
    const [query, setQuery] = useState(""); // req to server when submit
    const [msg, setMsg] = useState(""); // message to tell user, using search to specific data


    /* running method on useEffect */
    useEffect(() => {
        getUsers();
    }, [page, keyword]) // if page and keyword changed callback method getUser()

    /* method to getUsers */
    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:2000/users?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        // setUser from response url/endpoint backend
        // setState(response.data.params-backend)
        setUsers(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    /* method changePage */
    const changePage = ({ selected }) => {
        setPage(selected);

        /* where data not found in page 10 */
        if (selected === 9) {
            setMsg("Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesific");
        } else {
            setMsg("")
        }

    };

    /* method searchData */
    const searchData = (e) => {
        e.preventDefault(); // page prevent to reload
        // correlation search and pagination
        setPage(0);
        setKeyword(query);
    }


    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-centered">
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    type="text"
                                    className="input"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder='Find something here...'
                                />
                            </div>
                            <div className="control">
                                <button type='submit' className='button is-info'>Search</button>
                            </div>
                        </div>
                    </form>
                    <table className='table is-stripped is-bordered is-fullwidth mt-2'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
                    </p>
                    <p className='has-text-centered has-text-danger'>{ msg }</p>
                    <nav
                        className="pagination is-centered"
                        key={rows}
                        role="navigation"
                        aria-label="pagination"
                    >
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={Math.min(10, pages)}
                            onPageChange={changePage}

                            /* add style paginate */
                            containerClassName={"pagination-list"}
                            pageLinkClassName={"pagination-link"}
                            previousLinkClassName={"pagination-previous"}
                            nextLinkClassName={"pagination-next"}
                            activeLinkClassName={"pagination-link is-current"}
                            disabledLinkClassName={"pagination-link is-disabled"}
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default UserList