import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IUserResponse } from './interface';
import SendIcon from '@mui/icons-material/Send';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const UserLookupDatatable = ({ loading, users, setUser }: {loading: boolean, users: IUserResponse[], setUser: (user: IUserResponse) => void }) => {
    return (
        users.length > 0 && !loading && (
            <>
              <Typography variant="h6" component="h6" className="p-4">Results</Typography>
              <DataGrid
                getRowId={(row) => `${row.login.uuid}` }
                rows={ users }
                columns={[
                  { field: 'name', headerName: 'Name', width: 150, renderCell: (e) => (
                    <div>
                      <span style={{padding: '0.25em 0.5em', position: 'relative', top: -1, left: -2, backgroundColor: e.row.gender === 'male'? 'blue' : 'pink', borderRadius: '50%', color: '#FFF', fontSize: '80%' }}>{e.row.gender.substring(0, 1).toUpperCase()}</span>{ e.row.name.first } { e.row.name.last }
                    </div>
                  )},
                  { field: 'nat', headerName: 'Co.', width: 60 },
                  { field: 'email', headerName: 'Email', flex: 1, renderCell: (e) => ( <>
                        <a className="text-orange-500 hidden sm:block cursor-pointer" href={ `mailto:${e.row.email}` }>{ e.row.email }</a>
                        <a className="text-orange-500 sm:none cursor-pointer" href={ `mailto:${e.row.email}` }><SendIcon /></a>
                    </> ) },
                  { field: 'action', headerName: '', width: 60, renderCell: (e) => (
                    <button onClick={() => setUser(e.row)}><RemoveRedEyeIcon /></button>
                  )},
                ]}
                pageSizeOptions={[5, 10, 20, 100]}
              />
            </>
          )
    );
};

export default UserLookupDatatable;