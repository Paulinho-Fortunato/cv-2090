// Compressão de imagens usando Canvas API
// Reduz tamanho do arquivo mantendo qualidade aceitável

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<string> {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.8,
    mimeType = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calcular novas dimensões mantendo proporção
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Criar canvas e desenhar imagem redimensionada
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Não foi possível criar contexto do canvas'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Converter para base64 com compressão
        const compressedBase64 = canvas.toDataURL(mimeType, quality);
        resolve(compressedBase64);
      };

      img.onerror = () => {
        reject(new Error('Erro ao carregar imagem'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };

    reader.readAsDataURL(file);
  });
}

// Função utilitária para obter tamanho do arquivo em KB
export function getFileSizeInKB(base64String: string): number {
  const base64Length = base64String.length;
  const sizeInBytes = (base64Length * 3) / 4;
  return Math.round(sizeInBytes / 1024);
}

// Função para validar arquivo de imagem
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Formato não suportado. Use JPG ou PNG.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Arquivo muito grande. Máximo 5MB.',
    };
  }

  return { valid: true };
}
