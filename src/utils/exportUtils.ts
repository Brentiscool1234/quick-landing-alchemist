
export function generateTextFile(content: any, city: string, state: string, keywords: string[]): string {
  const keywordsText = keywords.join(', ');
  
  return `# ${keywords[0]} Services in ${city}, ${state}

Keywords: ${keywordsText}

## Introduction
${content.introduction}

## Why Choose Us
${content.whyUs}

## Things to Do in ${city}, ${state}
${content.thingsToDo}

## Frequently Asked Questions

${content.faq.map((item: any) => `### ${item.question}\n${item.answer}\n`).join('\n')}

Ready to Get Started? Contact us today to discuss your ${keywordsText} needs in ${city}, ${state}.
`;
}

export function generateHtmlFile(content: any, city: string, state: string, keywords: string[]): string {
  const keywordsText = keywords.join(', ');
  const keywordsMeta = keywords.join(', ');
  const title = `${keywords[0]} Services in ${city}, ${state}`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="${content.introduction.substring(0, 155)}">
  <meta name="keywords" content="${keywordsMeta}, ${city}, ${state}">
  
  <!-- Open Graph / Social Media Meta Tags -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${content.introduction.substring(0, 155)}">
  <meta property="og:type" content="website">
  
  <!-- Local Business Schema.org Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "${keywords[0]} Services",
    "description": "${content.introduction.substring(0, 155)}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${city}",
      "addressRegion": "${state}"
    },
    "geo": {
      "@type": "GeoCoordinates"
    }
  }
  </script>
  
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      font-size: 2em;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 1.5em;
      margin-top: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    h3 {
      font-size: 1.2em;
    }
    section {
      margin-bottom: 40px;
    }
    .keywords {
      margin: 15px 0;
      color: #666;
    }
    .faq-item {
      margin-bottom: 20px;
    }
    .cta {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
  </style>
</head>
<body>
  <header>
    <h1>${title}</h1>
    <div class="keywords">Keywords: ${keywordsText}</div>
  </header>
  
  <section id="introduction">
    <h2>Introduction</h2>
    <p>${content.introduction}</p>
  </section>
  
  <section id="why-us">
    <h2>Why Choose Us</h2>
    <p>${content.whyUs}</p>
  </section>
  
  <section id="things-to-do">
    <h2>Things to Do in ${city}, ${state}</h2>
    <p>${content.thingsToDo}</p>
  </section>
  
  <section id="faq">
    <h2>Frequently Asked Questions</h2>
    ${content.faq.map((item: any) => 
      `<div class="faq-item">
        <h3>${item.question}</h3>
        <p>${item.answer}</p>
      </div>`
    ).join('')}
  </section>
  
  <section id="cta" class="cta">
    <h2>Ready to Get Started?</h2>
    <p>Contact us today to discuss your ${keywordsText} needs in ${city}, ${state}.</p>
  </section>
  
  <footer>
    <p>© ${new Date().getFullYear()} ${keywords[0]} Services. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

export function downloadFile(content: string, filename: string): void {
  const element = document.createElement('a');
  const file = new Blob([content], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
