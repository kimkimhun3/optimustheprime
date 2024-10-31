// src/utils/markdownUtils.ts
export const fetchMarkdownFilesList = async (): Promise<string[]> => {
    const url = `https://api.github.com/repos/kimkimhun3/OptimusMarkDown/contents`; // Adjust as necessary
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch markdown files list');
    }
  
    const files = await response.json();
    return files
      .filter((file: { name: string; type: string }) => file.name.endsWith('.md') && file.type === 'file')
      .map((file: { name: string }) => file.name);
  };
  