import { promises as fs } from 'fs';
import path from 'path';

export async function getContent<T>(collection: string, filename?: string): Promise<T> {
  try {
    const contentPath = path.join(process.cwd(), 'content', collection);
    
    if (filename) {
      // Get specific file
      const filePath = path.join(contentPath, `${filename}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } else {
      // Get first file in directory (for single-item collections)
      const files = await fs.readdir(contentPath);
      const jsonFiles = files.filter(f => f.endsWith('.json'));
      
      if (jsonFiles.length > 0) {
        const filePath = path.join(contentPath, jsonFiles[0]);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
      }
    }
    
    throw new Error(`No content found for collection: ${collection}`);
  } catch (error) {
    console.error(`Error loading content for ${collection}:`, error);
    // Return default/fallback content
    return {} as T;
  }
}

export async function getAllContent<T>(collection: string): Promise<T[]> {
  try {
    const contentPath = path.join(process.cwd(), 'content', collection);
    const files = await fs.readdir(contentPath);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    const contents = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(contentPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
      })
    );
    
    return contents;
  } catch (error) {
    console.error(`Error loading all content for ${collection}:`, error);
    return [];
  }
}