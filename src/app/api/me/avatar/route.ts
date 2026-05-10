import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = path.extname(file.name) || ".png";
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (!allowed.includes(ext.toLowerCase())) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
  await mkdir(uploadDir, { recursive: true });

  try {
    const files = await readdir(uploadDir);
    for (const f of files) {
      if (f.startsWith(`${session.user.id}-`)) {
        await unlink(path.join(uploadDir, f)).catch(() => {});
      }
    }
  } catch {
    // Ignore errors reading dir
  }

  const filename = `${session.user.id}-${Date.now()}${ext}`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  const url = `/uploads/avatars/${filename}`;

  return NextResponse.json({ url });
}
