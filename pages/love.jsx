/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/
import connectDB from '../db/connection'
import User from '../models/user'


import React, { useEffect, useState, useRef } from 'react'
import { useSession } from "next-auth/react"

import { useTransition, animated } from 'react-spring'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiHeartAddLine } from 'react-icons/ri'

import { Icon } from '../components/Icon'
import { Navbar } from '../components/Navbar'
// import { Login } from '../components/Login'
// import { Register } from '../components/RegisterForm'
import { HeartChart } from '../components/HeartChart'
import { Loading } from '../components/Loading'



export const getServerSideProps = async () => {

  try {
    await connectDB()

    const allUsers = await User.find()

    return {
      props: { allUsers: JSON.stringify(allUsers) }
      // props: { hearts }
    }

  } catch (err) {
    console.error(err)
    return {
      notFound: true
    }
  }
}



export default function Love({ allUsers }) {

  const { data: session, status } = useSession()
  const childHeartChart = useRef()
  
  const [usersState, setusersState] = useState([])
  const [heartsTotalCount, setheartsTotalCount] = useState(0)
  const [playerHeartCount, setplayerHeartCount] = useState(0)
  const [playerObject, setplayerObject] = useState({})

  const [isEyeCandy, setisEyeCandy] = useState(false)
  const transpring = useTransition(isEyeCandy, {
    config: {mass:.3, tension:900, friction:30},
    from: {x: 0, y: 50,   opacity: 0.1},
    enter: {x: 0,   y: 0,     opacity: 1.0},
    leave: {x: 0, y: -50,  opacity: 0.1},
  })


  const filterPlayerOne = (users, id) => {
    const filteredArray = users.filter(user => user._id === id)

    const playerOne = filteredArray[0]


    if (playerOne) {
      setplayerHeartCount(playerOne.heartCount)
    }

    setplayerObject(playerOne)
    return playerOne
  }


  const updateUsersHearts = async (heartsTotalCount) => {

    setplayerHeartCount(prev => ++prev)
    setheartsTotalCount(prev => ++prev)

    const newCount = playerHeartCount + 1

    setplayerObject(prev => ({
      ...prev, 
      heartCount: newCount
    }))

    // console.log(playerObject);


    try{
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
    } catch (err){
      console.error(err);
    }
    // console.log(data)
  }



  useEffect(() => {
    const array = JSON.parse(allUsers);
    setusersState(array)

    if(heartsTotalCount <= 0){
      usersState.map(usr => {
        setheartsTotalCount(prev => prev + usr.heartCount)
      })
    }

    return () => {
      console.log('return');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers, session])

  useEffect(() => {

    return () => {
      console.log('return');
    }
  }, [usersState, allUsers])

  useEffect(() => {
    if (session) {
      setplayerHeartCount(session.user.heartCount)

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


          <main className='mainBody'>

        <section>
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
        </section>

        <section>
          {usersState && (
            <>

              {status === "loading" && (
                <Loading />
              )}

              <div className="scoreboard">
                {usersState.map(usr => (
                  <div className='user' key={usr._id} style={{ borderBottom: `solid 5px ${usr.color}` }}>
                    <h3 style={{ color: usr.color }}>{usr.name}</h3> <span>{usr.heartCount}</span>
                  </div>
                ))}
              </div>


              <div className="heart-cont">
                {playerObject && (
                  <>
                    <h4 className='totalHeartsCount'>{heartsTotalCount} total hearts </h4>
                    <HeartChart importData={usersState} playerOne={playerObject} ref={childHeartChart}/>
                  </>
                )}

                {status === "authenticated" && (
                  <div className="btn-cont">
                    <button
                      onClick={e => {
                        updateUsersHearts(session?.user.color)
                        childHeartChart.current.updateChart()
                      }}
                      onMouseDown={e => setisEyeCandy(true)}
                      onMouseUp={e => setisEyeCandy(false)}
                      className="btn-heart"
                      aria-label="Add 1 Heart"
                      style={{ backgroundColor: session?.user.color }}
                    >
                      <RiHeartAddLine />
                    </button>

                    {/* <span className={`btn--eyecandy ${isEyeCandy ? 'active' : ''}`}><RiHeartAddLine /></span> */}
                    
                    {/* // TODO Animate  */}
                    {transpring((style, item) =>
                      item 
                        ? <animated.span className={`btn--eyecandy`} style={{color: session?.user.color, ...style}} > <AiOutlineHeart /> </animated.span>
                        : ''
                    )}
                  </div>
                )}

                {status === "unauthenticated" && (
                  <h2> *Must be logged <br /> in to add Love </h2>
                )}

              </div>
            </>
          )}

        </section>

      </main>
    </>
  )
}


