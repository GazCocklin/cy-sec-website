import * as XLSX from 'xlsx';

const getRiskColor = (riskRating) => {
  const risk = riskRating?.toLowerCase();
  switch (risk) {
    case 'critical':
      return 'FFFF0000';
    case 'high':
      return 'FFFFA500';
    case 'medium':
      return 'FFFFFF00';
    default:
      return null;
  }
};

export const exportToExcel = (apiData, fileName) => {
  if (!apiData || apiData.length === 0) {
    console.error("No data provided to exportToExcel");
    return;
  }
  
  const ws = XLSX.utils.json_to_sheet(apiData);

  try {
    const headers = Object.keys(apiData[0]);
    const riskRatingColIndex = headers.indexOf('Risk Rating');

    const colWidths = headers.map(key => ({
      wch: Math.max(
        key.length,
        ...apiData.map(row => (row[key] || "").toString().length)
      ) + 2
    }));
    ws['!cols'] = colWidths;
    
    if (riskRatingColIndex !== -1) {
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: riskRatingColIndex });
        if (!ws[cellRef]) continue;

        const riskRating = ws[cellRef].v;
        const fillColor = getRiskColor(riskRating);

        if (fillColor) {
          if (!ws[cellRef].s) ws[cellRef].s = {};
           ws[cellRef].s.fill = {
            patternType: "solid",
            bgColor: { rgb: fillColor },
          };
        }
      }
    }
  } catch (error) {
    console.error("Could not apply Excel styles:", error);
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Risks');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};