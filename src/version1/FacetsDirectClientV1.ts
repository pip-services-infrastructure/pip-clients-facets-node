import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { IFacetsClientV1 } from './IFacetsClientV1';
//import { IFacetsController } from 'pip-services-facets-node';
import { FacetV1 } from './FacetV1';

export class FacetsDirectClientV1 extends DirectClient<any> implements IFacetsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-facets", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getFacetsByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void {
        let timing = this.instrument(correlationId, 'facets.get_facets_by_group');
        this._controller.getFacetsByGroup(correlationId, group, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public addFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        let timing = this.instrument(correlationId, 'facets.add_facet');
        this._controller.addFacet(correlationId, group, name, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    public removeFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        let timing = this.instrument(correlationId, 'facets.remove_facet');
        this._controller.removeFacet(correlationId, group, name, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    public deleteFacetsByGroup(correlationId: string, group: string,
        callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'facets.delete_facats_by_group');
        this._controller.deleteFacetsByGroup(correlationId, group, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'facets.clear');
        this._controller.clear(correlationId, (err) => {
            timing.endTiming();
            if (callback) callback(err);
        });
    }

}