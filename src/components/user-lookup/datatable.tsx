import { Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useUser } from '../../providers/user.provider';
import SendIcon from '@mui/icons-material/Send';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

/**
 * @description User lookup datatable component. Just using a MUI datagrid to remove homegrown table.
 */
const UserLookupDatatable = () => {
    const { setUser, loading, users } = useUser();
    return (
        users.length > 0 && !loading && (
            <>
              <Typography variant="h5" component="h5" className="pt-4 text-red-dark">New Friend Matches</Typography>
              <p className='pb-6'>We have great news! We've found you some friends so don't be shy, reach out and get to know someone new!</p>
              <DataGrid
                getRowId={(row) => `${row.login.uuid}` }
                rows={ users }
                columns={[
                  { field: 'name', headerName: 'Name', width: 150, renderCell: (e) => (
                    <div className='relative name-group' onClick={() => setUser(e.row)}>
                      { e.row.picture.thumbnail && (
                      <div className='name-group-thumb '>
                        <img src={ e.row.picture.thumbnail } alt={ `${e.row.name.first} ${e.row.name.last}` } className='w-30 h-30' />
                      </div>) }
                      <span style={{padding: '0.25em 0.5em', position: 'relative', top: -1, left: -2, backgroundColor: e.row.gender === 'male'? '#00C9FF' : 'pink', borderRadius: '50%', color: '#FFF', fontSize: '80%' }}>{e.row.gender.substring(0, 1).toUpperCase()}</span>{ e.row.name.first } { e.row.name.last }
                    </div>
                  )},
                  { field: 'nat', headerName: 'Co.', width: 60 },
                  { field: 'email', headerName: 'Email', flex: 1, renderCell: (e) => ( <>
                        <a className="text-orange-500 hidden sm:block cursor-pointer" href={ `mailto:${e.row.email}` }>{ e.row.email }</a>
                        <a className="text-orange-500 sm:none cursor-pointer" href={ `mailto:${e.row.email}` }><SendIcon /></a>
                    </> ) },
                  { field: 'action', headerName: '', width: 60, renderCell: (e) => (
                    <Tooltip title="View more user information" arrow placement="top">
                      <button onClick={() => setUser(e.row)} className='cursor-pointer relative transition ease-in-out transform hover:scale-110'><RemoveRedEyeIcon className='cursor-pointer' /></button>
                    </Tooltip>
                  )},
                ]}
                pageSizeOptions={[5, 10, 20, 100]}
              />
            </>
          )
    );
};

export default UserLookupDatatable;