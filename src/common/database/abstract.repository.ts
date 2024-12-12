import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(
    document: Omit<TDocument, '_id' | 'created'>,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery:', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery:', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    page: number,
    pageSize: number,
    query?: string,
  ): Promise<TDocument[]> {
    const searchRegex = new RegExp(query, 'i');

    if (query) {
      filterQuery = {
        ...filterQuery,
        $or: [
          {
            name: searchRegex,
          },
          {
            number: searchRegex,
          },
          {
            project: searchRegex,
          },
        ],
      };
    }

    const skip = (page - 1) * pageSize;

    return await this.model
      .find(filterQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<TDocument[]>(true);
  }

  async getTotalPages(pageSize: number): Promise<number> {
    const count = await this.model.countDocuments();
    return Math.ceil(count / pageSize);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
