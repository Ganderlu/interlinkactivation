import { NextResponse } from "next/server";
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isCloudinaryConfigured) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file was provided." },
        { status: 400 },
      );
    }

    // Validate file type (images only)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 },
      );
    }

    // Validate file size (max 5 MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 5 MB." },
        { status: 400 },
      );
    }

    // Convert File to a base64 data URI for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "itl-redemptions",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [
        { width: 1200, crop: "limit", quality: "auto" },
      ],
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      bytes: result.bytes,
      format: result.format,
    });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return NextResponse.json(
      { error: "We couldn't upload your file. Please try again." },
      { status: 500 },
    );
  }
}
