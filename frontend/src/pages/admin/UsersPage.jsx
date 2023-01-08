import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUsersList } from "../../redux/slices/userSlice"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Button, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from "react-router-dom"

const UsersPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, loadingUsers, errorUsers, users, errorDelete } = useSelector(
        state => state.user
    )

    useEffect(() => {
        if (user && user.isAdmin)
            dispatch(getUsersList())
        else if (user)
            navigate('/')
        else
            navigate('/login')
    }, [dispatch, navigate, user])

    function deleteHandler(id) {
        if (window.confirm('Are you sure?'))
            dispatch(deleteUser(id))
    }

    return (
        <>
            <h1>Users</h1>
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {!users || loadingUsers ? (
                <Loader />
            ) : errorUsers ? (
                <Message variant='danger'>{errorUsers}</Message>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className='fas fa-check'
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className='fas fa-times'
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/users/${user._id}/edit`}
                                    >
                                        <Button
                                            variant='light'
                                            className='btn-sm'
                                        >
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UsersPage
