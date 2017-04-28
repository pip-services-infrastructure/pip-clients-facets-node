let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { FacetsMemoryPersistence } from 'pip-services-Facets-node';
import { FacetsController } from 'pip-services-Facets-node';
import { FacetsHttpServiceV1 } from 'pip-services-Facets-node';
import { IFacetsClientV1 } from '../../src/version1/IFacetsClientV1';
import { FacetsHttpClientV1 } from '../../src/version1/FacetsHttpClientV1';
import { FacetsClientFixtureV1 } from './FacetsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('FacetsHttpClientV1', ()=> {
    let persistence: FacetsMemoryPersistence;
    let service: FacetsHttpServiceV1;
    let client: FacetsHttpClientV1;
    let fixture: FacetsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        persistence = new FacetsMemoryPersistence();
        let controller = new FacetsController();

        service = new FacetsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-facets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-facets', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new FacetsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new FacetsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    setup((done) => {
        persistence.clear(null, done);
    });

    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });

});
