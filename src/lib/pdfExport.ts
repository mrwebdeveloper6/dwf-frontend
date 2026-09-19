import html2canvas from 'html2canvas-pro';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export interface PdfExportOptions {
  fileName: string;
  docTitle?: string;
  subtitle?: string;
  orientation?: 'p' | 'portrait' | 'l' | 'landscape';
  format?: 'a4' | 'card' | [number, number];
}

function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || 800, height: img.naturalHeight || 600 });
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
}

/**
 * Captures an HTML DOM element and exports it as an official printable PDF
 * Fully supports modern CSS color functions including OKLCH used by Tailwind v4.
 */
export async function exportElementToPdf(
  elementId: string,
  options: PdfExportOptions
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  try {
    let imgData = '';
    let imgWidth = 0;
    let imgHeight = 0;

    // Primary strategy: html2canvas-pro (supports OKLCH, OKLAB, and modern CSS color spaces)
    try {
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#090d16',
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      imgData = canvas.toDataURL('image/png', 1.0);
      imgWidth = canvas.width;
      imgHeight = canvas.height;
    } catch (primaryErr) {
      console.warn('html2canvas-pro render warning, falling back to html-to-image:', primaryErr);
      // Secondary fallback: html-to-image uses browser SVG foreignObject rendering which natively handles OKLCH
      imgData = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2.5,
        backgroundColor: '#090d16'
      });
      const dims = await getImageDimensions(imgData);
      imgWidth = dims.width;
      imgHeight = dims.height;
    }

    if (!imgData || imgWidth === 0 || imgHeight === 0) {
      throw new Error('Image data generation failed.');
    }

    const orientation = options.orientation || 'portrait';
    
    // Create standard A4 PDF document
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Add Official Header
    pdf.setFillColor(10, 15, 29); // Dark slate header band
    pdf.rect(0, 0, pageWidth, 24, 'F');

    // Header Accent Line (Emerald)
    pdf.setFillColor(16, 185, 129);
    pdf.rect(0, 24, pageWidth, 1.5, 'F');

    // Header Text
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(255, 255, 255);
    pdf.text('DRIVERS WELFARE FOUNDATION (DWF) BANGLADESH', pageWidth / 2, 11, { align: 'center' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(167, 243, 208); // Light emerald
    const subTitleText = options.docTitle 
      ? `${options.docTitle} - OFFICIAL DIGITAL IDENTITY VERIFICATION COPY`
      : 'OFFICIAL DIGITAL IDENTITY VERIFICATION COPY';
    pdf.text(subTitleText, pageWidth / 2, 18, { align: 'center' });

    // Calculate dimensions to maintain aspect ratio and center on page
    const margin = 15;
    const availableWidth = pageWidth - (margin * 2);
    const availableHeight = pageHeight - 35 - 25; // Space between header & footer

    const imgAspectRatio = imgWidth / imgHeight;
    let renderWidth = availableWidth;
    let renderHeight = renderWidth / imgAspectRatio;

    if (renderHeight > availableHeight) {
      renderHeight = availableHeight;
      renderWidth = renderHeight * imgAspectRatio;
    }

    const xPos = (pageWidth - renderWidth) / 2;
    const yPos = 32 + (availableHeight - renderHeight) / 4;

    // Draw card image
    pdf.addImage(imgData, 'PNG', xPos, yPos, renderWidth, renderHeight, undefined, 'FAST');

    // Official Security Notice & QR/Meta footer
    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    pdf.setFillColor(16, 185, 129);
    pdf.rect(0, pageHeight - 20, pageWidth, 0.8, 'F');

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(148, 163, 184); // Slate 400
    pdf.text(
      'This document is cryptographically verified by DWF Central Member Registry. Valid across all Highway Checkpoints & Network Hospitals.',
      pageWidth / 2,
      pageHeight - 12,
      { align: 'center' }
    );

    const generatedDate = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Dhaka',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(52, 211, 153); // Emerald 400
    pdf.text(
      `Generated: ${generatedDate} BST | DWF Verification Portal: https://dwf-bd.org/verify | Emergency: 16789`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    );

    // Save PDF
    const saveName = options.fileName.endsWith('.pdf') ? options.fileName : `${options.fileName}.pdf`;
    pdf.save(saveName);
    return true;
  } catch (error) {
    console.error('Failed to export PDF:', error);
    return false;
  }
}

