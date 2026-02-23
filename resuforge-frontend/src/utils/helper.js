import moment from "moment";
import {toJpeg} from "html-to-image";

/* -----------------------------
   Email validation
-------------------------------- */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/* -----------------------------
   Get lightest average RGB color from image
-------------------------------- */
export const getLightColorFromImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        if (!imageUrl || typeof imageUrl !== "string") {
            return reject(new Error("Invalid image URL"));
        }

        const img = new Image();

        if (!imageUrl.startsWith("data:")) {
            img.crossOrigin = "anonymous";
        }

        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            let r = 0,
                g = 0,
                b = 0,
                count = 0;

            for (let i = 0; i < imageData.length; i += 4) {
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];
                const brightness = (red + green + blue) / 3;

                if (brightness > 180) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }

            if (count === 0) {
                resolve("#ffffff");
            } else {
                resolve(
                    `rgb(${Math.round(r / count)}, ${Math.round(
                        g / count
                    )}, ${Math.round(b / count)})`
                );
            }
        };

        img.onerror = () => {
            reject(new Error("Image could not be loaded (CORS or network issue)."));
        };
    });
};

/* -----------------------------
   Format YYYY-MM → MMM YYYY
-------------------------------- */
export const formatYearMonth = (yearMonth) => {
    return yearMonth
        ? moment(yearMonth, "YYYY-MM").format("MMM YYYY")
        : "";
};

/* -----------------------------
   SAFETY NET (kept, but not primary fix)
-------------------------------- */
export const fixTailwindColors = (rootElement) => {
    if (!rootElement) return;

    rootElement.querySelectorAll("*").forEach((el) => {
        const style = window.getComputedStyle(el);

        [
            "color",
            "backgroundColor",
            "borderColor",
            "outlineColor",
            "textDecorationColor",
            "fill",
            "stroke",
        ].forEach((prop) => {
            const value = style[prop];
            if (
                typeof value === "string" &&
                (value.includes("oklch") || value.includes("oklab"))
            ) {
                el.style[prop] = "rgb(0,0,0)";
            }
        });
    });
};

export const captureElementAsImage = async (element) => {
    if (!element) throw new Error("No element provided");

    return await toJpeg(element, {
        backgroundColor: "#ffffff",
        quality: 0.45,      // reduces size
        pixelRatio: 0.8,     //prevents huge images
    });
};/* -----------------------------
   Convert base64 → File
-------------------------------- */
export const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], fileName, {type: mime});
};