import { createContext, useState, useContext, ReactNode } from 'react';
import { IUserResponse } from '../components/user-lookup/interface';
/**
 * @description I am using a context provider to manage the state of the userdata, just I can
 *              manage it in the components it's needed instead of passing it down through props which gets messy.
 */

interface UserContextType {
    users: IUserResponse[];
    setUsers: (users: IUserResponse[]) => void;
    user: IUserResponse;
    setUser: (users: IUserResponse) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [ users, setUsers ] = useState<any[]>([]);
    const [ user, setUser ] = useState<any>({});
    const [ loading, setLoading ] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{
            users, setUsers, user, setUser, loading, setLoading
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};