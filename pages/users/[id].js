import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import { FaTrashAlt, FaSkullCrossbones, FaEject, FaUserEdit } from 'react-icons/fa'
import { StyledPopUp } from '../../styles/popup.styled'

import { UserSingle } from '../../components/UserSingle'
import { Navbar } from "../../components/Navbar";
import { Loading } from "../../components/Loading";

export default function UserById() {

  const { query, isReady, push: routerPush } = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [userState, setuserState] = useState({username: "NoName"});


  const getUserInfo = async () => {
    console.log('getuserinfo');
    try {
      const res = await fetch(`/api/users/${query.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json();

      setuserState(data);
      setIsLoading(false)

    } catch (err) {
      console.error(err);
    }
  }

  const [isAreYouSure, setisAreYouSure] = useState(false)
  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }

  useEffect(() => {
    if(!isReady) return

    getUserInfo()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])

  // useEffect(() => {


  //   getUserInfo()

  // }, [])

  const deleteUser = async (id) => {
    try {
      console.log('delete: ' + id);
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      routerPush('/admin')

    } catch (err) {
      console.error(err)
    }
  }

  return (

    <>
      <Navbar />

      <main className='mainBody'>

        {userState && (
          <section>
            <div className="editBtns">
              <button className='deleteBtn btn' onClick={() => toggleAreYouSure()}> <FaTrashAlt /> </button>
              <Link href={`/users/edit/${query.id}`} className='editMe btn'>
                <a><FaUserEdit /></a>
              </Link>
            </div>

            {isAreYouSure && (
              <StyledPopUp>
                <h3>Delete User</h3>
                <button className='editBtn' onClick={() => deleteUser(query.id)}> yes I am sure <FaSkullCrossbones /> </button>
                <button className='editBtn' onClick={() => toggleAreYouSure()}> no, take me back <FaEject /> </button>
              </StyledPopUp>
            )}

            {isLoading && (
              <Loading />
            )}

            {!isLoading && (
              <UserSingle {...userState} />
            )}

          </section>
        )}

          {!userState && (
            <section>
              <h2> User Not Found </h2>
            </section>
          )}
      </main>
    </>
  )
}
