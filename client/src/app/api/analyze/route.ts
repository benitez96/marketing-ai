import HttpService from "network/http";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
    const body = await request.json();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(body.url);
    // Extract the <head> content
    const metaTags = await page.evaluate(() => {
        // Select all <meta> tags in the <head> section
        const metaElements = Array.from(document.querySelectorAll('head meta'));

        // Extract meta tag attributes
        const metaTagsData = metaElements.map(meta => {
            const attributes: any = {};
            Array.from(meta.attributes).forEach((attribute: any) => {
                attributes[attribute.name] = attribute.value;
            });
            return attributes;
        });

        // Return the extracted meta tag data
        return metaTagsData;
    });
    const httpRequest = new HttpService().post<any>(`sessions/analyze_metadata`, { metadata: JSON.stringify(metaTags) })
    const resp = await httpRequest.request
    await browser.close();
    return Response.json(resp.data)
}
