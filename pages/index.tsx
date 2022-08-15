import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from "next/router";
import connectDB from '../db/connection'
import User from '../models/user'
import defaultUsersJSON from '../config/defaultUsers.json'
import styles from '../styles/Home.module.css'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'


const Home: NextPage = () => {

  const { push: routerPush } = useRouter();

  useEffect(() =>{
    routerPush('/hearts')
  }, [])


  return (
    <>
      <Head>
        <title>Heart Chart</title>
        <meta name="description" content="Give hearts, recieve hearts by William Chorski" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className='mainBody'>
        <section style={{ textAlign: "center" }}>
          <Link href={`/hearts`} > Hearts </Link>
        </section>
        
      </main>

      <Footer />
    </>
  )
}

export default Home
