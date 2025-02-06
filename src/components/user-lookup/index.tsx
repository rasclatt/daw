import { useState } from "react";
import UserLookupDatatable from "./datatable";
import BackspaceIcon from '@mui/icons-material/Backspace';
import UserLookupUser from "./user";
import UserLookupForm from "./form";

interface IUserForm {
  gender: 'female' | 'male' | '',
  nationality: string,
  numberOfUsers: string | number,
}

const UserLookupComponent = ({ setGender }: { setGender: (type: 'female' | 'male' | '') => void }) => {
    const [ formData, setFormData ] = useState<IUserForm>({
      gender: '',
      nationality: '',
      numberOfUsers: 5,
    });
    const [ users, setUsers ] = useState<any[]>([]);
    const [ user, setUser ] = useState<any>({});
    const [ loading, setLoading ] = useState<boolean>(false);

    return (
    <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
        { !user?.name && users.length === 0 && (
        <UserLookupForm
          setGender={setGender}
          loading={loading}
          setUser={setUser}
          setUsers={setUsers}
          setFormData={setFormData}
          formData={formData}
          setLoading={setLoading}
        />)}
        { users.length > 0 && !user?.name && !loading && <button className="corporate-btn" onClick={() => setUsers([])}><BackspaceIcon /></button> }
        { !user?.name && <UserLookupDatatable loading={loading} users={users} setUser={ setUser } /> }
        { user?.name && <UserLookupUser user={ user } setUser={ setUser } /> }
        </div>
    )
}

export default UserLookupComponent;