import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import axios from 'axios';

// ----------------------------------------------------------------------

export const getUsersList = () => {

  return new Promise(async (res, rej) => {
    await axios.get('/api/users').then((d) => {
      const users = d?.data?.map((user, index) => ({
        id: user.id,
        avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
        name: user.name,
        email: user.email,
        created: user?.updated_at,
        isVerified: user.email_verified_at ? 'true' : 'false',
        status: 'active',
        role: 'customer'
      }));
      res(users);
    }).catch((e) => {

      rej('error fetching users');
    })
  })
}



export const getSubscriptions = () => {

  return new Promise(async (res, rej) => {
    await axios.get('/subscriptions').then((response) => {

      res(response.data);

    }).catch((e) => {

      rej('error fetching users');
    })
  })
}

