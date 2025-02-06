import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { IUserResponse } from "./interface";
import { usersGetService } from "./service";

export const nationalities = [
    { code: 'AU', name: 'Australia' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'DE', name: 'Germany' },
    { code: 'DK', name: 'Denmark' },
    { code: 'ES', name: 'Spain' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IN', name: 'India' },
    { code: 'IR', name: 'Iran' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NO', name: 'Norway' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'RS', name: 'Serbia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'US', name: 'United States' }
  ];

interface IUserLookupForm {
    setGender: (gender: 'female' | 'male' | '') => void,
    loading: boolean,
    setUser: (user: IUserResponse | any) => void,
    setUsers: (users: IUserResponse[]) => void,
    setLoading: (loading: boolean) => void,
    formData: any,
    setFormData: (data: any) => void
};

const UserLookupForm = ({ setGender, loading, setUser, setUsers, setFormData, formData, setLoading }: IUserLookupForm) => {

    const updateFormData = (e: {target:{name: string, value: string}} | SelectChangeEvent<string | number>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  
      const onSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const r = await usersGetService<{results: IUserResponse[]}>({
          gender: formData.gender,
          results: formData.numberOfUsers as number,
          nat: formData.nationality,
        });
        if(formData.numberOfUsers === 1) {
          setUser(r?.results[0] || {});
        } else {
          setUsers(r?.results || []);
        }
        setLoading(false);
      }
  
    return (
        <form className={ `p-4 ${loading? 'disabled' : ''}` } onSubmit={ onSubmitEvent }>
            { loading && <div className="thinker absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <CircularProgress color="secondary" />
            </div> }
            <Typography variant="h5" component="h5" className="pb-4">User Lookup</Typography>
            <Typography variant="body1" component="p" className="pb-4">Let's find some users who just might be your next best friend!</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
                <Select
                  value={ formData.gender }
                  name='gender'
                  onChange={(e) => {
                    updateFormData(e);
                    setGender(e.target.value as '');
                  }}
                >
                <MenuItem value=''><em>None</em></MenuItem>
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Nationality</InputLabel>
              <Select
                value={ formData.nationality }
                name='nationality'
                onChange={(e) => updateFormData(e)}
              >
            { nationalities.map((nationality) => (
              <MenuItem key={nationality.code} value={nationality.code}>
                {nationality.name}
              </MenuItem>
            ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Number of Users</InputLabel>
              <Select
            value={ formData.numberOfUsers }
            name='numberOfUsers'
            onChange={(e) => updateFormData(e)}
              >
            { [5, 20, 50, 100, 500].map((num) => (
          <MenuItem key={num} value={num}>{num}</MenuItem>
            )) }
              </Select>
            </FormControl>
            <button type="submit" className="uppercase bg-orange hover:bg-orange-dark text-white py-3 px-5 rounded-full mt-4 transition ease-in-out font-medium">Search</button>
        </form>
    );
};

export default UserLookupForm;