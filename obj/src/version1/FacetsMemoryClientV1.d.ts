import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IFacetsClientV1 } from './IFacetsClientV1';
import { FacetV1 } from './FacetV1';
export declare class FacetsMemoryClientV1 implements IFacetsClientV1 {
    protected _maxPageSize: number;
    private _items;
    getFacetsByGroup(correlationId: string, group: string, paging: PagingParams, callback: (err: any, page: DataPage<FacetV1>) => void): void;
    addFacet(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    removeFacet(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    deleteFacetsByGroup(correlationId: string, group: string, callback?: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
