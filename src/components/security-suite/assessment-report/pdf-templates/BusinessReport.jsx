import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
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
    marginBottom: 15,
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
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  halfCard: {
    width: '48%',
  },
  metricCard: {
    width: '23%',
    padding: 10,
    textAlign: 'center'
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricTitle: {
    fontSize: 8,
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
});

const getScoreColor = (score) => score >= 80 ? '#4caf50' : score >= 60 ? '#ff9800' : '#ef5350';

const BusinessReport = ({ assessment, responses, questions, reportData }) => {
  const getOrganisationName = () => assessment?.organisation_name || 'Your Organisation';

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

        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <View style={[styles.card, styles.section, {flexDirection: 'row', alignItems: 'center'}]}>
            <View style={{width: '25%', alignItems: 'center'}}>
                <Text style={{fontSize: 40, fontWeight: 'bold', color: getScoreColor(assessment?.overall_score || 0)}}>
                    {assessment?.overall_score || 0}%
                </Text>
                <Text>Overall Score</Text>
            </View>
            <View style={{width: '75%', flexDirection: 'row', justifyContent: 'space-around'}}>
                 <View style={styles.metricCard}>
                    <Text style={{...styles.metricValue, color: '#4caf50'}}>{metrics.compliant}</Text>
                    <Text style={styles.metricTitle}>Compliant Controls</Text>
                </View>
                <View style={styles.metricCard}>
                    <Text style={{...styles.metricValue, color: '#ef5350'}}>{metrics.highRisk}</Text>
                    <Text style={styles.metricTitle}>High-Risk Items</Text>
                </View>
                <View style={styles.metricCard}>
                    <Text style={{...styles.metricValue, color: '#ff9800'}}>{metrics.mediumRisk}</Text>
                    <Text style={styles.metricTitle}>Medium-Risk Items</Text>
                </View>
            </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compliance by Section</Text>
            <View style={styles.card}>
                {reportData?.sectionScores.map(section => (
                    <View key={section.name} style={{marginBottom: 8}}>
                        <Text style={{fontSize: 10, marginBottom: 2}}>{section.name} - {section.score}%</Text>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, {width: `${section.score}%`, backgroundColor: getScoreColor(section.score)}]}></View>
                        </View>
                    </View>
                ))}
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
          Prepared by Cy-Sec Awareness and Consultancy's FortifyOne.
        </Text>
      </Page>
    </Document>
  );
};

export default BusinessReport;