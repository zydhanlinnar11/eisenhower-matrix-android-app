import axios, {AxiosResponse} from 'axios';
import User from '../types/User';

const fetchUser = async (token: string) => {
  const res = await axios.get<any, AxiosResponse<User, any>, any>(
    `https://api.zydhan.com/apps/user-info?token=${token}`,
  );

  return res.data;
};

export default fetchUser;
