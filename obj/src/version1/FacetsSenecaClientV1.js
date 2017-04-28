"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class FacetsSenecaClientV1 extends pip_services_net_node_1.CommandableSenecaClient {
    constructor(config) {
        super('facets');
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
exports.FacetsSenecaClientV1 = FacetsSenecaClientV1;
//# sourceMappingURL=FacetsSenecaClientV1.js.map