"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class FacetsHttpClientV1 extends pip_services_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/facets');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getFacetsByGroup(correlationId, group, paging, callback) {
        this.callCommand('get_facets_by_group', correlationId, {
            group: group,
            paging: paging
        }, callback);
    }
    addFacet(correlationId, group, name, callback) {
        this.callCommand('add_facet', correlationId, {
            group: group,
            name: name
        }, callback);
    }
    removeFacet(correlationId, group, name, callback) {
        this.callCommand('remove_facet', correlationId, {
            group: group,
            name: name
        }, callback);
    }
    deleteFacetsByGroup(correlationId, group, callback) {
        this.callCommand('delete_facets_by_group', correlationId, {
            group: group
        }, callback);
    }
    clear(correlationId, callback) {
        this.callCommand('clear', correlationId, {}, callback);
    }
}
exports.FacetsHttpClientV1 = FacetsHttpClientV1;
//# sourceMappingURL=FacetsHttpClientV1.js.map