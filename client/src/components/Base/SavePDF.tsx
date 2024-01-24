import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import { FaDownload } from "react-icons/fa";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const BasePDF = ({ base }: { base: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{base.name}</Text>
        <Text>{base.region}</Text>
        <Text>{base.location.latitude}</Text>
        <Text>{base.location.longitude}</Text>
        <Text>{base.missiles}</Text>
      </View>
    </Page>
  </Document>
);

const SavePDF = ({ base }: { base: any }) => {
  return (
    <PDFDownloadLink
      document={<BasePDF base={base} />}
      fileName={`${base.name}.pdf`}
      className="bg-violet-800 hover:bg-violet-900 text-white font-semibold p-1.5 rounded shadow"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : <FaDownload className="text-lg" />
      }
    </PDFDownloadLink>
  );
};

export default SavePDF;
