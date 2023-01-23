export default interface NewsArticle {
  author: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  source: { name: string };
  url: string;
  urlToImage: string;
}
