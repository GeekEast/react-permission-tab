import { sleep } from './common';

export interface ICustomerFromBackend {
  _id: string;
  displayName: string;
  organizationId: string;
}

export const getCustomersByOrganizationId = async (
  organizationId: string
): Promise<ICustomerFromBackend[]> => {
  await sleep(1000);

  return [
    {
      _id: '617fc7ce450f71ecb11e776f',
      displayName: 'PH Sydney',
      organizationId,
    },
    {
      _id: '617fc7ce450f71ecb11e775f',
      displayName: 'PH Melbourne',
      organizationId,
    },
    {
      _id: '617fc7ce450f71ecb11e774f',
      displayName: 'PH Brisbane',
      organizationId,
    },
    {
      _id: '617fc7ce450f71ecb11e773f',
      displayName: 'PH Adelaide',
      organizationId,
    },

    {
      _id: '617fc7ce450f71ecb11e772f',
      displayName: 'PH Hobart',
      organizationId,
    },

    {
      _id: '617fc7ce450f71ecb11e771f',
      displayName: 'PH New Zealand',
      organizationId,
    },
  ];
};
