import { useState } from "react";
import UserLookupDatatable from "./datatable";
import BackspaceIcon from '@mui/icons-material/Backspace';
import UserLookupUser from "./user";
import UserLookupForm from "./form";
import { useUser } from "../../providers/user.provider";

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
    const { user, users, setUsers, setUser, loading } = useUser();

    return (
    <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
        <>
        { !user?.name && users.length === 0 && (
        <UserLookupForm
          setGender={setGender}
          setFormData={setFormData}
          formData={formData}
        />)}
        { users.length > 0 && !user?.name && !loading && <button className="corporate-btn" style={{marginTop: 0}} onClick={() => {
            setUsers([]);
            setUser({} as any);
          }}><BackspaceIcon fontSize="small" /></button> }
        { !user?.name && <UserLookupDatatable /> }
        { user?.name && <UserLookupUser /> }
        </>
      </div>
    )
}

export default UserLookupComponent;