import { defaultDateFormat } from '@lib/constant/common';
import { FormInstance } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

export class $$ {
  public static appendPagination(path: string, page = 1, limit = 10) {
    return `${path}?page=${page}&limit=${limit}`;
  }

  public static isJwtExpired(tokens: number): boolean {
    const date: Date = new Date(tokens * 1000);
    const parsedDate = Date.parse(date.toString());
    if (parsedDate - Date.now() > 0) {
      return false;
    } else {
      return true;
    }
  }

  public static sort<T = any>(data: T[], sortBy: string, sortOrder: 'ASC' | 'DESC'): T[] {
    if (data?.length <= 0) return data;

    const sortByType = typeof data?.[0]?.[sortBy];

    if (sortByType === 'string') {
      if (sortOrder === 'ASC')
        return data.sort(function (a, b) {
          const textA = a[sortBy].toUpperCase();
          const textB = b[sortBy].toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

      return data.sort(function (a, b) {
        const textA = a[sortBy].toUpperCase();
        const textB = b[sortBy].toUpperCase();
        return textA < textB ? 1 : textA > textB ? -1 : 0;
      });
    }

    if (sortOrder === 'ASC') return data?.sort((a, b) => a[sortBy] - b[sortBy]);
    return data?.sort((a, b) => b[sortBy] - a[sortBy]);
  }

  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  public static isValidArray(value: any): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  public static isValidObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  public static toSafeValue(value: any): any {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return '';
  }

  public static randomString(length: number, type: 'lower' | 'upper' | 'numeric'): string {
    let result = '';
    const characters =
      type === 'lower'
        ? 'abcdefghijklmnopqrstuvwxyz'
        : type === 'upper'
          ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          : type === 'numeric'
            ? '0123456789'
            : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static isValidString(value: any): boolean {
    return typeof value === 'string' && value.length > 0;
  }

  public static isValidNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  public static isValidBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  //is not empty
  public static isNotEmpty(value: any): boolean {
    return (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === 'object' && Object.keys(value).length === 0)
    );
  }

  public static toNumber(value: any): number {
    return Number(value);
  }

  //safety convert to number
  public static toSafeNumber(value: any): number {
    if (this.isNotEmpty(value)) {
      return Number(value);
    }
    return 0;
  }

  //safety convert to string
  public static toSafeString(value: any): string {
    if (this.isNotEmpty(value)) {
      return value.toString();
    }
    return '';
  }

  public static toSafeObject(value: any): any {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return {};
  }

  //safety convert to boolean
  public static toBooleanSafe(value: any): boolean {
    if (this.isNotEmpty(value)) {
      return value.toString() === 'true';
    }
    return false;
  }

  public static findMax(array: number[]): number {
    return Math.max.apply(null, array);
  }

  public static findMin(array: number[]): number {
    return Math.min.apply(null, array);
  }

  public static findAverage(array: number[]): number {
    let sum = 0;
    for (const value of array) {
      sum += value;
    }
    return sum / array.length;
  }

  public static findMedian(array: number[]): number {
    const sorted = array.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  public static isEmpty(value: any): boolean {
    return (
      value === null ||
      value === 'null' ||
      value === undefined ||
      value === 'undefined' ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  }

  //to safe array
  public static toSafeArray(value: any): any[] {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return [];
  }

  public static toCleanArray<T = any>(array: T[]): T[] {
    return array.filter((x) => this.isNotEmpty(x));
  }

  public static clearObjectValues(obj: { [key: string]: any }): any {
    if (this.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        obj[key] = null;
      });
    }
    return obj;
  }

  public static toCleanObject<T extends Record<string, any>>(obj: T): T {
    if (this.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (this.isEmpty(obj[key])) {
          delete obj[key];
        }
      });
    }
    return this.toSafeObject(obj);
  }

  // Convert all `undefined` values to `null` recursively
  public static undefinedToNull<T = any>(data: T): T {
    if (this.isNullOrUndefined(data)) {
      return null;
    }
    if (Array.isArray(data)) {
      return data.map($$.undefinedToNull) as any;
    } else if (data !== null && typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, v === undefined ? null : $$.undefinedToNull(v)]),
      ) as T;
    }
    return data;
  }

  public static toQueryString(params: any): string {
    if (this.isValidObject(params)) {
      return Object.keys(params)
        .map((key) => {
          return key + '=' + params[key];
        })
        .join('&');
    }
    return '';
  }

  public static queryNormalizer = (options: any) => {
    const pureOption = this.toCleanObject(options);

    if (pureOption?.query) {
      return options.query;
    }
    const queries: any = [];
    Object.entries(pureOption).map(([key, value]: any) => {
      const valueType = Array.isArray(value) ? 'array' : typeof value;
      if (key === 'sort') {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else if (['includeRoles', 'excludeRoles', 'initialLoadIds', 'scoreRange'].includes(key)) {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else if (valueType === 'array' || key === 'filter') {
        return value.map((fOption) => {
          return queries.push(`${key}=${fOption}`);
        });
      } else if (valueType === 'object') {
        return queries.push(`${key}=${JSON.stringify(value)}`);
      } else {
        if (key == 'startDate') value = dayjs(value).startOf('day').toISOString();
        if (key == 'endDate') value = dayjs(value).endOf('day').toISOString();
        return queries.push(`${key}=${value}`);
      }
    });
    return queries.join('&');

    //   if (options?.query) {
    //     return options.query;
    //   }
    //   if (options) {
    //     const items = {};
    //     Object.keys(options).map((x) => {
    //       if (Boolean(options[x])) {
    //         items[x] = options[x];
    //       }
    //     });
    //     return Object.keys(items)
    //       .map((x) => {
    //         const propertyName = x;
    //         const propertyValue = items[x];
    //         const propertyValueType = typeof items[x];
    //         if (propertyValueType === 'object') {
    //           return `${propertyName}=${JSON.stringify(propertyValue)}`;
    //         } else {
    //           return `${propertyName}=${propertyValue}`;
    //         }
    //       })
    //       .join('&');
    //   }

    //   return '';
    // };
  };

  // is valid browser url
  public static isValidBrowserUrl(url: string): boolean {
    // check is string
    if (typeof url !== 'string') {
      return false;
    }
    return url?.startsWith('http://') || url?.startsWith('https://');
  }

  // check url ending extension
  public static isValidSvgUrl(url: string): boolean {
    // check is string
    if (typeof url !== 'string') {
      return false;
    }
    return url?.toLocaleLowerCase()?.endsWith('.svg');
  }

  // amount prefix with currency symbol
  public static withCurrency = (amount: number, symbol: string = '৳'): string => {
    return symbol + this.toSafeNumber(amount);
  };

  // purify data if json stringify object
  public static jsonParser = (data: any): any => {
    const r = this.isJsonString(data);
    return r ? JSON.parse(data) : data;
  };

  // is json string
  public static isJsonString = (str: string): boolean => {
    try {
      JSON.parse(str);
    } catch (_e) {
      return false;
    }
    return true;
  };

  // clean svg code from xml version tag
  public static cleanSvgCode = (svgCode: string): string => {
    return svgCode.replace(/<\?xml[^>]*>/g, '');
  };

  // get month end date from date
  public static getMonthStartDate = (date: Date | Dayjs = new Date()): Date => {
    return dayjs(date).startOf('month').toDate();
  };

  // get month end date from date
  public static getMonthEndDate = (date: Date | Dayjs = new Date()): Date => {
    return dayjs(date).endOf('month').toDate();
  };

  // get age
  public static getAge = (date: Date | Dayjs | string) => {
    return dayjs().diff(date, 'years');
  };

  public static toDayjs = (date: string): Dayjs => {
    return date ? dayjs(date) : null;
  };

  public static dayjsToStr = (date: string, format = defaultDateFormat): string => {
    return date ? dayjs(date).format(format) : null;
  };

  public static orderStatusBgColorGen = (status: string) => {
    switch (status) {
      case 'PLACED':
        return '#FFA500';
      case 'CONFIRMED':
        return '#2CADD6';
      case 'COMPLETED':
        return '#00AC26';
      case 'CANCELED':
        return '#D62C2C';
      default:
        return '#00AC26';
    }
  };
  public static convertObjectToArray(object) {
    const modifiedArray = [];

    for (const key in object) {
      const title = object[key];
      const item = { title: title, code: key };
      modifiedArray.push(item);
    }

    return modifiedArray;
  }

  public static addPrefixToObject<T = any>(prefix: string, object: T): T {
    const modifiedObject: Partial<{ [key: string]: string }> = {};
    for (const key in object) {
      modifiedObject[key] = prefix + object[key];
    }
    return modifiedObject as T;
  }
  public static generateSlug = (form: FormInstance, selector: string, target: string) => {
    const title = form.getFieldValue(selector);
    const sanitizedTitle = title?.replace(/[^a-zA-Z0-9\s]+/g, '');
    const trimmedTitle = sanitizedTitle?.trim();
    const slug = trimmedTitle?.toLowerCase().trim().replace(/\s+/g, '-').replace(/-+/g, '-').split("'").join('');
    form.setFieldValue(target, slug);
  };

  public static removeDuplicateObjectsById = (array) => {
    const ids = new Set();
    return array?.filter((obj) => (obj && ids?.has(obj?.id) ? false : ids?.add(obj?.id)));
  };

  public static parseQueryParams<T = any>(url: string): T {
    const queryString = url.split('?')[1];
    if (!queryString) return {} as T;

    const query = {};
    const pairs = queryString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value || '');

      if (!Number.isNaN(Number(value))) {
        if (query[decodedKey]) query[decodedKey] = [].concat(query[decodedKey], Number(value));
        else query[decodedKey] = Number(value);
      } else if (key === 'sort') {
        query[decodedKey] = JSON.parse(decodedValue);
      } else {
        if (query[decodedKey]) query[decodedKey] = [].concat(query[decodedKey], decodedValue);
        else query[decodedKey] = decodedValue;
      }
    }
    return query as T;
  }

  public static numberToWords(num: number): string {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = [
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];

    if (num === 0) return 'zero';

    function convertBelowThousand(n: number): string {
      let result = '';

      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + ' hundred';
        n %= 100;
        if (n !== 0) result += ' And ';
      }

      if (n >= 20) {
        result += tens[Math.floor(n / 10)];
        n %= 10;
        if (n !== 0) result += '-';
      }

      if (n > 0 && n < 10) {
        result += ones[n];
      } else if (n >= 10 && n < 20) {
        result += teens[n - 10];
      }

      return result;
    }

    if (num < 1000) {
      return convertBelowThousand(num);
    }

    const billions = Math.floor(num / 1e9);
    const millions = Math.floor((num % 1e9) / 1e6);
    const thousands = Math.floor((num % 1e6) / 1e3);
    const remainder = num % 1e3;

    let result = '';

    if (billions > 0) {
      result += convertBelowThousand(billions) + ' Billion ';
    }

    if (millions > 0) {
      result += convertBelowThousand(millions) + ' Million ';
    }

    if (thousands > 0) {
      result += convertBelowThousand(thousands) + ' Thousand ';
    }

    if (remainder > 0) {
      result += convertBelowThousand(remainder);
    }

    return result.trim();
  }
  public static getObjectPropertyName(object: object, value: string): string | null {
    for (const propertyName in object) {
      if (object[propertyName] === value) {
        return propertyName;
      }
    }
    return null; // Property name not found
  }
  public static groupBy(items, property: string) {
    return Object.values(
      items.reduce((acc, item) => {
        const key = item[property];
        if (!acc[key]) {
          acc[key] = { [property]: key, items: [] };
        }
        acc[key].items.push(item);
        return acc;
      }, {}),
    );
  }
  public static async asyncForEach<T = any>(array: T[], callback: (item: T, index: number, self: T[]) => void) {
    if (!Array.isArray(array)) {
      throw Error('Expected an array');
    }
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  public static printDoc(content: string) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };

    iframe.srcdoc = content;
  }
  public static toCleanProperty(property) {
    if (property) {
      return property;
    }
    return null;
  }

  public static toAllPropUndefined(object: { [key: string]: any }) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        object[key] = undefined;
      }
    }

    return object;
  }
  public static deepClone(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => $$.deepClone(item));
    }

    const clone = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = $$.deepClone(obj[key]);
      }
    }

    return clone;
  }

  public static camelCaseToCapitalize(text: string): string {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  public static toDeepProperty(data: { [key: string]: any } | any[], propertyPath: string): any {
    return propertyPath.split('.').reduce((acc, current) => {
      if (Array.isArray(acc)) {
        const idxMatch = current.match(/\[(\d+)\]/);

        if (idxMatch) {
          const idx = parseInt(idxMatch[1], 10);
          return acc[idx];
        } else {
          return acc.map((elem) => elem[current]);
        }
      } else {
        return acc && acc[current];
      }
    }, data);
  }

  public static groupByProperty(
    data: object[],
    propertyPath: string,
    propertyKeyword: string = '',
    searchPropertyPath: string = '',
    searchKeyword: string = '',
  ): object[] {
    return Object.values(
      data.reduce((acc, current) => {
        const propertyKey = $$.toDeepProperty(current, propertyPath);
        const searchPropertyKey = searchPropertyPath && $$.toDeepProperty(current, searchPropertyPath).toLowerCase();

        if (!acc[propertyKey]) acc[propertyKey] = { name: propertyKey, values: [] };

        const matchesProperty = !propertyKeyword || propertyKey === propertyKeyword;
        const matchesSearch =
          !searchPropertyPath || !searchKeyword || searchPropertyKey.includes(searchKeyword.toLowerCase());

        if (matchesProperty && matchesSearch) acc[propertyKey].values.push(current);

        return acc;
      }, {}),
    );
  }

  public static currentDay(): string {
    return dayjs().toISOString();
  }

  public static firstDayOfMonth(): string {
    return dayjs().startOf('month').toISOString();
  }

  public static clearFilter(query: { key: string }, notNullable: { x: string }) {
    return { ...notNullable, [notNullable.x]: null };
  }

  public static getHexCode = (themeColor: any): string => {
    if (typeof themeColor === 'string') {
      return themeColor;
    } else {
      return themeColor ? `#${themeColor.toHex()}` : '#2A2E6A';
    }
  };

  public static copyToClipboard = (text: string) => {
    let copiedText;
    async () => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard not supported');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        copiedText = text;
        return true;
      } catch (error) {
        console.warn('Copy failed', error);
        copiedText = null;
        return false;
      }
    };

    return copiedText;
  };

  public static getTimeSince(date) {
    const now = dayjs();
    const created = dayjs(date);

    const diffInSeconds = now.diff(created, 'second');
    const diffInMinutes = now.diff(created, 'minute');
    const diffInHours = now.diff(created, 'hour');
    const diffInDays = now.diff(created, 'day');

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
  }

  public static toPrettyText = (text: string): string => {
    return text
      ?.replace(/[_\-]/g, ' ')
      ?.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      ?.toLowerCase()
      ?.split(' ')
      ?.filter(Boolean)
      ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
      ?.join(' ');
  };

  public static toNullifyTraverse = <T = any>(obj: T): T => {
    const traverse = (item: any): any => {
      if (item instanceof Date || dayjs.isDayjs(item)) {
        return item;
      }

      if (Array.isArray(item)) {
        const cleanedArray = item.map(traverse).filter((val) => val !== null);
        return cleanedArray.length === 0 ? null : cleanedArray;
      }

      if (typeof item === 'object' && item !== null) {
        const cleanedObject: Record<string, any> = {};

        for (const [key, val] of Object.entries(item)) {
          const cleanedVal = traverse(val);
          cleanedObject[key] = cleanedVal;
        }

        const allValuesNull = Object.values(cleanedObject).every((v) => v === null);
        return allValuesNull ? null : cleanedObject;
      }

      if (item === '' || item === undefined) {
        return null;
      }

      return item;
    };

    return traverse(obj) as T;
  };

  public static computeArrayDiffs = <T = any>(
    initialArr: T[] = [],
    currentArr: T[] = [],
    key: keyof T,
  ): (T & { isDeleted?: boolean })[] => {
    const initialMap = new Map(initialArr.map((elem) => [elem[key], elem]));
    const currentMap = new Map(currentArr.map((elem) => [elem[key], elem]));

    const added = currentArr.filter((elem) => !initialMap.has(elem[key]));

    const updated = currentArr.filter((elem) => {
      const original = initialMap.get(elem[key]);
      return original && JSON.stringify(original) !== JSON.stringify(elem);
    });

    const deleted = initialArr
      .filter((elem) => !currentMap.has(elem[key]))
      .map((elem) => ({ ...elem, isDeleted: true }));

    return [...added, ...updated, ...deleted];
  };

  public static pickArrayFields = <T extends Record<string, any>, K extends keyof T>(
    items: T | T[],
    propsToKeep: K[],
  ): Pick<T, K> | Pick<T, K>[] => {
    const pickProps = (item: T): Pick<T, K> => {
      const sanitized = {} as Pick<T, K>;

      propsToKeep.forEach((prop) => {
        if (prop in item) sanitized[prop] = item[prop];
      });

      return sanitized;
    };

    return Array.isArray(items) ? items.map(pickProps) : pickProps(items);
  };
}
