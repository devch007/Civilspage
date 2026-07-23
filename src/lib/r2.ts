import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

// ── Client ─────────────────────────────────────────────────────────────────
// Hardcoded to bypass Vercel env var corruption (invisible unicode/newline chars
// get injected into the AWS Authorization header → Node throws ERR_INVALID_CHAR).
// Same fix applied to the Supabase URL/key.
const R2_ENDPOINT = 'https://891059bc2edd0482cf2cfade94a501e5.r2.cloudflarestorage.com';
const R2_ACCESS_KEY = '903e380188653f9d059cc12f774d4869';
const R2_SECRET_KEY = '0830e8d1c42438f722b49d2cd354d82b3cfb1bdda4d5489c0e8d0f93b75d489a';
const R2_BUCKET = 'civilspagebucket';
const R2_PUBLIC_URL = 'https://pub-9c3572c4a825401b8917e1fae30f7d98.r2.dev';

export const r2 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
});

const BUCKET = R2_BUCKET;
const PUBLIC_URL = R2_PUBLIC_URL;


// ── Allowed file types ────────────────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const ALLOWED_PDF_TYPES = ['application/pdf'];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_PDF_TYPES];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

// ── Folder mapping ────────────────────────────────────────────────────────────
type UploadFolder =
  | 'blogs'
  | 'current-affairs'
  | 'notes'
  | 'courses'
  | 'pyqs'
  | 'avatars'
  | 'misc';

function buildKey(folder: UploadFolder, originalName: string): string {
  const ext = originalName.split('.').pop()?.toLowerCase() ?? 'bin';
  return `${folder}/${randomUUID()}.${ext}`;
}

// ── Upload ────────────────────────────────────────────────────────────────────
export interface UploadResult {
  key: string;
  url: string;
  contentType: string;
  size: number;
}

export async function uploadToR2(
  file: Buffer,
  originalName: string,
  contentType: string,
  folder: UploadFolder = 'misc'
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(contentType)) {
    throw new Error(`File type "${contentType}" is not allowed. Allowed: ${ALLOWED_TYPES.join(', ')}`);
  }
  if (file.length > MAX_FILE_SIZE) {
    throw new Error(`File too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024} MB`);
  }

  const key = buildKey(folder, originalName);

  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType,
      // No ACL needed — R2 uses public URL domain for public access
    })
  );

  return {
    key,
    url: `${PUBLIC_URL}/${key}`,
    contentType,
    size: file.length,
  };
}

// ── Delete ────────────────────────────────────────────────────────────────────
export async function deleteFromR2(keyOrUrl: string): Promise<void> {
  // Accept either a full public URL or just the key
  const key = keyOrUrl.startsWith('http')
    ? keyOrUrl.replace(`${PUBLIC_URL}/`, '')
    : keyOrUrl;

  await r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

// ── Signed URL (time-limited private access) ──────────────────────────────────
export async function getSignedDownloadUrl(
  keyOrUrl: string,
  expiresInSeconds = 3600
): Promise<string> {
  const key = keyOrUrl.startsWith('http')
    ? keyOrUrl.replace(`${PUBLIC_URL}/`, '')
    : keyOrUrl;

  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(r2, command, { expiresIn: expiresInSeconds });
}

// ── Presigned upload URL (for direct browser → R2 upload) ────────────────────
export async function getPresignedUploadUrl(
  originalName: string,
  contentType: string,
  folder: UploadFolder = 'misc',
  expiresInSeconds = 300
): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  if (!ALLOWED_TYPES.includes(contentType)) {
    throw new Error(`File type "${contentType}" is not allowed`);
  }

  const { PutObjectCommand } = await import('@aws-sdk/client-s3');
  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

  const key = buildKey(folder, originalName);
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2, command, { expiresIn: expiresInSeconds });

  return {
    uploadUrl,
    key,
    publicUrl: `${PUBLIC_URL}/${key}`,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function isImage(contentType: string) {
  return ALLOWED_IMAGE_TYPES.includes(contentType);
}

export function isPdf(contentType: string) {
  return ALLOWED_PDF_TYPES.includes(contentType);
}

export function publicUrl(key: string) {
  return `${PUBLIC_URL}/${key}`;
}
