import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { verifyAdminSession } from '@/lib/admin-auth';
import { logAudit } from '@/lib/audit';

type UploadFolder = 'blogs' | 'current-affairs' | 'notes' | 'courses' | 'pyqs' | 'mock-tests' | 'model-answers' | 'avatars' | 'misc';
const VALID_FOLDERS: UploadFolder[] = ['blogs', 'current-affairs', 'notes', 'courses', 'pyqs', 'mock-tests', 'model-answers', 'avatars', 'misc'];

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folderParam = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Size validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File exceeds maximum allowed size of 50MB' }, { status: 400 });
    }

    // MIME type validation
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json({ error: `File type ${file.type} is not permitted for upload.` }, { status: 400 });
    }

    const folder: UploadFolder = VALID_FOLDERS.includes(folderParam as UploadFolder)
      ? (folderParam as UploadFolder)
      : 'misc';

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToR2(buffer, file.name, file.type, folder);

    await logAudit({
      action: 'file.uploaded',
      resourceType: 'file',
      resourceTitle: file.name,
      metadata: { key: result.key, folder, size: result.size, type: result.contentType },
    });

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
