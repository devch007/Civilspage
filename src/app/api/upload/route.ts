import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';

// Folder routing based on query param
type UploadFolder = 'blogs' | 'current-affairs' | 'notes' | 'courses' | 'pyqs' | 'avatars' | 'misc';
const VALID_FOLDERS: UploadFolder[] = ['blogs', 'current-affairs', 'notes', 'courses', 'pyqs', 'avatars', 'misc'];

/**
 * POST /api/upload
 * Auth is enforced by the Next.js middleware (redirects unauthenticated users
 * before they can reach the /login/* admin pages that call this route).
 * We intentionally skip any Supabase/header-based auth here to avoid the
 * "Invalid character in header content" Node.js error caused by JWT tokens
 * containing characters that are illegal in HTTP headers.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folderParam = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const folder: UploadFolder = VALID_FOLDERS.includes(folderParam as UploadFolder)
      ? (folderParam as UploadFolder)
      : 'misc';

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToR2(buffer, file.name, file.type, folder);

    return NextResponse.json({
      url: result.url,
      key: result.key,
      contentType: result.contentType,
      size: result.size,
    });
  } catch (err: any) {
    console.error('[R2 Upload Error]', err);
    return NextResponse.json(
      { error: err.message ?? 'Upload failed' },
      { status: 400 }
    );
  }
}
