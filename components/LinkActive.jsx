import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ActiveLink({ name, href }) {
  const { pathname: urlPathname, push: routerPush  } = useRouter();


  const [styleState, setstyleState] = useState({})

  const getStyle = () => {

    const style = {
      backgroundColor: urlPathname === href ? 'var(--color-alt)' : '',
      // backgroundColor: 'yellow'
    }

    setstyleState(style)
  }


  const handleClick = e => {
    e.preventDefault()
    routerPush(href)
  }

  useEffect(() => {

    getStyle()

  }, [])

  return (
    // <a href='/' style={{backgroundColor: 'green'}}>newlink</a>

    <Link href={href}>
      <a style={styleState} onClick={handleClick}> 
        {name} 
      </a>
    </Link> 

  )
}