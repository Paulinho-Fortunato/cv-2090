import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, X } from 'lucide-react';
import { useResumeStore } from '../../lib/store';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const resumeData = useResumeStore((state) => state.resumeData);

  useEffect(() => {
    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen]);

  const generateQRCode = async () => {
    try {
      // Codifica os dados do currículo na URL
      const encoded = btoa(encodeURIComponent(JSON.stringify(resumeData)));
      const url = `${window.location.origin}/#/builder?data=${encoded}`;

      const qrCode = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });

      setQrCodeUrl(qrCode);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `cv-qrcode-${resumeData.basics.fullName || 'curriculo'}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600" />
            QR Code do Currículo
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {qrCodeUrl ? (
            <>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-auto" />
              </div>

              <p className="text-sm text-gray-600 mb-4 text-center">
                Escaneie o QR Code para acessar o currículo online
              </p>

              <button
                onClick={downloadQRCode}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                Baixar QR Code
              </button>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Gerando QR Code...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
