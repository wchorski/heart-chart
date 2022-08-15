/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/
import connectDB from '../db/connection'
import User from '../models/user'


import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useSession, signIn, signOut } from "next-auth/react"
import { AiOutlineHeart } from 'react-icons/ai'
import { RiHeartAddLine } from 'react-icons/ri'

import { Icon } from '../components/Icon'
import { Navbar } from '../components/Navbar'
// import { Login } from '../components/Login'
// import { RegisterForm } from '../components/RegisterForm'
import { HeartChart } from '../components/HeartChart'



export const getServerSideProps: GetServerSideProps = async () => {

  try {
    await connectDB()

    // console.log('-- fetch Heart --')
    const hearts = await User.find()
    // console.log('-- -- -- -- -- -- ')
    // console.log(hearts);


    return {
      props: { hearts: JSON.stringify(hearts) }
      // props: { hearts }
    }

  } catch (err) {
    console.error(err)
    return {
      notFound: true
    }
  }
}



export default function Love({ hearts }) {

  const { data: session, status }: any = useSession()
  // console.log(session, status);

  const [heartsState, setheartsState] = useState([])
  const [usersState, setusersState] = useState([])
  const [heartsCount, setheartsCount] = useState(0)
  const [playerHeartCount, setplayerHeartCount] = useState(0)


  const filterPlayerOne = (users: any, id: any) => {
    const filteredArray = users.filter(user => user.id === id)

    //TODO why is this showing as undefined?
    const playerOne = filteredArray[0]


    if (playerOne) {
      setplayerHeartCount(playerOne.heartCount)
    }


    return playerOne
  }

  const addHeartIcon = async (color: string) => {
    // setheartsCount(prev => ++prev)
    // setheartsState((prev) => [<Icon color={color} />, ...prev])
  }

  const updateUsersHearts = async (heartsCount: number) => {

    setplayerHeartCount(prev => ++prev)
    // console.log(playerHeartCount);


    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        heartCount: playerHeartCount,
        _id: session.user.id
      })
    })

    const data = await res.json()
    // console.log(data)
  }



  const getHeartIcons = () => {
    usersState.map((usr: any) => {
      for (let i = 0; i <= usr.heartCount; i++) {
        addHeartIcon(usr.color)
      }
    })
  }

  const getTotalHearts = () => {
    usersState.map((usr: any) => {
      setheartsCount(prev => prev + usr.heartCount)
    })
  }


  useEffect(() => {
    const array = JSON.parse(hearts);
    setusersState(array)


    return () => {
      console.log('return');

    }
  }, [hearts, session])

  useEffect(() => {
    // getHeartIcons()
    getTotalHearts()

    return () => {
      console.log('return');
    }
  }, [usersState, hearts])

  useEffect(() => {
    if (session) {
      setplayerHeartCount(session.user.heartCount)
      // console.log(session.user);

      //TODO fix having to reload twice on seeing /love page
      filterPlayerOne(usersState, session.user.id)

    }

    return () => {
      console.log('return');
    }
  }, [session, usersState])


  return (
    <>
      <Navbar />
      {/* <Login /> */}
      {/* <Register /> */}


      <div className="haiku">
        <p>
          Friends forever in time
        </p>
        <p>
          Bonded by our hearts and souls
        </p>
        <p>
          Love forever lasting!
        </p>
        <a href="https://www.familyfriendpoems.com/collection/love-haiku-poems/">- Sandy Maloof </a>
      </div>

      {status === "authenticated" && usersState && (
        <>
          {/* <button onClick={addHeartUser}>new User</button> */}
          <h2><Icon color={session.user?.color} /> {playerHeartCount}</h2>


          <div className="scoreboard">
            {usersState.map((usr: any) => (
              <div className='user' key={usr._id} style={{ borderBottom: `solid 5px ${usr.color}` }}>
                <h3 style={{ color: usr.color }}>{usr.name}</h3> <span>{usr.heartCount}</span>
              </div>
            ))}
          </div>

          <div className="heart-cont">
            <HeartChart importData={usersState} />

            <button
              onClick={e => updateUsersHearts(session.user?.color)}
              className="btn-heart"
              aria-label="Add 1 Heart"
              style={{ backgroundColor: session.user?.color }}
            >
              <RiHeartAddLine />
            </button>

          </div>

          <h2>{heartsCount} total hearts </h2>


          {/* <div className="hearts-cont">
            {heartsState}
          </div> */}
        </>
      )}

      {status === "loading" && (
        <h3>Loading...</h3>
      )}

      {status === "unauthenticated" && (
        <>
          <h2> *Must be logged in to add Love* </h2>
        </>
      )}

    </>
  )
}


