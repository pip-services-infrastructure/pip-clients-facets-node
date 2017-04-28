import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { IFacetsClientV1 } from './IFacetsClientV1';
let _ = require('lodash');

import { FacetV1 } from './FacetV1';

export class FacetsMemoryClientV1 implements IFacetsClientV1 {
    protected _maxPageSize: number = 100;
    private _items: FacetV1[] = [];

    public getFacetsByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void {
        let items = _.filter(this._items, (item) => item.group == group && item.count > 0);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = items.length;
        
        if (skip > 0)
            items = _.slice(items, skip);
        items = _.take(items, take);
                
        let page = new DataPage<FacetV1>(items, total);
        callback(null, page);
    }

    public addFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item.count++;
        } else {
            item = new FacetV1(group, name, 1);
            this._items.push(item);
        }
        callback(null, item);
    }

    public removeFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item = item > 0 ? item - 1 : 0;
        } else {
            item = new FacetV1(group, name, 0);
            this._items.push(item);
        }
        callback(null, item);
    }

    public deleteFacetsByGroup(correlationId: string, group: string,
        callback?: (err: any) => void): void {
        this._items = _.filter(this._items, (item) => item.group != group);
        if (callback) callback(null);
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        this._items = [];
        if (callback) callback(null)
    }

}