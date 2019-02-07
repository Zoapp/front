export default class QueryParser {
  static parse(searchQuery) {
    const sq = decodeURI(searchQuery).substring(1); // Decode & Remove ? from searchString
    const searchParms = sq.split("&");
    const queryParams = {};
    searchParms.forEach((p) => {
      const [k, v] = p.split("=");
      queryParams[k] = v;
    });
    return queryParams;
  }
}
