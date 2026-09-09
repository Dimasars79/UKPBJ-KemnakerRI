import { supabase } from './client';

/**
 * Uploads a document (PDF, DOCX, ZIP, etc.) to the 'documents' Supabase Storage bucket
 * and returns the public CDN URL and file metadata.
 */
export async function uploadDocument(
  file: File, 
  folder: 'sop' | 'pengadaan' | 'regulasi' | 'documents' = 'documents'
): Promise<{
  publicUrl: string;
  fileName: string;
  fileSize: string;
  error?: string;
}> {
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase Storage Document Upload Error:', uploadError);
      return { publicUrl: '', fileName: file.name, fileSize: '', error: uploadError.message };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    return {
      publicUrl,
      fileName: file.name,
      fileSize: sizeStr
    };
  } catch (err) {
    console.error('Unexpected Storage Upload Error:', err);
    return { 
      publicUrl: '', 
      fileName: file.name, 
      fileSize: '', 
      error: err instanceof Error ? err.message : 'Gagal upload dokumen' 
    };
  }
}

/**
 * Uploads an image/media file to the 'media' Supabase Storage bucket
 * and returns the public CDN URL.
 */
export async function uploadMedia(
  file: File, 
  folder: 'news' | 'gallery' | 'thumbnails' = 'gallery'
): Promise<{
  publicUrl: string;
  error?: string;
}> {
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase Storage Media Upload Error:', uploadError);
      return { publicUrl: '', error: uploadError.message };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return { publicUrl };
  } catch (err) {
    console.error('Unexpected Media Upload Error:', err);
    return { 
      publicUrl: '', 
      error: err instanceof Error ? err.message : 'Gagal upload media' 
    };
  }
}
