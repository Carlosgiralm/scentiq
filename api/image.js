export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'No query' });

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.GOOGLE_CX;

    if (!apiKey || !cx) {
      return res.status(200).json({ imageUrl: null });
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q)}&searchType=image&num=1&imgSize=medium&safe=active`;
    const response = await fetch(url);
    const data = await response.json();
    const imageUrl = data.items?.[0]?.link || null;
    return res.status(200).json({ imageUrl });
  } catch(e) {
    return res.status(200).json({ imageUrl: null });
  }
}
