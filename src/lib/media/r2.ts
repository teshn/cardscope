export function buildR2PublicUrl(objectKey: string) {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL;
  if (!base) {
    return objectKey;
  }

  return `${base.replace(/\/$/, "")}/${objectKey.replace(/^\//, "")}`;
}
