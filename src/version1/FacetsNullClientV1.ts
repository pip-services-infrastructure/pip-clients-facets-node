import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { IFacetsClientV1 } from './IFacetsClientV1';
import { FacetV1 } from './FacetV1';

export class FacetsNullClientV1 implements IFacetsClientV1 {

    public getFacetsByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void {
        callback(null, new DataPage<FacetV1>());
    }

    public addFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        callback(null, new FacetV1(group, name, 1));
    }

    public removeFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        callback(null, new FacetV1(group, name, 0));
    }

    public deleteFacetsByGroup(correlationId: string, group: string,
        callback?: (err: any) => void): void {
        if (callback) callback(null)
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        if (callback) callback(null)
    }

}