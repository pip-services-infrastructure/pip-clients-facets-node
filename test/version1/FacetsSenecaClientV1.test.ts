let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { FacetsMemoryPersistence } from 'pip-services-facets-node';
import { FacetsController } from 'pip-services-facets-node';
import { FacetsSenecaServiceV1 } from 'pip-services-facets-node';
import { IFacetsClientV1 } from '../../src/version1/IFacetsClientV1';
import { FacetsSenecaClientV1 } from '../../src/version1/FacetsSenecaClientV1';
import { FacetsClientFixtureV1 } from './FacetsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('FacetsSenecaClient', () => {
    let persistence: FacetsMemoryPersistence;
    let service: FacetsSenecaServiceV1;
    let client: FacetsSenecaClientV1;
    let fixture: FacetsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        persistence = new FacetsMemoryPersistence();
        let controller = new FacetsController();

        service = new FacetsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-facets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-facets', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new FacetsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
