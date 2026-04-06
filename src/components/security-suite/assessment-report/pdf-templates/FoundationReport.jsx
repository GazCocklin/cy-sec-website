import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3f51b5',
    borderBottom: '1px solid #ccc',
    paddingBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricTitle: {
    fontSize: 10,
  },
  riskItem: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 8,
    backgroundColor: '#fafafa',
    borderRadius: 3,
    borderLeft: '3px solid #ef5350'
  },
  riskText: {
    flex: 1,
  },
  riskScore: {
    color: '#ef5350',
    fontWeight: 'bold'
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
});

const FoundationReport = ({ assessment, responses, questions }) => {
  const getOrganisationName = () => assessment?.organisation_name || 'Your Organisation';

  const metrics = {
    compliant: responses.filter(r => r.score >= 80).length,
    highRisk: responses.filter(r => r.risk_rating === 'high' || r.risk_rating === 'critical').length,
    mediumRisk: responses.filter(r => r.risk_rating === 'medium').length,
    totalQuestions: responses.length,
  };

  const topRisks = responses
    .filter(r => r.score < 80)
    .sort((a, b) => (a.score || 0) - (b.score || 0))
    .slice(0, 5)
    .map(response => {
      const question = questions.find(q => q.id === response.question_id);
      return {
        ...response,
        questionText: question ? `${question.section_code}-${question.question_number}: ${question.question_text}` : 'Unknown Question',
      };
    });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{assessment.title}</Text>
            <Text style={styles.subtitle}>Framework: {assessment.compliance_frameworks?.name}</Text>
            <Text style={styles.subtitle}>For: {getOrganisationName()}</Text>
            <Text style={styles.subtitle}>Completed: {new Date(assessment.completion_date || assessment.updated_at).toLocaleDateString()}</Text>
          </View>
          <Image style={styles.logo} src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/73af02c03679056595565f438fd7a979.png" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.grid}>
            <View style={styles.metricCard}>
              <Text style={{ ...styles.metricValue, color: '#4caf50' }}>{assessment?.overall_score || 0}%</Text>
              <Text style={styles.metricTitle}>Overall Score</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={{ ...styles.metricValue, color: '#ef5350' }}>{metrics.highRisk}</Text>
              <Text style={styles.metricTitle}>High-Risk Items</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={{ ...styles.metricValue, color: '#ff9800' }}>{metrics.mediumRisk}</Text>
              <Text style={styles.metricTitle}>Medium-Risk Items</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{metrics.totalQuestions}</Text>
              <Text style={styles.metricTitle}>Total Controls Assessed</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top 5 Highest-Risk Controls</Text>
            {topRisks.length > 0 ? topRisks.map(risk => (
            <View key={risk.id} style={styles.riskItem}>
                <Text style={styles.riskText}>{risk.questionText}</Text>
                <Text style={styles.riskScore}>{risk.score}%</Text>
            </View>
            )) : <Text>No significant risks found. All controls are compliant.</Text>}
        </View>
        
        <Text style={styles.footer} fixed>
          Prepared by Cy-Sec Awareness and Consultancy's Security Suite.
        </Text>
      </Page>
    </Document>
  );
};

export default FoundationReport;