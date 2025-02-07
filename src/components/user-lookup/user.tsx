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
                    <img className='absolute' style={{maxHeight: 50, bottom: 0, right: 'calc(50% - 70px)', zIndex: 10}} src={`https://flagsapi.com/${nationalities.filter((v) => v.code === user.nat)[0].code}/flat/64.png`} />
                    <img src={ user.picture.large } alt={ `${user.name.first} ${user.name.last}` } className="rounded-full w-40 h-40 m-auto" />
                </div>
                <div className="flex justify-center items-center">
                    <button style={{appearance: 'none'}} className='mt-2 icon-btn mod' onClick={() => setUser({} as IUserResponse)}><ArrowBackIosNewIcon fontSize='small' /></button>
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
                        <p key={i} className='pb-1'>{v}</p>))
                }
                { !showAll && (
                    <div className='pt-4'>
                        <Button variant='outlined' onClick={() => setShowAll(true)}>All Info</Button>
                    </div>
                ) }
            </div>
            { showAll && (
            <div className='user-lookup-single-info'>
                <Button variant='outlined' onClick={() => setShowAll(!showAll)}>Hide Info</Button>
                <div className="mt-4">
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td className='uppercase align-top p-2 border-t'>Username:</td>
                                <td className='uppercase align-top p-2 border-t'>{ user?.login?.username }</td>
                            </tr> 
                            <tr>
                                <td className='uppercase align-top p-2 border-t'>Registered:</td>
                                <td className='uppercase align-top p-2 border-t'>{ new Date(user?.registered?.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }</td>
                            </tr> 
                            <tr>
                                <td className='uppercase align-top p-2 border-t'>Age:</td>
                                <td className='uppercase align-top p-2 border-t'>{ user?.dob?.age }</td>
                            </tr> 
                            <tr>
                                <td className='uppercase align-top p-2 border-t'>Location:</td>
                                <td className='uppercase align-top p-2 border-t'>{ user?.location?.city }, { user?.location?.country }</td>
                            </tr> 
                            <tr>
                                <td className='uppercase align-top p-2 border-t'>Address:</td>
                                <td className='uppercase align-top p-2 border-t'>
                                    { user?.location?.street?.number }<br />{ user?.location?.street?.name },<br />{ user?.location?.city },<br />{ user?.location?.state },<br />{ user?.location?.country }, { user?.location?.postcode }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            ) }
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
            <table style={{ width: '100%' }}>
                <tbody>
                    {data && Object.keys(data).map((v: any, i: number) => (
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