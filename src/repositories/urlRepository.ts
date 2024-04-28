import { CreateUrl, Url } from "../dtos/url";

export interface UrlRepository {
  create(data: CreateUrl): Promise<CreateUrl | Error>;
  findAll(): Promise<Url[]>;
  findByUrlId(id: string): Promise<Url | null>;
  findByUrl(url: string): Promise<Url | null>;
  delete(data: string): Promise<string>;
}
