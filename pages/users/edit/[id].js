import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import ROLES_LIST from '../../../config/roles_list'
import { useRouter } from "next/router";

import {UserEditorForm} from "../../../components/UserEditForm";
import { Navbar } from "../../../components/Navbar";


export default function UserEditor() {

  const { data: session, status } = useSession()

  return (

    <>
    <Navbar />

    <main className='mainBody'>
        {status === "unauthenticated" && (
          <h3>login to edit user</h3>
        )}

        {session && status === "authenticated" && (
          <UserEditorForm />
        )}

    </main>
    </>
  )
}