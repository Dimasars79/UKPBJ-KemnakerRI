/**
 * Utility helper to parse and convert Google Drive share links
 * into direct embeddable images and video stream players.
 */

export function extractGoogleDriveFileId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Pattern 1: https://drive.google.com/file/d/FILE_ID/...
  const match1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1 && match1[1]) return match1[1];

  // Pattern 2: https://drive.google.com/open?id=FILE_ID or https://drive.google.com/uc?id=FILE_ID
  const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2 && match2[1]) return match2[1];

  // Pattern 3: https://drive.google.com/d/FILE_ID
  const match3 = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match3 && match3[1]) return match3[1];

  return null;
}

export function parseGoogleDriveImage(url: string): { isDrive: boolean; directUrl: string; fileId: string | null } {
  if (!url) return { isDrive: false, directUrl: url, fileId: null };

  const fileId = extractGoogleDriveFileId(url);
  if (fileId) {
    // Fast & high-resolution Google User Content direct CDN link
    const directUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
    return { isDrive: true, directUrl, fileId };
  }

  return { isDrive: false, directUrl: url, fileId: null };
}

export function parseGoogleDriveVideo(url: string): { isDrive: boolean; embedUrl: string | null; thumbnailUrl: string | null; fileId: string | null } {
  if (!url) return { isDrive: false, embedUrl: null, thumbnailUrl: null, fileId: null };

  const fileId = extractGoogleDriveFileId(url);
  if (fileId) {
    return {
      isDrive: true,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      thumbnailUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      fileId
    };
  }

  return { isDrive: false, embedUrl: null, thumbnailUrl: null, fileId: null };
}
