import React from 'react'
import { useSession } from "next-auth/react"
import ROLES_LIST from '../config/roles_list'
import { MdAdminPanelSettings } from 'react-icons/md'

import {Navbar} from '../components/Navbar'
import { UserTable } from '../components/UserTable'

export default function Admin() {

  const { data: session, status } = useSession()

  return (
    <>
      <Navbar />
      <main className='mainBody'>
        <h1>Admin page</h1>

        <section>
          {session && session.user.roles.admin === ROLES_LIST.admin && (
            <UserTable />
          )}

          {session && !session.user.roles.admin && (
            <div>
              <MdAdminPanelSettings style={{fontSize: '4em'}}/> 
              <h3>Must be an Admin to view this page</h3>
            </div>
          )}

          {!session && status === 'unauthenticated' &&(
            <h3>Must be logged in to view this page</h3>
          )}
        </section>
      </main>
    </>
  )
}
