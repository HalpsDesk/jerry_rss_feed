export default {
  async fetch(request, env, ctx) {
    const feedUrl = "https://jerrykendrick.com/feed/";

    try {
      const resp = await fetch(feedUrl);

      // Stream the response through, add CORS header
      return new Response(resp.body, {
        status: resp.status,
        headers: {
          "Content-Type":
            resp.headers.get("Content-Type") ||
            "application/xml; charset=utf-8",
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
