import React from 'react'
import { getAllUsers } from '../_actions'
import UsersTable from './DataTable';

const AllUsersModule = async () => {
    const users = await getAllUsers();
  return (
    <div>
      <UsersTable data={users?.data}/>
    </div>
  )
}

export default AllUsersModule