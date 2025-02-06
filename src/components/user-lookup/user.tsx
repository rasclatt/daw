import { Button, Typography } from '@mui/material';
import { nationalities } from './form';
import { useState } from 'react';
import { useUser } from '../../providers/user.provider';
import { IUserResponse } from './interface';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const UserLookupUser = () => {
    const { setUser, user } = useUser();
    const [ showAll, setShowAll ] = useState<boolean>(false);
    return (
        <div className='user-lookup-single'>
            <div className='user-lookup-single-image'>
                <div className='relative'>
                    <img className='absolute' style={{maxHeight: 50, bottom: 0, right: 0, zIndex: 10}} src={`https://flagsapi.com/${nationalities.filter((v) => v.code === user.nat)[0].code}/flat/64.png`} />
                    <img src={ user.picture.large } alt={ `${user.name.first} ${user.name.last}` } className="rounded-full w-40 h-40 m-auto" />
                </div>
                <div className="flex justify-center items-center">
                    <button style={{appearance: 'none'}} className='m-0 corporate-btn transform scale-60 transition-transform duration-200' onClick={() => setUser({} as IUserResponse)}><ArrowBackIosNewIcon fontSize='small' /></button>
                </div>
            </div>
            <div className='user-lookup-single-details'>
                <Typography variant="h6" component="h6" className="py-4 flex space-between">{user.name.first} {user.name.last} / { nationalities.filter((v) => v.code === user.nat)[0].name }</Typography>
                <hr className='mb-4' />
                {
                    [
                        <><AlternateEmailIcon /> <a href={ `mailto:${user.email}`}>{user.email}</a></>,
                        <><LocalPhoneIcon />: <a href={`tel:${ user.phone }`}>{ user.phone }</a></>,
                        <><PhoneAndroidIcon />: <a href={`tel:${ user.cell }`}>{ user.cell }</a></>,
                    ].map((v, i) => (
                        <Typography key={i} variant="body1" component="p" className='pb-1'>{v}</Typography>))
                }
                { !showAll && (
                    <div className='pt-4'>
                        <Button variant='outlined' onClick={() => setShowAll(true)}>All Info</Button>
                    </div>
                ) }
                { showAll && (
                    <div className='pt-4'>
                        <Button variant='outlined' onClick={() => setShowAll(!showAll)}>Hide Info</Button>
                        <div className="mt-4">
                            <UserLookupAutoTableComponent border data={user} />
                        </div>
                    </div>
                ) }
            </div>
        </div>
    );
};

export default UserLookupUser;

/**
 * @description Auto Table generator Component for quick (but not so lovely) data display
 */
const UserLookupAutoTableComponent = ({ data, border = true }: { data: any, border: boolean }) => {
    return (
        typeof data === 'object' && Object.keys(data).length > 0 && (
            <table>
                <tbody>
                    {Object.keys(data).map((v: any, i: number) => (
                        <tr key={i}>
                            <td className={`uppercase align-top p-2 ${border? 'border-t' : ''}`}>{v}:</td>
                            <td className={border? 'border-t' : ''}>{ typeof data[v] === "object"? <UserLookupAutoTableComponent border={false} data={data[v]} /> : data[v]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    )
}