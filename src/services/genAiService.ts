import { GFXCard, GFXStatus } from '../types';

// Mock GFX card videos - using sample video clips simulating trailer motion graphics (9:16 aspect ratio)
const mockGFXImages: Record<string, string> = {
  'zh-TW': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'en': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'ja': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'th': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
};

const defaultPrompts: Record<string, string> = {
  'zh-TW': 'Create a promotional GFX card for Hell\'s Paradise Season 2 in Traditional Chinese. Include the title "地獄樂" prominently with "Season 2" subtitle. Use dramatic dark fantasy aesthetic with red and black color scheme.',
  'en': 'Create a promotional GFX card for Hell\'s Paradise: Jigokuraku Season 2 in English. Feature the main title prominently with Season 2 designation. Use dramatic dark fantasy aesthetic with red and black color scheme.',
  'ja': 'Create a promotional GFX card for Hell\'s Paradise Season 2 in Japanese. Include the title "地獄楽" prominently with "Season 2" subtitle. Use dramatic dark fantasy aesthetic with red and black color scheme.',
  'th': 'Create a promotional GFX card for Hell\'s Paradise Season 2 in Thai. Include the title in Thai script prominently with "Season 2" subtitle. Use dramatic dark fantasy aesthetic with red and black color scheme.',
};

// Simulates GenAI generation with random delays
const simulateGeneration = (languageCode: string): Promise<{ imageUrl: string; prompt: string }> => {
  return new Promise((resolve) => {
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    setTimeout(() => {
      resolve({
        imageUrl: mockGFXImages[languageCode] || mockGFXImages['en'], // Returns video URL
        prompt: defaultPrompts[languageCode] || defaultPrompts['en'],
      });
    }, delay);
  });
};

export const generateGFXCard = async (
  languageCode: string,
  languageName: string,
  customPrompt?: string
): Promise<GFXCard> => {
  // Simulate API call
  const { imageUrl, prompt } = await simulateGeneration(languageCode);
  
  return {
    id: `gfx-${languageCode}-${Date.now()}`,
    languageCode,
    languageName,
    status: 'needs_review',
    imageUrl,
    prompt: customPrompt || prompt,
    generatedAt: new Date(),
  };
};

export const regenerateGFXCard = async (
  card: GFXCard,
  newPrompt: string
): Promise<GFXCard> => {
  // Simulate regeneration with new prompt (5-10 seconds for realistic timing)
  const delay = Math.random() * 5000 + 5000; // 5-10 seconds
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  const { imageUrl } = await simulateGeneration(card.languageCode);
  
  return {
    ...card,
    imageUrl,
    prompt: newPrompt,
    status: 'needs_review',
    generatedAt: new Date(),
  };
};

export const getStatusLabel = (status: GFXStatus): string => {
  const labels: Record<GFXStatus, string> = {
    not_started: 'Not Started',
    queued: 'Queued',
    generating: 'Regenerating...',
    completed: 'Completed',
    failed: 'Failed',
    needs_review: 'Needs Review',
    approved: 'Approved',
    rejected: 'Rejected',
    delivered: 'Delivered to VanDAM',
  };
  return labels[status];
};

export const getStatusColor = (status: GFXStatus): string => {
  const colors: Record<GFXStatus, string> = {
    not_started: 'bg-gray-200 text-gray-700',
    queued: 'bg-blue-100 text-blue-700',
    generating: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    needs_review: 'bg-purple-100 text-purple-700',
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-orange-100 text-orange-700',
    delivered: 'bg-indigo-100 text-indigo-700',
  };
  return colors[status];
};
