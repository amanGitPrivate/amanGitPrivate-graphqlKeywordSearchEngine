const { RESTDataSource } = require("apollo-datasource-rest");

class MvrpAPI extends RESTDataSource {
  // call api to fetch list of relevant keywords. 
  async getACar(queryString) {
    const queryStringParam = queryString.replace(/ /g, '+');
    const result = await this.get(`https://api.datamuse.com/words?ml=${queryStringParam}`);
    return result;
  }
};

exports.MvrpAPI = MvrpAPI;
