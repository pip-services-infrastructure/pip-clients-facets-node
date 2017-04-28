let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FacetV1 } from '../../src/version1/FacetV1';
import { IFacetsClientV1 } from '../../src/version1/IFacetsClientV1';

export class FacetsClientFixtureV1 {
    private _client: IFacetsClientV1;
    
    constructor(client: IFacetsClientV1) {
        this._client = client;
    }

    public testAddAndRemoveFacets(done) {
        async.series([
        // Add facet 1
            (callback) => {
                this._client.addFacet(
                    null, "test", "group1",
                    (err, facet) => {
                        assert.isNull(err);

                        assert.equal(facet.group, "test");
                        assert.equal(facet.name, "group1");
                        assert.equal(facet.count, 1);

                        callback();
                    }
                );
            },
        // Remove facet 1
            (callback) => {
                this._client.removeFacet(
                    null, "test", "group2",
                    (err, facet) => {
                        assert.isNull(err);

                        assert.equal(facet.group, "test");
                        assert.equal(facet.name, "group2");
                        assert.equal(facet.count, 0);

                        callback();
                    }
                );
            },
        // Read facets
            (callback) => {
                this._client.getFacetsByGroup(
                    null,
                    'test',
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Delete facets
            (callback) => {
                this._client.deleteFacetsByGroup(
                    null,
                    'test',
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Read facets
            (callback) => {
                this._client.getFacetsByGroup(
                    null,
                    'test',
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    }

}
