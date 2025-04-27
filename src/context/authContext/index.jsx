import { auth } from '../../firebase/config';
import { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import apiClient from '../../config/axiosInstance'; 

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const[UserId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          if(token){
            const response = await apiClient.post(
              '/api/auth/validate-token',
              {}, 
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            if (response.status === 200) {
              const validatedUser = response.data; 
              setUser({ ...firebaseUser, ...validatedUser, token });
              setUserId(validatedUser.uid);
              setUserLoggedIn(true);
            } else {
              throw new Error('Token validation failed');
            }
          }
        } catch (error) {
          console.error('Error validating token:', error);
          setUser(null);
          setUserLoggedIn(false);
        }
      } else {
        setUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userLoggedIn,
    loading,
    UserId
  };

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  );
};

export function useAuth() {
  return useContext(authContext);
}
