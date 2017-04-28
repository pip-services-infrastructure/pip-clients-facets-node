import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';
import { FacetV1 } from './FacetV1';
import { IFacetsClientV1 } from './IFacetsClientV1';
export declare class FacetsLambdaClientV1 extends CommandableLambdaClient implements IFacetsClientV1 {
    constructor(config?: any);
    getFacetsByGroup(correlationId: string, group: string, paging: PagingParams, callback: (err: any, page: DataPage<FacetV1>) => void): void;
    addFacet(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    removeFacet(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    deleteFacetsByGroup(correlationId: string, group: string, callback?: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
