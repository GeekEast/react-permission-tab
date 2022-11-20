import { sleep } from './common';

export interface IHierarchyFromBackend {
  _id: string;
  customerId: string;
  name: string;
}

const CUSTOMER_HIERARCHIES_MAPPINGS: Record<string, IHierarchyFromBackend[]> = {
  '617fc7ce450f71ecb11e776f': [
    {
      _id: '617fc7ce450f71ecb11e7774',
      customerId: '617fc7ce450f71ecb11e776f',
      name: 'PH Sydney ROOT Hierarchy',
    },
    {
      _id: '617fc7ce450f71ecb11e7764',
      customerId: '617fc7ce450f71ecb11e776f',
      name: 'PH Sydney',
    },
  ],
  '617fc7ce450f71ecb11e775f': [
    {
      _id: '617fc7ce450f71ecb11e7773',
      customerId: '617fc7ce450f71ecb11e775f',
      name: 'PH Melbourne ROOT Hierarchy',
    },
    {
      _id: '617fc7ce450f71ecb11e7763',
      customerId: '617fc7ce450f71ecb11e775f',
      name: 'PH Melbourne',
    },
  ],
  '617fc7ce450f71ecb11e774f': [
    {
      _id: '617fc7ce450f71ecb11e7772',
      customerId: '617fc7ce450f71ecb11e774f',
      name: 'PH Brisbane ROOT Hierarchy',
    },
    {
      _id: '617fc7ce450f71ecb11e7762',
      customerId: '617fc7ce450f71ecb11e774f',
      name: 'PH Brisbane',
    },
  ],
  '617fc7ce450f71ecb11e773f': [
    {
      _id: '617fc7ce450f71ecb11e7771',
      customerId: '617fc7ce450f71ecb11e773f',
      name: 'PH Adelaide ROOT Hierarchy',
    },
    {
      _id: '617fc7ce450f71ecb11e7761',
      customerId: '617fc7ce450f71ecb11e773f',
      name: 'PH Adelaide',
    },
  ],
  '617fc7ce450f71ecb11e772f': [
    {
      _id: '617fc7ce450f71ecb11e7770',
      customerId: '617fc7ce450f71ecb11e772f',
      name: 'PH Hobart ROOT Hierarchy',
    },
    {
      _id: '617fc7ce450f71ecb11e7760',
      customerId: '617fc7ce450f71ecb11e772f',
      name: 'PH Hobart',
    },
  ],
  '617fc7ce450f71ecb11e771f': [
    {
      _id: '617fc7ce450f71ecb11e7769',
      customerId: '617fc7ce450f71ecb11e771f',
      name: 'PH New Zealand ROOT Hierarchy',
    },
    {
      _id: '617fc7ce450f71ecb11e7759',
      customerId: '617fc7ce450f71ecb11e771f',
      name: 'PH New Zealand',
    },
  ],
};

export const getHierarchiesByCustomerId = async (
  customerId: string
): Promise<IHierarchyFromBackend[]> => {
  await sleep(1000);
  return CUSTOMER_HIERARCHIES_MAPPINGS[customerId];
};
