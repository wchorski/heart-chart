import React, {useState, useEffect, useMemo} from 'react'
import Link from 'next/link'
import { useTable, useSortBy } from 'react-table'
import { FaSortAmountUp,  FaSortAmountDownAlt} from 'react-icons/fa'

import { StyledGigTable } from '../styles/GigTable.styled'
import { Loading } from './Loading'



export const UserTable = ( {} ) => {


  const controller = new AbortController();
  const [isLoading, setIsLoading] = useState(true);
  const [usersState, setusersState] = useState([]);

  const getAllUsers = async () => {
    try{
      const res = await fetch(`/api/users/getall`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
			const data = await res.json();

      const destAry = destructArray(data)
      setusersState(destAry)
      setIsLoading(false)
			// console.log(data);

    } catch (err){
      console.error(err)
    }
  }

  const destructArray = (array) => {
    // TODO destruct array.push prettied objects back to array
    let prettyArr = []
    
    array.map(user => {
      // TODO remove this and just use json delete / parse
      let prettyUser = {
        email: user.email,
        name: user.name,
        roles: whatRole(user),
        _id: user._id,
        color: user.color,
        account: <Link href={`/users/${user._id}`}> account </Link> 
      }
      prettyArr.push(prettyUser)
    })

    return prettyArr
  }

  const whatRole = (obj) => {

    const {roles: { admin, editor, subscriber }} = obj 

    // TODO i'm sure you could make this much prettier
    if(admin){
      return 'Admin';

    } else if(editor){
      return 'editor';

    } else if(subscriber){
      return 'subscriber';

    } else {
      return 'this user is a NOBODY';
    }  
  }

  useEffect(() => {
    getAllUsers()

    // return () => {
    //   console.log('return');
    // }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //? TABLE #################################
  //? TABLE #################################
  //? TABLE #################################
  const usersColumns = [
    {
      Header: 'Email',
      Footer: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Role',
      Footer: 'Role',
      accessor: 'roles',
    },
    {
      Header: 'Fav Color',
      Footer: 'Fav Color',
      accessor: 'color',
    },
    {
      Header: '',
      Footer: '',
      accessor: 'account',
    },
  ]

  const newColumns = useMemo(() => usersColumns, []) //* useMemo stops render on every refresh. performant
  // const newData    = useMemo( () => usersArray, [] ) //* idk skipping this for now

  const tableInstance = useTable({
    columns: newColumns,
    data: usersState

  }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance

  return (

    <StyledGigTable>
        {isLoading && (
          <Loading />
        )}

      <div className="postTable">


        <table {...getTableProps()}>
          
          <thead>
            {headerGroups.map((headGrp, i) => (
              <tr {...headGrp.getHeaderGroupProps()} key={i} className='header'>
                {headGrp.headers.map((column, i) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? <FaSortAmountUp />  : <FaSortAmountDownAlt />) : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {!isLoading && (
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, i) => {

                      return (
                        <td {...cell.getCellProps()} key={i}> {cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}

          <tfoot>
            {footerGroups.map((footerGrp, i) => (
              <tr {...footerGrp.getFooterGroupProps()} key={i}>
                {footerGrp.headers.map((column, i) => (
                  <td {...column.getFooterProps} key={i}>
                    {column.render('Footer')}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>

        </table>

      </div>
    </StyledGigTable>
  )
}
