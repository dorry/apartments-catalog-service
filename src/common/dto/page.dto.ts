export class PageDto<T> {
  readonly data: T[];

  readonly meta: any;

  constructor(data: T[], meta: any) {
    this.data = data;
    this.meta = meta;
  }
}
