import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { IUserResponse } from "./interface";
import { usersGetService } from "./service";
import { useUser } from "../../providers/user.provider";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

/**
 * @description Form for submitting all my attributes to the API.
 *              I am allowing for a nationalities list so I can access the country name for better usage
 */
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
    setFormData: (data: any) => void,
    formData: any,
};

const UserLookupForm = ({ setGender, setFormData, formData }: IUserLookupForm) => {
    const { setUser, setUsers, loading, setLoading } = useUser();
    const [ nat, setNat ] = useState<string[]>([]);
    const [ toggle, setToggle ] = useState<boolean>(false);
    // Just a simple function to update the form data
    const updateFormData = (e: {target:{name: string, value: string}} | SelectChangeEvent<string | number>, func?: (v: string) => string) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: typeof func !== "undefined"? func(value as string) : value,
      });
    };

    const toNatList = (v: string) => {
      if(!nat.includes(v))
        setNat([...nat, v]);
      else
        setNat(nat.filter(n => n !== v));
    }
    // Submit event for the form. There are no required fields but the form allows for front-end validation
    const onSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const r = await usersGetService<IUserResponse[]>({
        gender: formData.gender,
        results: formData.numberOfUsers as number,
        nat: toggle? nat.join(',') : formData.nationality,
      });
      if(formData.numberOfUsers === 1 && r?.results && r?.results.length > 0) {
        setUser(r?.results[0] || {} as IUserResponse);
      } else {
        setUsers(r?.results || []);
      }
      setLoading(false);
    }
    // A simple form to allow for user lookup with MUI spinner
    return (
        <form className={ `p-4 ${loading? 'disabled' : ''}` } onSubmit={ onSubmitEvent }>
            { loading && <div className="thinker absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
              <CircularProgress color="secondary" />
            </div> }
            <Typography variant="h5" component="h5" className="pb-4 text-red-dark">Friend Lookup</Typography>
            <p>Let's find some users who just might be your next best friend!</p>
            {/* Make sure to control user selection, no need for user to select since there are only 3 possible */}
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
            {/* Loop the available nationalities since it's finite. Allow selection by checkbox or a single country, allows for flexibility */}
            <div className="border p-2 rounded-lg">
              <div className="flex justify-center items-center py-3">
                  You are able to choose&nbsp;{ <button type="button" className={`no-appearance ${!toggle? 'active' : ''}`} onClick={() => setToggle(false)}>one</button> }&nbsp;nationality or&nbsp;{ <button type="button" className={`no-appearance ${toggle? 'active' : ''}`} onClick={() => setToggle(true)}>multiple</button> }.
                  </div>
                  { toggle && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {nationalities.map((nationality) => (
                    <FormControlLabel
                    key={nationality.code}
                    control={
                      <Checkbox
                      checked={nat.includes(nationality.code)}
                      onChange={() => toNatList(nationality.code)}
                      name={nationality.name}
                      />
                    }
                    label={nationality.name}
                    />
                  ))}
                  </div>)}

                  {!toggle && (
                  <div>
                    <FormControl fullWidth margin="normal">
                    <InputLabel>Nationality</InputLabel>
                    <Select
                      value={ formData.nationality }
                      name='nationality'
                      onChange={(e) => updateFormData(e)}
                    >
                      <MenuItem value=''><em>None</em></MenuItem>
                    { nationalities.map((nationality) => (
                    <MenuItem key={nationality.code} value={nationality.code}>
                      { nationality.name }
                    </MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                  </div>)}
                </div>

            {/* Allow for user input, but make it only up to 999, even that is probably too many */}
            <FormControl fullWidth margin="normal">
              <TextField
                label="Number of Users"
                value={ formData.numberOfUsers }
                name='numberOfUsers'
                onChange={(e) => updateFormData(e, (v: string) => v.replace(/[^\d]/gi, '').substring(0, 3))}
              />
            </FormControl>

            <div className="flex justify-center items-center pt-4">
              <button type="submit" className="corporate"><SearchIcon />&nbsp;Search</button>
            </div>
        </form>
    );
};

export default UserLookupForm;