import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { fixTailwindColors } from "./helper";

/* ===========================
   CONSTANTS
=========================== */
const MB = 1024 * 1024;
const SIZE_LIMIT_MB = 18;

/* ===========================
   CORE GENERATOR
=========================== */
export const generatePDFFromElement = async function (
    element,
    filename,
    options
) {
  if (!filename) filename = "resume.pdf";
  if (!options) options = {};

  var quality =
      typeof options.quality === "number" ? options.quality : 0.92;

  var scale =
      typeof options.scale === "number"
          ? options.scale
          : Math.max(window.devicePixelRatio || 2, 4);

  var clone = null;

  try {
    /* ─────────────────────────────
       1. CLONE AT TRUE A4 SIZE
    ───────────────────────────── */
    clone = element.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = "-99999px";
    clone.style.top = "0";

    /* 🔑 CRITICAL FIX */
    clone.style.width = "210mm";
    clone.style.maxWidth = "210mm";
    clone.style.minWidth = "210mm";

    clone.style.height = "auto";
    clone.style.background = "#ffffff";
    clone.style.transform = "none";
    clone.style.zoom = "1";
    clone.style.overflow = "visible";

    document.body.appendChild(clone);

    /* Fix Tailwind oklch colors */
    fixTailwindColors(clone);

    /* Wait for layout & fonts */
    await new Promise(function (resolve) {
      requestAnimationFrame(function () {
        requestAnimationFrame(resolve);
      });
    });

    /* ─────────────────────────────
       2. RENDER FULL CANVAS
    ───────────────────────────── */
    var canvas = await html2canvas(clone, {
      scale: scale,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight
    });

    /* ─────────────────────────────
       3. SLICE INTO A4 PAGES
    ───────────────────────────── */
    var pdf = new jsPDF("p", "mm", "a4");

    var PAGE_W_MM = 210;
    var PAGE_H_MM = 297;

    var pxPerMM = canvas.width / PAGE_W_MM;
    var pageHeightPx = PAGE_H_MM * pxPerMM;

    var y = 0;
    var pageIndex = 0;

    while (y < canvas.height) {
      if (pageIndex > 0) {
        pdf.addPage();
      }

      var sliceHeight = Math.min(
          pageHeightPx,
          canvas.height - y
      );

      var slice = document.createElement("canvas");
      slice.width = canvas.width;
      slice.height = sliceHeight;

      var ctx = slice.getContext("2d");
      ctx.drawImage(
          canvas,
          0,
          y,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
      );

      var imgData = slice.toDataURL("image/jpeg", quality);
      var sliceHeightMM = sliceHeight / pxPerMM;

      pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          PAGE_W_MM,
          sliceHeightMM
      );

      y += sliceHeight;
      pageIndex++;
    }

    return pdf;
  } catch (err) {
    console.error("PDF generation failed:", err);
    throw err;
  } finally {
    if (clone && clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
  }
};

/* ===========================
   GENERATE BLOB (EMAIL)
=========================== */
export const generatePDFBlob = async function (element, options) {
  if (!options) options = {};

  var pdf = await generatePDFFromElement(
      element,
      "resume.pdf",
      options
  );

  var blob = pdf.output("blob");

  if (blob.size > SIZE_LIMIT_MB * MB) {
    pdf = await generatePDFFromElement(
        element,
        "resume.pdf",
        { quality: 0.75, scale: 1.8 }
    );
    blob = pdf.output("blob");
  }

  if (blob.size > SIZE_LIMIT_MB * MB) {
    pdf = await generatePDFFromElement(
        element,
        "resume.pdf",
        { quality: 0.65, scale: 1.4 }
    );
    blob = pdf.output("blob");
  }

  return blob;
};

/* ===========================
   DIRECT DOWNLOAD
=========================== */
export const downloadPDF = async function (
    element,
    filename,
    options
) {
  if (!filename) filename = "resume.pdf";
  if (!options) options = {};

  var pdf = await generatePDFFromElement(
      element,
      filename,
      options
  );

  pdf.save(
      filename.endsWith(".pdf")
          ? filename
          : filename + ".pdf"
  );
};