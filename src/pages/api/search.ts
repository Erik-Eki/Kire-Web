export default async (req, res) => {
    const query = req.query.q;
  
    // Your search logic here. This could be a database search,
    // a search in your CMS, a call to a third-party search API, etc.
    // This will depend on how your site's data is structured.
    console.log("QUERY:",query)
    const results = {data: "ebin search results!"}//searchSite(query);
  
    res.status(200).send(results);
  };