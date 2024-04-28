import { eq } from "drizzle-orm";
import db from "../db";
import { URLSchema } from "../db/schema/url";
import { CreateUrl, Url } from "../dtos/url";
import { UrlRepository } from "./urlRepository";

export class DrizzleUrlRepository implements UrlRepository {
  private _repository = db;

  async create(data: CreateUrl): Promise<CreateUrl | Error> {
    const newUrl = await this._repository
      .insert(URLSchema)
      .values(data)
      .returning();

    if (!newUrl) throw new Error("Error creating url");

    return newUrl[0];
  }
  async findAll(): Promise<Url[]> {
    return this._repository.select().from(URLSchema);
  }
  async findByUrlId(id: string): Promise<Url | null> {
    const url = await this._repository
      .select()
      .from(URLSchema)
      .where(eq(URLSchema.urlId, id));

    if (!url) return null;

    return url[0];
  }
  async findByUrl(url: string): Promise<Url | null> {
    const urlData = await this._repository
      .select()
      .from(URLSchema)
      .where(eq(URLSchema.url, url));

    if (!urlData) return null;

    return urlData[0];
  }
  async delete(data: string): Promise<string> {
    await this._repository.delete(URLSchema).where(eq(URLSchema.urlId, data));
    return "Deleted Successfully";
  }
}
