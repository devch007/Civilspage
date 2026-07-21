import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { uploadToR2 } from '@/lib/r2';

// Folder routing based on query param
type UploadFolder = 'blogs' | 'current-affairs' | 'notes' | 'courses' | 'pyqs' | 'avatars' | 'misc';
const VALID_FOLDERS: UploadFolder[] = ['blogs', 'current-affairs', 'notes', 'courses', 'pyqs', 'avatars', 'misc'];

export async function POST(request: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────────
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    // Convert File to Buffer
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

// File size limit handled by next.config.ts serverActions.bodySizeLimit
