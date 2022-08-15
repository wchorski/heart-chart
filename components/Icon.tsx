import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

export const Icon = (props: any) => {
  return (
    <span className='ico'>
      <AiOutlineHeart style={{ color: `${props.color}` }} />
    </span>
  )
}
