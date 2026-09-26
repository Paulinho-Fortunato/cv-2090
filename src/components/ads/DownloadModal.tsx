import { useState, useEffect, useCallback } from 'react';
import { X, Download, Clock, Printer, Share2, CheckCircle, Shield, Eye } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { useAnalyticsStore } from '../../lib/analytics';
import { translations } from '../../types/resume';
import { TemplateSelector } from './TemplateSelector';
import { TemplateId } from '../../types/resume';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function calculateATSScore() {
  try {
    const { basics, experiences, education, projects, skills } = useResumeStore.getState().resumeData;
    let score = 0;
    const maxScore = 100;

    if (basics.fullName.trim()) score += 15;
    if (basics.headline.trim()) score += 10;
    if (basics.email.trim() && basics.email.includes('@')) score += 10;
    if (basics.phone.trim()) score += 5;
    if (basics.location.trim()) score += 5;
    if (basics.summary.trim().length > 50) score += 15;
    else if (basics.summary.trim().length > 20) score += 8;
    if (experiences.length > 0) {
      score += Math.min(20, experiences.length * 7);
      if (experiences.some((e) => e.description.length > 50)) score += 5;
    }
    if (education.length > 0) score += 10;
    if (projects.length > 0) score += 5;
    if (skills.length >= 5) score += 10;
    else if (skills.length >= 3) score += 7;
    else if (skills.length > 0) score += 4;

    return Math.min(score, maxScore);
  } catch (error) {
    console.error('Error calculating ATS score:', error);
    return 0;
  }
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [canDownload, setCanDownload] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const language = useResumeStore((state) => state.language);
  const theme = useResumeStore((state) => state.theme);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const t = translations[language];
  const isDark = theme === 'dark';

  const atsScore = isOpen ? calculateATSScore() : 0;

  const resetModal = useCallback(() => {
    setCountdown(5);
    setCanDownload(false);
    setShowShareLink(false);
    setShowPreview(false);
  }, []);

  useEffect(() => {
    if (!isOpen) { resetModal(); return; }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); setCanDownload(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, resetModal]);

  const handleTemplateSelect = (templateId: TemplateId) => {
    setTemplate(templateId);
  };

  // Função para validar e otimizar imagem antes de usar no PDF
  const validatePhoto = async (photoUrl: string): Promise<string | null> => {
    if (!photoUrl) return null;
    
    return new Promise((resolve) => {
      const img = new window.Image();
      
      // Timeout de 5 segundos
      const timeout = setTimeout(() => {
        console.warn('Timeout ao validar imagem do perfil');
        resolve(null);
      }, 5000);
      
      img.onload = () => {
        clearTimeout(timeout);
        
        // Criar canvas para otimizar a imagem
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(photoUrl);
          return;
        }
        
        // Tamanho ideal para PDF (200x200 para boa qualidade)
        const maxSize = 200;
        let width = img.width;
        let height = img.height;
        
        // Manter proporção
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Desenhar imagem no canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Converter para base64 com qualidade otimizada
        const optimizedPhoto = canvas.toDataURL('image/jpeg', 0.92);
        
        resolve(optimizedPhoto);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        console.warn('Foto do perfil inválida, será omitida do PDF');
        resolve(null);
      };
      
      img.src = photoUrl;
    });
  };

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import para evitar problemas de inicialização
      const { pdf, Document, Page, Text, View, Image, StyleSheet } = await import('@react-pdf/renderer');
      
      const { basics, experiences, education, certifications, projects, skills, photo } = useResumeStore.getState().resumeData;
      const currentTemplate = useResumeStore.getState().template;
      
      // Validar foto antes de usar
      const validPhoto = await validatePhoto(photo);

      // Estilos baseados no template selecionado
      const getStylesForTemplate = (template: string) => {
        const commonStyles = {
          page: { padding: 30, fontFamily: 'Helvetica' },
          headerContent: { flexDirection: 'row' as const, alignItems: 'center' },
          photo: { width: 64, height: 64, borderRadius: 32 },
          headerText: { flex: 1 },
          summary: { fontSize: 10, color: '#374151', lineHeight: 1.6 },
          expPosition: { fontSize: 11, fontWeight: 'bold' as const, color: '#111827' },
          expDate: { fontSize: 9, color: '#6b7280', marginTop: 2 },
        };

        switch (template) {
          case 'executive':
            return {
              ...commonStyles,
              header: { padding: 20, marginBottom: 15, borderBottomWidth: 2, borderBottomColor: '#000000' },
              photoContainer: { width: 64, height: 64, borderRadius: 32, marginRight: 15, borderWidth: 3, borderColor: '#000000', overflow: 'hidden' as const },
              name: { fontSize: 26, fontWeight: 'bold' as const, color: '#000000', letterSpacing: 1 },
              headline: { fontSize: 14, color: '#333333', marginTop: 4 },
              contactText: { fontSize: 10, color: '#333333', marginRight: 15 },
              sectionTitle: { fontSize: 12, fontWeight: 'bold' as const, color: '#000000', textTransform: 'uppercase' as const, marginBottom: 10, marginTop: 18, borderBottomWidth: 1, borderBottomColor: '#000000', paddingBottom: 4 },
              expItem: { marginBottom: 12, paddingLeft: 10, borderLeftWidth: 3, borderLeftColor: '#000000', backgroundColor: '#ffffff', paddingVertical: 8, paddingRight: 8, borderRadius: 4 },
              expCompany: { fontSize: 10, color: '#333333', fontWeight: 'medium' as const, marginTop: 2 },
            };

          case 'tech':
            return {
              ...commonStyles,
              header: { backgroundColor: '#1f2937', padding: 20, marginBottom: 15 },
              photoContainer: { width: 64, height: 64, borderRadius: 32, marginRight: 15, borderWidth: 3, borderColor: '#10b981', overflow: 'hidden' as const },
              name: { fontSize: 24, fontWeight: 'bold' as const, color: '#10b981', letterSpacing: 0.5 },
              headline: { fontSize: 12, color: '#9ca3af', marginTop: 4 },
              contactText: { fontSize: 10, color: '#9ca3af', marginRight: 15 },
              sectionTitle: { fontSize: 12, fontWeight: 'bold' as const, color: '#10b981', marginBottom: 10, marginTop: 18 },
              expItem: { marginBottom: 12, paddingLeft: 10, borderLeftWidth: 3, borderLeftColor: '#10b981', backgroundColor: '#f3f4f6', paddingVertical: 8, paddingRight: 8, borderRadius: 4 },
              expCompany: { fontSize: 10, color: '#10b981', fontWeight: 'medium' as const, marginTop: 2 },
            };

          case 'compact':
            return {
              page: { padding: 20, fontFamily: 'Helvetica' },
              headerContent: { flexDirection: 'row' as const, alignItems: 'center' },
              header: { backgroundColor: '#6b7280', padding: 15, marginBottom: 10 },
              photoContainer: { width: 48, height: 48, borderRadius: 24, marginRight: 10, borderWidth: 2, borderColor: '#ffffff', overflow: 'hidden' as const },
              photo: { width: 48, height: 48, borderRadius: 24 },
              headerText: { flex: 1 },
              name: { fontSize: 18, fontWeight: 'bold' as const, color: '#ffffff', letterSpacing: 0.5 },
              headline: { fontSize: 10, color: '#e5e7eb', marginTop: 2 },
              contactText: { fontSize: 8, color: '#e5e7eb', marginRight: 10 },
              sectionTitle: { fontSize: 10, fontWeight: 'bold' as const, color: '#374151', textTransform: 'uppercase' as const, marginBottom: 6, marginTop: 12 },
              summary: { fontSize: 8, color: '#374151', lineHeight: 1.4 },
              expItem: { marginBottom: 8, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: '#6b7280', paddingVertical: 4, paddingRight: 6 },
              expPosition: { fontSize: 9, fontWeight: 'bold' as const, color: '#111827' },
              expCompany: { fontSize: 8, color: '#6b7280', marginTop: 1 },
              expDate: { fontSize: 7, color: '#9ca3af', marginTop: 1 },
            };

          case 'creative':
            return {
              ...commonStyles,
              header: { backgroundColor: '#ec4899', padding: 20, marginBottom: 15 },
              photoContainer: { width: 64, height: 64, borderRadius: 32, marginRight: 15, borderWidth: 3, borderColor: '#ffffff', overflow: 'hidden' as const },
              name: { fontSize: 26, fontWeight: 'bold' as const, color: '#ffffff', letterSpacing: 0.5 },
              headline: { fontSize: 13, color: '#fce7f3', marginTop: 4 },
              contactText: { fontSize: 10, color: '#fce7f3', marginRight: 15 },
              sectionTitle: { fontSize: 12, fontWeight: 'bold' as const, color: '#ec4899', textTransform: 'uppercase' as const, marginBottom: 10, marginTop: 18, borderBottomWidth: 2, borderBottomColor: '#ec4899', paddingBottom: 4 },
              expItem: { marginBottom: 12, paddingLeft: 10, borderLeftWidth: 3, borderLeftColor: '#ec4899', backgroundColor: '#fdf2f8', paddingVertical: 8, paddingRight: 8, borderRadius: 4 },
              expCompany: { fontSize: 10, color: '#ec4899', fontWeight: 'medium' as const, marginTop: 2 },
            };

          case 'modern':
          default:
            return {
              ...commonStyles,
              header: { backgroundColor: '#2563eb', padding: 20, marginBottom: 15, borderBottomWidth: 3, borderBottomColor: '#1e40af' },
              photoContainer: { width: 64, height: 64, borderRadius: 32, marginRight: 15, borderWidth: 3, borderColor: '#ffffff', overflow: 'hidden' as const },
              name: { fontSize: 24, fontWeight: 'bold' as const, color: '#ffffff', letterSpacing: 0.5 },
              headline: { fontSize: 13, color: '#dbeafe', marginTop: 4 },
              contactText: { fontSize: 10, color: '#dbeafe', marginRight: 15 },
              sectionTitle: { fontSize: 12, fontWeight: 'bold' as const, color: '#1e40af', textTransform: 'uppercase' as const, marginBottom: 10, marginTop: 18, borderBottomWidth: 1, borderBottomColor: '#bfdbfe', paddingBottom: 4 },
              expItem: { marginBottom: 12, paddingLeft: 10, borderLeftWidth: 3, borderLeftColor: '#3b82f6', backgroundColor: '#f9fafb', paddingVertical: 8, paddingRight: 8, borderRadius: 4 },
              expCompany: { fontSize: 10, color: '#2563eb', fontWeight: 'medium' as const, marginTop: 2 },
            };
        }
      };

      const styles = StyleSheet.create(getStylesForTemplate(currentTemplate) as any);

      const formatDate = (date: string) => {
        if (!date) return '';
        const [year, month] = date.split('-');
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return `${months[parseInt(month) - 1]} ${year}`;
      };

      const doc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                {validPhoto && (
                  <View style={styles.photoContainer}>
                    <Image src={validPhoto} style={styles.photo} />
                  </View>
                )}
                <View style={styles.headerText}>
                  <Text style={styles.name}>{basics.fullName || 'Seu Nome'}</Text>
                  <Text style={styles.headline}>{basics.headline || ''}</Text>
                  <View style={{ flexDirection: 'row' as const, marginTop: 12, flexWrap: 'wrap' as const, gap: 12 }}>
                    {basics.email && <Text style={styles.contactText}>{basics.email}</Text>}
                    {basics.phone && <Text style={styles.contactText}>{basics.phone}</Text>}
                    {basics.location && <Text style={styles.contactText}>{basics.location}</Text>}
                  </View>
                </View>
              </View>
            </View>

            {basics.summary && (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>RESUMO PROFISSIONAL</Text>
                <Text style={styles.summary}>{basics.summary}</Text>
              </View>
            )}

            {experiences.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>EXPERIÊNCIA PROFISSIONAL</Text>
                {experiences.map((exp, i) => (
                  <View key={i} style={styles.expItem}>
                    <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.expPosition}>{exp.position}</Text>
                        <Text style={styles.expCompany}>{exp.company}</Text>
                      </View>
                      <Text style={styles.expDate}>
                        {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {exp.description && <Text style={styles.summary}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {education.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>FORMAÇÃO ACADÊMICA</Text>
                {education.map((edu, i) => (
                  <View key={i} style={styles.expItem}>
                    <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.expPosition}>{edu.degree} {edu.field ? `- ${edu.field}` : ''}</Text>
                        <Text style={styles.expCompany}>{edu.institution}</Text>
                      </View>
                      <Text style={styles.expDate}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {certifications && certifications.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>HABILITAÇÕES PROFISSIONAIS</Text>
                {certifications.map((cert, i) => (
                  <View key={i} style={styles.expItem}>
                    <View style={{ flexDirection: 'row' as const, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.expPosition}>{cert.name}</Text>
                        <Text style={styles.expCompany}>{cert.institution}</Text>
                      </View>
                      <Text style={styles.expDate}>
                        {formatDate(cert.date)}{cert.duration ? ` • ${cert.duration}` : ''}
                      </Text>
                    </View>
                    {cert.description && <Text style={styles.summary}>{cert.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {projects.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>PROJETOS</Text>
                {projects.map((proj, i) => (
                  <View key={i} style={styles.expItem}>
                    <Text style={styles.expPosition}>{proj.name}</Text>
                    {proj.technologies && <Text style={styles.expCompany}>{proj.technologies}</Text>}
                    {proj.description && <Text style={styles.summary}>{proj.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {skills.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>HABILIDADES</Text>
                <View style={{ flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 8 }}>
                  {(skills || []).map((skill, i) => (
                    <View 
                      key={i} 
                      style={{ 
                        backgroundColor: '#dbeafe', 
                        paddingHorizontal: 10, 
                        paddingVertical: 5, 
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#3b82f6'
                      }}
                    >
                      <Text style={{ fontSize: 9, color: '#1e40af', fontWeight: 'medium' }}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Page>
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'curriculo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Record download in analytics
      const { template } = useResumeStore.getState();
      const { resumeData } = useResumeStore.getState();
      const sectionsCount = [
        resumeData.basics.fullName,
        resumeData.basics.summary,
        (resumeData.experiences || []).length > 0,
        (resumeData.education || []).length > 0,
        (resumeData.projects || []).length > 0,
        (resumeData.skills || []).length > 0,
      ].filter(Boolean).length;

      useAnalyticsStore.getState().recordDownload({
        template,
        atsScore: atsScore,
        hasPhoto: !!resumeData.photo,
        sectionsCount,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erro ao gerar PDF: ' + (error as Error).message + '\nTente novamente ou use a opção de impressão (Ctrl+P).');
    }
  };

  const handleShare = async () => {
    try {
      const { resumeData } = useResumeStore.getState();
      const jsonString = JSON.stringify(resumeData);
      
      // Verificar se o payload é muito grande (> 1500 caracteres)
      if (jsonString.length > 1500) {
        alert(`Currículo muito grande para compartilhar via URL (${jsonString.length} caracteres).\n\nAlternativas:\n• Exportar como JSON (botão no menu lateral)\n• Imprimir como PDF\n• Remover algumas seções para reduzir o tamanho`);
        return;
      }
      
      const encoded = btoa(encodeURIComponent(jsonString));
      const url = `${window.location.origin}/#/builder?data=${encoded}`;
      
      // Tenta Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback: copia manualmente
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      
      setShowShareLink(true);
      setTimeout(() => setShowShareLink(false), 3000);
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Não foi possível copiar o link. Tente novamente.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return language === 'pt' ? 'Excelente' : 'Excellent';
    if (score >= 60) return language === 'pt' ? 'Bom' : 'Good';
    if (score >= 40) return language === 'pt' ? 'Regular' : 'Fair';
    return language === 'pt' ? 'Precisa melhorar' : 'Needs improvement';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Download className="w-5 h-5 text-blue-600" />
            {t.downloadPdf}
          </h3>
          <button onClick={onClose} className={`text-lg font-bold ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Template Selector */}
          <TemplateSelector onSelect={handleTemplateSelect} />

          {/* ATS Score */}
          <div className={`${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.atsScore}</span>
              </div>
              <span className={`text-lg font-bold ${getScoreColor(atsScore)}`}>{atsScore}/100</span>
            </div>
            <div className={`w-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${atsScore}%` }}
              />
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{getScoreLabel(atsScore)}</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {!canDownload ? (
              <div className="text-center py-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Aguarde {countdown} segundos...</span>
                </div>
                <div className={`w-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  {t.downloadPdf}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrint}
                    className={`flex-1 flex items-center justify-center gap-2 border py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isDark
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Printer className="w-4 h-4" />
                    {t.print}
                  </button>
                  <button
                    onClick={handleShare}
                    className={`flex-1 flex items-center justify-center gap-2 border py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                      isDark
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {showShareLink ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
                    {showShareLink ? t.copied : t.share}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
