import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Read Cloudflare R2 variables from environment
const r2AccessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const r2SecretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const r2Endpoint = process.env.CLOUDFLARE_R2_ENDPOINT; // e.g. https://<accountid>.r2.cloudflarestorage.com
const r2BucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const r2PublicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || 'https://pub-placeholder.r2.dev';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique key name for R2 storage
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    // Verify if keys are provided before performing R2 connections
    if (!r2AccessKeyId || !r2SecretAccessKey || !r2Endpoint || !r2BucketName) {
      console.warn("Cloudflare R2 environment variables missing. Simulating mock upload to R2 bucket for:", file.name);
      
      // Simulate fake processing time
      await new Promise((resolve) => setTimeout(resolve, 800));

      const simulatedUrl = `${r2PublicDomain}/uploads/${uniqueName}`;
      return NextResponse.json({
        success: true,
        message: 'Mock file uploaded successfully to Cloudflare R2.',
        url: simulatedUrl,
        filename: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
    }

    // Initialize S3-compatible client for Cloudflare R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: r2Endpoint,
      credentials: {
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
      },
    });

    // Upload object configuration
    const uploadParams = {
      Bucket: r2BucketName,
      Key: uniqueName,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
    };

    // Execute upload
    await s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `${r2PublicDomain}/${uniqueName}`;
    return NextResponse.json({
      success: true,
      message: 'File successfully uploaded to Cloudflare R2.',
      url: fileUrl,
      filename: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    });

  } catch (error: any) {
    console.error('R2 upload router error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
