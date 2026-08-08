export const calculateATSScore = (jdKeywords, resumeKeywords) => {
  const uniqueJD = [...new Set(jdKeywords)];

  if (uniqueJD.length === 0) return 0;

  const matches = uniqueJD.filter((k) => resumeKeywords.includes(k));

  return Math.round((matches.length / uniqueJD.length) * 100);
};
