"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class FacetsDirectClientV1 extends pip_services_net_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services_commons_node_2.Descriptor("pip-services-facets", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getFacetsByGroup(correlationId, group, paging, callback) {
        let timing = this.instrument(correlationId, 'facets.get_facets_by_group');
        this._controller.getFacetsByGroup(correlationId, group, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    addFacet(correlationId, group, name, callback) {
        let timing = this.instrument(correlationId, 'facets.add_facet');
        this._controller.addFacet(correlationId, group, name, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    removeFacet(correlationId, group, name, callback) {
        let timing = this.instrument(correlationId, 'facets.remove_facet');
        this._controller.removeFacet(correlationId, group, name, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    deleteFacetsByGroup(correlationId, group, callback) {
        let timing = this.instrument(correlationId, 'facets.delete_facats_by_group');
        this._controller.deleteFacetsByGroup(correlationId, group, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
    clear(correlationId, callback) {
        let timing = this.instrument(correlationId, 'facets.clear');
        this._controller.clear(correlationId, (err) => {
            timing.endTiming();
            if (callback)
                callback(err);
        });
    }
}
exports.FacetsDirectClientV1 = FacetsDirectClientV1;
//# sourceMappingURL=FacetsDirectClientV1.js.map