import axios from "axios"
import { useEffect, useState } from "react"
import {User} from './Interface/User'

export interface AuthContextType {
    username: string
    setUsername: (username: string) => void
    role: "unauth" | "USER" | "ADMIN"
    setRole: (role: 'unauth' | "USER" | "ADMIN") => void
}

export const useUserAuth = () => {
    const [username, setUsername] = useState<string>('')
    const [role, setRole] = useState<'unauth' | 'USER' | 'ADMIN'>('unauth')

    useEffect(() => {
        axios
          .get<User>('http://localhost:8080/users', { withCredentials: true })
          .then((res) => {
            setUsername(res.data.username);
            setRole(res.data.role);
          })
          .catch((err) => {
            console.log(err);
            setUsername('');
            setRole('unauth');
          });
      }, []);

      return {username, setUsername, role, setRole}
}