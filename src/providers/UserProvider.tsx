import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  FC,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react';
import User from '../types/User';
import fetchUser from '../utils/FetchUser';
import showErrorToast from '../utils/ShowErrorToast';

type UserState =
  | {
      state: 'loading';
    }
  | {
      state: 'unauthenticated';
    }
  | {
      state: 'authenticated';
      user: User;
    };

type Action = UserState;

const reducer = (state: UserState, action: Action): UserState => action;

const initialState: UserState = {
  state: 'loading',
};

const UserStateContext = createContext<UserState>(initialState);
const UserDispatchContext = createContext<Dispatch<Action>>(() => null);

export const UserProvider: FC<PropsWithChildren<{}>> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem('@storage_token')
      .then(token => {
        if (!token) {
          dispatch({state: 'unauthenticated'});
          return;
        }
        fetchUser(token)
          .then(user =>
            dispatch({
              state: 'authenticated',
              user,
            }),
          )
          .catch(() => dispatch({state: 'unauthenticated'}));
      })
      .catch(showErrorToast);
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
