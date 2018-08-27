import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-components-node';

import { FacetsNullClientV1 } from '../version1/FacetsNullClientV1';
import { FacetsDirectClientV1 } from '../version1/FacetsDirectClientV1';
import { FacetsHttpClientV1 } from '../version1/FacetsHttpClientV1';
import { FacetsSenecaClientV1 } from '../version1/FacetsSenecaClientV1';

export class FacetsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-facets', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-facets', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-facets', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-facets', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-facets', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(FacetsClientFactory.NullClientV1Descriptor, FacetsNullClientV1);
		this.registerAsType(FacetsClientFactory.DirectClientV1Descriptor, FacetsDirectClientV1);
		this.registerAsType(FacetsClientFactory.HttpClientV1Descriptor, FacetsHttpClientV1);
		this.registerAsType(FacetsClientFactory.SenecaClientV1Descriptor, FacetsSenecaClientV1);
	}
	
}
