import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';

import { FacetV1 } from './FacetV1';
import { IFacetsClientV1 } from './IFacetsClientV1';

export class FacetsLambdaClientV1 extends CommandableLambdaClient implements IFacetsClientV1 {

    constructor(config?: any) {
        super('facets');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getFacetsByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void {
        this.callCommand(
            'get_facets_by_group',
            correlationId,
            {
                group: group,
                paging: paging
            },
            callback
        );
    }

    public addFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        this.callCommand(
            'add_facet',
            correlationId,
            {
                group: group,
                name: name
            },
            callback
        );
    }

    public removeFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        this.callCommand(
            'remove_facet',
            correlationId,
            {
                group: group,
                name: name
            },
            callback
        );
    }

    public deleteFacetsByGroup(correlationId: string, group: string,
        callback?: (err: any) => void): void {
        this.callCommand(
            'delete_facets_by_group',
            correlationId,
            {
                group: group
            },
            callback
        );
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        this.callCommand(
            'clear',
            correlationId,
            { },
            callback
        );
    }
    
}
