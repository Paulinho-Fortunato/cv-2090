import { useState, useEffect, useCallback } from 'react';
import { X, Download, Clock, Printer, Share2, CheckCircle, Shield } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { useAnalyticsStore } from '../../lib/analytics';
import { translations } from '../../types/resume';

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
  const language = useResumeStore((state) => state.language);
  const t = translations[language];

  const atsScore = isOpen ? calculateATSScore() : 0;

  const resetModal = useCallback(() => {
    setCountdown(5);
    setCanDownload(false);
    setShowShareLink(false);
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

  const handleDownloadPDF = async () => {
    try {
      // Dynamic import para evitar problemas de inicialização
      const { pdf, Document, Page, Text, View, Image, StyleSheet } = await import('@react-pdf/renderer');
      
      const { basics, experiences, education, projects, skills, photo } = useResumeStore.getState().resumeData;

      const styles = StyleSheet.create({
        page: { padding: 30, fontFamily: 'Helvetica' },
        header: { backgroundColor: '#2563eb', padding: 20, marginBottom: 15 },
        headerContent: { flexDirection: 'row' as const, alignItems: 'center' },
        photo: { width: 60, height: 60, borderRadius: 30, marginRight: 15, borderWidth: 2, borderColor: '#ffffff' },
        headerText: { flex: 1 },
        name: { fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
        headline: { fontSize: 12, color: '#bfdbfe', marginTop: 4 },
        contactText: { fontSize: 9, color: '#dbeafe', marginRight: 15 },
        sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase' as const, marginBottom: 8, marginTop: 15 },
        summary: { fontSize: 9, color: '#374151', lineHeight: 1.5 },
        expItem: { marginBottom: 10, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: '#bfdbfe' },
        expPosition: { fontSize: 10, fontWeight: 'bold' as const, color: '#111827' },
        expCompany: { fontSize: 9, color: '#2563eb' },
        expDate: { fontSize: 8, color: '#6b7280' },
      });

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
                {photo && (
                  <Image src={photo} style={styles.photo} />
                )}
                <View style={styles.headerText}>
                  <Text style={styles.name}>{basics.fullName || 'Seu Nome'}</Text>
                  <Text style={styles.headline}>{basics.headline || ''}</Text>
                  <View style={{ flexDirection: 'row' as const, marginTop: 10, flexWrap: 'wrap' as const }}>
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
                <Text style={styles.sectionTitle}>EXPERIENCIA PROFISSIONAL</Text>
                {experiences.map((exp, i) => (
                  <View key={i} style={styles.expItem}>
                    <Text style={styles.expPosition}>{exp.position}</Text>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    <Text style={styles.expDate}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                    </Text>
                    {exp.description && <Text style={styles.summary}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {education.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>FORMACAO ACADEMICA</Text>
                {education.map((edu, i) => (
                  <View key={i} style={styles.expItem}>
                    <Text style={styles.expPosition}>{edu.degree} {edu.field ? `- ${edu.field}` : ''}</Text>
                    <Text style={styles.expCompany}>{edu.institution}</Text>
                    <Text style={styles.expDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
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
                <Text style={styles.summary}>{(skills || []).join(', ')}</Text>
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
      alert('Erro ao gerar PDF. Tente usar a opção de impressão (Ctrl+P) e salvar como PDF.');
    }
  };

  const handleShare = () => {
    try {
      const { resumeData } = useResumeStore.getState();
      const encoded = btoa(encodeURIComponent(JSON.stringify(resumeData)));
      const url = `${window.location.origin}/#/builder?data=${encoded}`;
      navigator.clipboard.writeText(url);
      setShowShareLink(true);
      setTimeout(() => setShowShareLink(false), 3000);
    } catch (error) {
      console.error('Error sharing:', error);
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
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            {t.downloadPdf}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* ATS Score */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{t.atsScore}</span>
              </div>
              <span className={`text-lg font-bold ${getScoreColor(atsScore)}`}>{atsScore}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${atsScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{getScoreLabel(atsScore)}</p>
          </div>

          {/* Ad Space */}
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg h-[200px] flex items-center justify-center mb-4">
            <span className="text-sm text-gray-400">Espaço Publicitário (336x280)</span>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {!canDownload ? (
              <div className="text-center py-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                  <span className="text-sm text-gray-600">Aguarde {countdown} segundos...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
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
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Printer className="w-4 h-4" />
                    {t.print}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
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
