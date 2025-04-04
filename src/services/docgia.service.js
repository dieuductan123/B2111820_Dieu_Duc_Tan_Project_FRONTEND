import createAppClient from "./api.service";

class ReaderService {
  constructor(baseURL = "/api/reader") {
    this.api = createAppClient(baseURL);
  }
  async getAll(name) {
    if (!name) return (await this.api.get("/")).data;
    return (await this.api.get(`/?name=${name}`)).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.post(`${id}`, data)).data;
  }
  async login(data) {
    return (await this.api.post("/login", data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`${id}`)).data;
  }
}

export default new ReaderService();