import { useState, useEffect, useCallback } from 'react';
import { X, Download, Clock } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    marginBottom: 15,
    borderRadius: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headline: {
    fontSize: 12,
    color: '#bfdbfe',
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 15,
  },
  contactText: {
    fontSize: 9,
    color: '#dbeafe',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
    paddingBottom: 4,
  },
  summary: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
  expItem: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#bfdbfe',
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expPosition: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  expCompany: {
    fontSize: 9,
    color: '#2563eb',
    fontWeight: 'medium',
  },
  expDate: {
    fontSize: 8,
    color: '#6b7280',
  },
  expDescription: {
    fontSize: 8,
    color: '#4b5563',
    marginTop: 3,
    lineHeight: 1.4,
  },
  eduItem: {
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#bfdbfe',
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  eduInstitution: {
    fontSize: 9,
    color: '#2563eb',
  },
  eduDate: {
    fontSize: 8,
    color: '#6b7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillBadge: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  skillText: {
    fontSize: 8,
    color: '#1d4ed8',
  },
});

function formatDate(date: string) {
  if (!date) return '';
  const [year, month] = date.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

function ResumeDocument() {
  const { basics, experiences, education, skills } = useResumeStore.getState().data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{basics.fullName || 'Seu Nome'}</Text>
          <Text style={styles.headline}>{basics.headline || ''}</Text>
          <View style={styles.contactRow}>
            {basics.email && <Text style={styles.contactText}>{basics.email}</Text>}
            {basics.phone && <Text style={styles.contactText}>{basics.phone}</Text>}
            {basics.location && <Text style={styles.contactText}>{basics.location}</Text>}
          </View>
        </View>

        {basics.summary && (
          <>
            <Text style={styles.sectionTitle}>Resumo Profissional</Text>
            <Text style={styles.summary}>{basics.summary}</Text>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Experiencia Profissional</Text>
            {experiences.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.expPosition}>{exp.position}</Text>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                  </View>
                  <Text style={styles.expDate}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                  </Text>
                </View>
                {exp.description && <Text style={styles.expDescription}>{exp.description}</Text>}
              </View>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Formacao Academica</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.eduDegree}>
                      {edu.degree} {edu.field ? `- ${edu.field}` : ''}
                    </Text>
                    <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  </View>
                  <Text style={styles.eduDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, i) => (
                <View key={i} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [canDownload, setCanDownload] = useState(false);

  const resetModal = useCallback(() => {
    setCountdown(5);
    setCanDownload(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetModal();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanDownload(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, resetModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            Baixar Currículo em PDF
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Ad Space */}
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg h-[280px] flex items-center justify-center mb-6">
            <span className="text-sm text-gray-400">Espaço Publicitário (336x280)</span>
          </div>

          {/* Countdown */}
          {!canDownload ? (
            <div className="text-center py-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                <span className="text-sm text-gray-600">
                  Aguarde {countdown} segundos...
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <PDFDownloadLink
                document={<ResumeDocument />}
                fileName="curriculo.pdf"
                className="inline-flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Baixar PDF Agora
              </PDFDownloadLink>
              <p className="text-xs text-gray-500 mt-3">
                Seu currículo será baixado em formato PDF
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
