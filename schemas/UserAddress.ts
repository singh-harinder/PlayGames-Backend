import { list } from '@keystone-next/keystone/schema';
import { text, relationship } from '@keystone-next/fields';

export const UserAddress = list({
  fields: {
    house: text({ isRequired: true }),
    City: text({ isRequired: true }),
    State: text({ isRequired: true }),
    user: relationship({
      ref: 'User.address',
    }),
  },
});
