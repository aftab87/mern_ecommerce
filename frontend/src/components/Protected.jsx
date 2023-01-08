import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Protected = ({ admin, redirect, page }) => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(`/login?redirect=${redirect}`)
        } else if (admin && !user.isAdmin) {
            navigate('/')
        }
    }, [admin, navigate, redirect, user])


    return (
        <>
            {user && ((!admin && user) || (admin && user.isAdmin)) && page}
        </>
    )
}

export default Protected