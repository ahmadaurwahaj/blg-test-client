import type { AnalysisResults, APIAnalysisResponse } from '@/types';

// Mock API response matching backend structure from API.md
const mockAPIResponse: APIAnalysisResponse = {
  visibilityScore: 45,
  marketShare: 18.5,
  totalPrompts: 5,
  promptsWithBrand: 3,
  brandRanking: [
    {
      name: 'Salesforce',
      mentions: 12,
      share: 35.2,
    },
    {
      name: 'HubSpot',
      mentions: 8,
      share: 23.5,
    },
    {
      name: 'Your Brand',
      mentions: 5,
      share: 18.5,
    },
    {
      name: 'Zoho',
      mentions: 4,
      share: 14.8,
    },
    {
      name: 'Pipedrive',
      mentions: 2,
      share: 7.4,
    },
  ],
  citationDomains: [
    { domain: 'wikipedia.org', count: 8 },
    { domain: 'g2.com', count: 6 },
    { domain: 'capterra.com', count: 5 },
    { domain: 'forbes.com', count: 4 },
    { domain: 'techcrunch.com', count: 3 },
    { domain: 'reddit.com', count: 3 },
    { domain: 'quora.com', count: 2 },
    { domain: 'medium.com', count: 2 },
  ],
  perPromptResults: [
    {
      query: 'What tools help manage customer relationships?',
      stage: 'awareness',
      response: 'There are several excellent tools for managing customer relationships...',
      citations: [
        {
          url: 'https://wikipedia.org/wiki/Customer_relationship_management',
          title: 'Customer relationship management - Wikipedia',
          domain: 'wikipedia.org',
        },
        {
          url: 'https://g2.com/categories/crm',
          title: 'Best CRM Software 2024',
          domain: 'g2.com',
        },
      ],
      brands: [
        {
          name: 'Salesforce',
          mentions: 3,
          context: 'mentioned as industry leader',
        },
        {
          name: 'HubSpot',
          mentions: 2,
          context: 'recommended for small businesses',
        },
        {
          name: 'Your Brand',
          mentions: 1,
          context: 'mentioned as emerging solution',
        },
      ],
      targetBrandFound: true,
      targetBrandMentions: 1,
    },
    {
      query: 'Best CRM software for small businesses',
      stage: 'consideration',
      response: 'For small businesses, several CRM platforms stand out...',
      citations: [
        {
          url: 'https://capterra.com/crm-software/',
          title: 'Best CRM Software for Small Business',
          domain: 'capterra.com',
        },
        {
          url: 'https://forbes.com/advisor/business/software/best-crm-software/',
          title: 'Best CRM Software Of 2024 - Forbes',
          domain: 'forbes.com',
        },
      ],
      brands: [
        {
          name: 'HubSpot',
          mentions: 3,
          context: 'top choice for small businesses',
        },
        {
          name: 'Salesforce',
          mentions: 2,
          context: 'mentioned for scalability',
        },
        {
          name: 'Your Brand',
          mentions: 2,
          context: 'highlighted for ease of use',
        },
        {
          name: 'Zoho',
          mentions: 2,
          context: 'budget-friendly option',
        },
      ],
      targetBrandFound: true,
      targetBrandMentions: 2,
    },
    {
      query: 'Salesforce vs HubSpot comparison',
      stage: 'decision',
      response: 'When comparing Salesforce and HubSpot...',
      citations: [
        {
          url: 'https://g2.com/compare/hubspot-crm-vs-salesforce-sales-cloud',
          title: 'HubSpot CRM vs Salesforce Comparison',
          domain: 'g2.com',
        },
        {
          url: 'https://techcrunch.com/crm-comparison',
          title: 'CRM Platform Comparison 2024',
          domain: 'techcrunch.com',
        },
      ],
      brands: [
        {
          name: 'Salesforce',
          mentions: 4,
          context: 'enterprise-focused platform',
        },
        {
          name: 'HubSpot',
          mentions: 3,
          context: 'user-friendly alternative',
        },
        {
          name: 'Zoho',
          mentions: 1,
          context: 'mentioned as alternative',
        },
      ],
      targetBrandFound: false,
      targetBrandMentions: 0,
    },
    {
      query: 'How to track customer communications effectively',
      stage: 'problem',
      response: 'Effective customer communication tracking requires...',
      citations: [
        {
          url: 'https://reddit.com/r/sales/comments/tracking-customer-communications',
          title: 'Best practices for tracking customer communications',
          domain: 'reddit.com',
        },
        {
          url: 'https://medium.com/customer-success-tracking',
          title: 'Customer Communication Tracking Guide',
          domain: 'medium.com',
        },
      ],
      brands: [
        {
          name: 'Salesforce',
          mentions: 2,
          context: 'comprehensive tracking features',
        },
        {
          name: 'Your Brand',
          mentions: 1,
          context: 'simple tracking interface',
        },
        {
          name: 'Pipedrive',
          mentions: 1,
          context: 'visual pipeline tracking',
        },
      ],
      targetBrandFound: true,
      targetBrandMentions: 1,
    },
    {
      query: 'CRM with email integration recommendations',
      stage: 'solution',
      response: 'Several CRM platforms offer excellent email integration...',
      citations: [
        {
          url: 'https://g2.com/categories/crm/email-integration',
          title: 'CRM with Best Email Integration',
          domain: 'g2.com',
        },
        {
          url: 'https://quora.com/What-CRM-has-the-best-email-integration',
          title: 'What CRM has the best email integration?',
          domain: 'quora.com',
        },
      ],
      brands: [
        {
          name: 'HubSpot',
          mentions: 2,
          context: 'native email integration',
        },
        {
          name: 'Salesforce',
          mentions: 1,
          context: 'enterprise email features',
        },
        {
          name: 'Your Brand',
          mentions: 1,
          context: 'seamless Gmail integration',
        },
        {
          name: 'Zoho',
          mentions: 1,
          context: 'affordable email CRM',
        },
        {
          name: 'Pipedrive',
          mentions: 1,
          context: 'email tracking features',
        },
      ],
      targetBrandFound: true,
      targetBrandMentions: 1,
    },
  ],
};

export const mockAnalysisResults: AnalysisResults = {
  targetUrl: 'https://yourbrand.com',
  targetBrand: 'Your Brand',
  apiResponse: mockAPIResponse,
};
