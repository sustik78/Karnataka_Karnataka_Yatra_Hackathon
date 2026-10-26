async function waitForImage(image: HTMLImageElement): Promise<void> {
  if (!image.complete) {
    await new Promise<void>((resolve) => {
      const done = () => resolve();
      image.addEventListener("load", done, { once: true });
      image.addEventListener("error", done, { once: true });
    });
  }
  try {
    await image.decode();
  } catch {
    return;
  }
}

function waitForBackgroundImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = url;
  });
}

function backgroundImageUrls(root: HTMLElement): string[] {
  const urls = new Set<string>();
  [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))].forEach((element) => {
    const value = window.getComputedStyle(element).backgroundImage;
    const matches = value.matchAll(/url\(["']?([^"')]+)["']?\)/g);
    for (const match of matches) {
      if (match[1]) urls.add(match[1]);
    }
  });
  return Array.from(urls);
}

export async function exportItineraryPdf(root: HTMLElement, filename: string): Promise<void> {
  const pages = Array.from(root.querySelectorAll<HTMLElement>("[data-pdf-page]"));
  if (pages.length === 0) throw new Error("No PDF pages found");

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  await Promise.all([
    ...Array.from(root.querySelectorAll("img")).map(waitForImage),
    ...backgroundImageUrls(root).map(waitForBackgroundImage)
  ]);
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf")
  ]);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true
  });
  pdf.setProperties({
    title: "Karnataka Yatra Itinerary",
    subject: "A personal Karnataka travel itinerary",
    author: "Karnataka Yatra",
    creator: "Karnataka Yatra"
  });

  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index];
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#f8f3e8",
      width: page.scrollWidth,
      height: page.scrollHeight,
      windowWidth: page.scrollWidth,
      windowHeight: page.scrollHeight,
      scrollX: 0,
      scrollY: 0
    });
    const image = canvas.toDataURL("image/jpeg", 0.92);
    if (index > 0) pdf.addPage();
    pdf.addImage(image, "JPEG", 0, 0, 210, 297, undefined, "FAST");
  }

  pdf.save(filename);
}
