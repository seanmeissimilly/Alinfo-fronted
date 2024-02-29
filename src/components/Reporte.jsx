import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDF from "./PDF.jsx";
import React from "react";

function Reporte() {
    return (
        <div>
            <PDFDownloadLink document={<PDF />} fileName="myfirstpdf.pdf">
                {({ loading }) =>
                    loading ? (
                        <button>Cargando Documento ...</button>
                    ) : (
                        <button>Descargar PDF</button>
                    )
                }
            </PDFDownloadLink>
        </div>
    );
}

export default Reporte;
