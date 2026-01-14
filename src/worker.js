export default {
  async fetch(request, env, ctx) {
    const feedUrl = "https://jerrykendrick.com/feed/";

    try {
      const originResp = await fetch(feedUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/rss+xml,application/xml;q=0.9,*/*;q=0.8"
        }
      });

      const text = await originResp.text();

      return new Response(text, {
        status: originResp.status,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (e) {
      return new Response("Error fetching feed", {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};
