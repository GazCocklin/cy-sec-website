import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#333',
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '2px solid #e5e5e5',
  },
  headerInfo: {
    flex: 1,
  },
  logo: {
    width: 120,
    height: 'auto',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  subtitle: {
    fontSize: 11,
    color: '#4b5563',
  },
  section: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    border: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
    borderBottom: '1px solid #d1d5db',
    paddingBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    padding: 10,
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricTitle: {
    fontSize: 9,
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  findingItem: {
    marginBottom: 5,
    padding: 8,
    border: '1px solid #eee',
    borderRadius: 3,
  },
  findingHeader: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  findingDetails: {
    fontSize: 9,
    marginTop: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: 'grey',
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  certificationText: {
    fontSize: 10,
    marginLeft: 5,
    color: '#166534',
    fontWeight: 'bold',
  },
});

const getScoreColor = (score) => score >= 80 ? '#16a34a' : score >= 60 ? '#f59e0b' : '#dc2626';

const VendorReport = ({ assessment, vendor, responses, questions, reportData }) => {
  const metrics = {
    compliant: responses.filter(r => r.score >= 80).length,
    highRisk: responses.filter(r => r.risk_rating === 'high' || r.risk_rating === 'critical').length,
    mediumRisk: responses.filter(r => r.risk_rating === 'medium').length,
    totalQuestions: responses.length,
  };

  const findings = responses.map(response => {
    const question = questions.find(q => q.id === response.question_id);
    return { ...response, question: question || {} };
  }).sort((a,b) => (a.score || 0) - (b.score || 0));
  
  const certifications = [
    { name: 'Cyber Essentials', certified: vendor.cyber_essentials },
    { name: 'Cyber Essentials +', certified: vendor.cyber_essentials_plus },
    { name: 'ISO 27001', certified: vendor.iso27001 },
  ].filter(c => c.certified);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>Vendor Risk Report: {vendor.name}</Text>
            <Text style={styles.subtitle}>Framework: {assessment.compliance_frameworks?.name}</Text>
            <Text style={styles.subtitle}>Completed: {new Date(assessment.completion_date || assessment.updated_at).toLocaleDateString()}</Text>
          </View>
          <Image style={styles.logo} src="/logos/cysec-logo.png" />
        </View>

        <View style={[styles.grid, { marginBottom: 15 }]}>
          <View style={[styles.section, { width: '35%' }]}>
            <Text style={styles.sectionTitle}>Overall Risk Score</Text>
            <Text style={{fontSize: 48, fontWeight: 'bold', textAlign: 'center', color: getScoreColor(assessment?.overall_score || 0)}}>
                {assessment?.overall_score || 0}%
            </Text>
          </View>
          <View style={[styles.section, { width: '63%' }]}>
            <Text style={styles.sectionTitle}>Key Metrics</Text>
            <View style={styles.grid}>
              <View style={styles.metricCard}>
                <Text style={{...styles.metricValue, color: '#16a34a'}}>{metrics.compliant}</Text>
                <Text style={{...styles.metricTitle, marginLeft: 8}}>Compliant Controls</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={{...styles.metricValue, color: '#dc2626'}}>{metrics.highRisk}</Text>
                <Text style={{...styles.metricTitle, marginLeft: 8}}>High-Risk Items</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={{...styles.metricValue, color: '#f59e0b'}}>{metrics.mediumRisk}</Text>
                <Text style={{...styles.metricTitle, marginLeft: 8}}>Medium-Risk Items</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{metrics.totalQuestions}</Text>
                <Text style={{...styles.metricTitle, marginLeft: 8}}>Total Controls</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.grid, { marginBottom: 15 }]}>
          <View style={[styles.section, { width: '63%' }]}>
            <Text style={styles.sectionTitle}>Risk Score by Section</Text>
            {reportData?.sectionScores.map(section => (
                <View key={section.name} style={{marginBottom: 8}}>
                    <Text style={{fontSize: 10, marginBottom: 2}}>{section.name} - {section.score}%</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, {width: `${section.score}%`, backgroundColor: getScoreColor(section.score)}]}></View>
                    </View>
                </View>
            ))}
          </View>
          <View style={[styles.section, { width: '35%' }]}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.length > 0 ? (
              certifications.map(cert => (
                <View key={cert.name} style={styles.certificationItem}>
                  <Text style={{color: '#166534'}}>✓</Text>
                  <Text style={styles.certificationText}>{cert.name}</Text>
                </View>
              ))
            ) : (
              <Text style={{fontSize: 10, color: '#6b7280'}}>No certifications declared.</Text>
            )}
          </View>
        </View>
        
        <View style={styles.section} break>
            <Text style={styles.sectionTitle}>Detailed Findings</Text>
            {findings.map(item => (
                <View key={item.id} style={[styles.findingItem, {borderLeftColor: getScoreColor(item.score), borderLeftWidth: 2}]}>
                    <Text style={styles.findingHeader}>{item.question.question_number}: {item.question.question_text}</Text>
                    <Text style={styles.findingDetails}>Response: {item.response_value} | Score: {item.score}% | Risk: {item.risk_rating}</Text>
                    {item.notes && <Text style={styles.findingDetails}>Notes: {item.notes}</Text>}
                </View>
            ))}
        </View>
        
        <Text style={styles.footer} fixed>
          Vendor Risk Report generated by Cy-Sec Awareness and Consultancy's FortifyOne.
        </Text>
      </Page>
    </Document>
  );
};

export default VendorReport;