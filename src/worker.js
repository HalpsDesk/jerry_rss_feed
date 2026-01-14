export default {
  async fetch(request, env, ctx) {
    // WordPress REST API endpoint for recent posts
    const apiUrl =
      "https://jerrykendrick.com/wp-json/wp/v2/posts" +
      "?per_page=10&_fields=link,title,excerpt";

    try {
      const originResp = await fetch(apiUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json"
        }
      });

      const text = await originResp.text(); // keep as text, pass through as JSON

      return new Response(text, {
        status: originResp.status,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Error fetching posts" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};
