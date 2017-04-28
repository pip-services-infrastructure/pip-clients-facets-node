"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const FacetV1_1 = require("./FacetV1");
class FacetsNullClientV1 {
    getFacetsByGroup(correlationId, group, paging, callback) {
        callback(null, new pip_services_commons_node_1.DataPage());
    }
    addFacet(correlationId, group, name, callback) {
        callback(null, new FacetV1_1.FacetV1(group, name, 1));
    }
    removeFacet(correlationId, group, name, callback) {
        callback(null, new FacetV1_1.FacetV1(group, name, 0));
    }
    deleteFacetsByGroup(correlationId, group, callback) {
        if (callback)
            callback(null);
    }
    clear(correlationId, callback) {
        if (callback)
            callback(null);
    }
}
exports.FacetsNullClientV1 = FacetsNullClientV1;
//# sourceMappingURL=FacetsNullClientV1.js.map