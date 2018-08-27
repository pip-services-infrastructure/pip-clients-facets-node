"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const FacetsNullClientV1_1 = require("../version1/FacetsNullClientV1");
const FacetsDirectClientV1_1 = require("../version1/FacetsDirectClientV1");
const FacetsHttpClientV1_1 = require("../version1/FacetsHttpClientV1");
const FacetsSenecaClientV1_1 = require("../version1/FacetsSenecaClientV1");
class FacetsClientFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(FacetsClientFactory.NullClientV1Descriptor, FacetsNullClientV1_1.FacetsNullClientV1);
        this.registerAsType(FacetsClientFactory.DirectClientV1Descriptor, FacetsDirectClientV1_1.FacetsDirectClientV1);
        this.registerAsType(FacetsClientFactory.HttpClientV1Descriptor, FacetsHttpClientV1_1.FacetsHttpClientV1);
        this.registerAsType(FacetsClientFactory.SenecaClientV1Descriptor, FacetsSenecaClientV1_1.FacetsSenecaClientV1);
    }
}
FacetsClientFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-facets', 'factory', 'default', 'default', '1.0');
FacetsClientFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-facets', 'client', 'null', 'default', '1.0');
FacetsClientFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-facets', 'client', 'direct', 'default', '1.0');
FacetsClientFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-facets', 'client', 'http', 'default', '1.0');
FacetsClientFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-facets', 'client', 'seneca', 'default', '1.0');
exports.FacetsClientFactory = FacetsClientFactory;
//# sourceMappingURL=FacetsClientFactory.js.map