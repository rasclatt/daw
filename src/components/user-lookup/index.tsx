import { useState } from "react";
import { useUser } from "../../providers/user.provider";
import UserLookupDatatable from "./datatable";
import BackspaceIcon from '@mui/icons-material/Backspace';
import UserLookupUser from "./user";
import UserLookupForm from "./form";
import './styles.scss';

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
    const { user, users, setUsers, setUser, loading, resetPage } = useUser();

    const backButton = () => {
      setUsers([]);
      setUser({} as any);
      resetPage();
    };

    return (
    <div className={`bg-white p-4 mt-4 rounded-lg shadow-lg ${user?.name? 'user-card' : ''}`}>
        <>
        { !user?.name && users.length === 0 && (
        <UserLookupForm
          setGender={setGender}
          setFormData={setFormData}
          formData={formData}
        />)}
        { users.length > 0 && !user?.name && !loading && (
          <div className="flex justify-start items-center mb-4">
            <button className="icon-btn mod" style={{marginTop: 0}} onClick={ backButton }><BackspaceIcon fontSize="small" /></button>&nbsp;<span className="font-bold cursor-pointer" onClick={backButton}>BACK</span>
          </div>
          ) }
        { !user?.name && <UserLookupDatatable /> }
        { user?.name && <UserLookupUser /> }
        </>
      </div>
    )
}

export default UserLookupComponent;