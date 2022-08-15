import React from 'react'

import { StyledGigTable } from '../styles/GigTable.styled'
import { Navbar } from './Navbar'


export const UserSingle = (props) => {

  // const {_id, date, color, name, message, getForms, clsNms='card'} = props

  return (
    <>
      <StyledGigTable>
        <div className="clientInfo">
          <table>
            <tbody>
              <tr>
                <th>email:</th>
                <td>{props.email}</td>
              </tr>
              <tr>
                <th>Username:</th>
                <td>{props.name}</td>
              </tr>
              <tr>
                <th>Fav Color:</th>
                <td style={{backgroundColor: props.color, color: 'black', fontWeight: 'bold'}}>{props.color}</td>
              </tr>
              <tr>
                <th>Role(s):</th>
                <td>
                  {props.roles.admin ? 'Admin, ' : ''} 
                  {props.roles.editor ? 'Editor, ' : ''}
                  {props.roles.subscriber ? 'Subscriber ' : ''}
                </td>
              </tr>
              <tr>
                <th>ID:</th>
                <td>{props._id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </StyledGigTable>
    </>
  )
}
