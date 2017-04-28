let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { FacetsMemoryPersistence } from 'pip-services-facets-node';
import { FacetsController } from 'pip-services-facets-node';
import { IFacetsClientV1 } from '../../src/version1/IFacetsClientV1';
import { FacetsDirectClientV1 } from '../../src/version1/FacetsDirectClientV1';
import { FacetsClientFixtureV1 } from './FacetsClientFixtureV1';

suite('FacetsDirectClientV1', ()=> {
    let persistence: FacetsMemoryPersistence;
    let client: FacetsDirectClientV1;
    let fixture: FacetsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        persistence = new FacetsMemoryPersistence();
        let controller = new FacetsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-facets', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new FacetsDirectClientV1();
        client.setReferences(references);

        fixture = new FacetsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    setup((done) => {
        persistence.clear(null, done);
    });

    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });

});
