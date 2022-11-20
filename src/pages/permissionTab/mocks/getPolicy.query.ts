import { sleep } from './common';

export const getPolicy = async () => {
  await sleep(1000);

  return {
    id: '617fc99a3b6384ecb1423a86',
    name: 'ph-au recruiter group policy',
    description: 'the policy for ph-au recruiter group',
    statements: [
      // you can add `only one` resource for the first statement
      {
        actions: ['apps:viewVacancy', 'org:viewUser', 'org:editUser'],
        resources: [
          'prn:apps:ap-southeast-2:fc81597b-f1b2-440f-a669-af3e241081f9:617fc7ce450f71ecb11e776f:617fc7ce450f71ecb11e7774:*:*',
        ],
        effect: 'allow',
      },
      // you can add `more than one` resources for other statements
      {
        actions: ['apps:viewVacancy', 'org:viewUser', 'org:editUser'],
        resources: [
          'prn:apps:ap-southeast-2:fc81597b-f1b2-440f-a669-af3e241081f9:617fc7ce450f71ecb11e774f:617fc7ce450f71ecb11e7772:*:*',
          'prn:org:ap-southeast-2:fc81597b-f1b2-440f-a669-af3e241081f9:617fc7ce450f71ecb11e773f:617fc7ce450f71ecb11e7771:*:*',
        ],
        effect: 'allow',
      },
    ],
    createdAt: '2021-11-01T12:21:13.407Z',
    updatedAt: '2021-11-01T12:21:13.407Z',
    archivedAt: null,
    tags: [],
  };
};
