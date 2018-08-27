let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { IFacetsClientV1 } from '../../src/version1/IFacetsClientV1';
import { FacetsMemoryClientV1 } from '../../src/version1/FacetsMemoryClientV1';
import { FacetsClientFixtureV1 } from './FacetsClientFixtureV1';

suite('FacetsMemoryClientV1', ()=> {
    let client: FacetsMemoryClientV1;
    let fixture: FacetsClientFixtureV1;

    suiteSetup((done) => {
        client = new FacetsMemoryClientV1();
        fixture = new FacetsClientFixtureV1(client);
        done();
    });
    
    setup((done) => {
        client.clear(null, done);
    });

    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });

});
