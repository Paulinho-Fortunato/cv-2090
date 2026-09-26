import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
}

const defaultOptions: CompressionOptions = {
  maxSizeMB: 0.5, // 500KB
  maxWidthOrHeight: 800,
  useWebWorker: true,
};

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<string> {
  const compressionOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    return await convertToBase64(compressedFile);
  } catch (error) {
    console.error('Erro ao comprimir imagem:', error);
    // Fallback: converter sem compressão
    return await convertToBase64(file);
  }
}

export async function convertToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getImageSize(base64: string): string {
  const sizeInBytes = (base64.length * 3) / 4;
  if (sizeInBytes < 1024) return `${sizeInBytes.toFixed(2)} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
}
