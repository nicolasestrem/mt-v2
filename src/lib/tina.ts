// Simplified content loader for static site generation
// Works with Cloudflare Pages and other static hosting platforms
// All content is loaded at build time from JSON files

// Import all content statically to ensure reliable build-time loading
import heroContent from '../../content/hero/hero.json';
import aboutContent from '../../content/about/about.json';
import missionContent from '../../content/mission/mission.json';
import newsletterContent from '../../content/newsletter/newsletter.json';
import settingsContent from '../../content/settings.json';

// Import criteria content
import criteria1 from '../../content/criteria/criteria-1.json';
import criteria2 from '../../content/criteria/criteria-2.json';
import criteria3 from '../../content/criteria/criteria-3.json';
import criteria4 from '../../content/criteria/criteria-4.json';
import criteria5 from '../../content/criteria/criteria-5.json';

// Import jury content
import juryMember1 from '../../content/jury/jury-member-1.json';
import juryMember2 from '../../content/jury/jury-member-2.json';

// Content registry - all content is pre-loaded at build time
const contentRegistry = {
  hero: { hero: heroContent },
  about: { about: aboutContent },
  mission: { mission: missionContent },
  newsletter: { newsletter: newsletterContent },
  settings: { settings: settingsContent },
  criteria: {
    'criteria-1': criteria1,
    'criteria-2': criteria2,
    'criteria-3': criteria3,
    'criteria-4': criteria4,
    'criteria-5': criteria5,
  },
  jury: {
    'jury-member-1': juryMember1,
    'jury-member-2': juryMember2,
  }
};

const collectionArrays = {
  criteria: [criteria1, criteria2, criteria3, criteria4, criteria5],
  jury: [juryMember1, juryMember2]
};

export function getContent<T>(collection: string, filename?: string): T {
  try {
    const collectionData = contentRegistry[collection as keyof typeof contentRegistry];
    
    if (!collectionData) {
      console.warn(`Collection "${collection}" not found`);
      return {} as T;
    }

    if (filename) {
      // Get specific file
      const content = collectionData[filename as keyof typeof collectionData];
      if (!content) {
        console.warn(`File "${filename}" not found in collection "${collection}"`);
        return {} as T;
      }
      return content as T;
    } else {
      // Get first/only file in collection (for single-item collections)
      const keys = Object.keys(collectionData);
      if (keys.length > 0) {
        return collectionData[keys[0] as keyof typeof collectionData] as T;
      }
    }
    
    console.warn(`No content found for collection: ${collection}`);
    return {} as T;
  } catch (error) {
    console.error(`Error loading content for ${collection}:`, error);
    return {} as T;
  }
}

export function getAllContent<T>(collection: string): T[] {
  try {
    const contents = collectionArrays[collection as keyof typeof collectionArrays];
    
    if (!contents) {
      console.warn(`Collection array "${collection}" not found`);
      return [];
    }
    
    return contents as T[];
  } catch (error) {
    console.error(`Error loading all content for ${collection}:`, error);
    return [];
  }
}