import { Campaign } from './types';

export const mockCampaign: Campaign = {
  id: '81675815',
  name: "Hell's Paradise: Jigokuraku: Season 2",
  languages: [
    {
      code: 'zh-TW',
      name: 'CHINESE (TRADITIONAL)',
      gfxStatus: 'not_started',
      subStages: [
        { name: 'Origination', status: 'completed' },
        { name: 'Pre-QC Assembly', status: 'completed' },
        { name: 'QC', status: 'completed' },
        { name: 'Versioning & Encoding', status: 'in_progress' },
      ],
    },
    {
      code: 'en',
      name: 'ENGLISH',
      gfxStatus: 'not_started',
      subStages: [
        { name: 'Origination', status: 'completed' },
        { name: 'Pre-QC Assembly', status: 'completed' },
        { name: 'QC', status: 'completed' },
        { name: 'Versioning & Encoding', status: 'in_progress' },
      ],
    },
    {
      code: 'ja',
      name: 'JAPANESE',
      gfxStatus: 'not_started',
      subStages: [
        { name: 'Origination', status: 'completed' },
        { name: 'Pre-QC Assembly', status: 'completed' },
        { name: 'QC', status: 'completed' },
        { name: 'Versioning & Encoding', status: 'in_progress' },
      ],
    },
    {
      code: 'th',
      name: 'THAI',
      gfxStatus: 'not_started',
      subStages: [
        { name: 'Origination', status: 'completed' },
        { name: 'Pre-QC Assembly', status: 'completed' },
        { name: 'QC', status: 'completed' },
        { name: 'Versioning & Encoding', status: 'in_progress' },
      ],
    },
  ],
};
