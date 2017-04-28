"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
let _ = require('lodash');
const FacetV1_1 = require("./FacetV1");
class FacetsMemoryClientV1 {
    constructor() {
        this._maxPageSize = 100;
        this._items = [];
    }
    getFacetsByGroup(correlationId, group, paging, callback) {
        let items = _.filter(this._items, (item) => item.group == group && item.count > 0);
        // Extract a page
        paging = paging != null ? paging : new pip_services_commons_node_1.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = items.length;
        if (skip > 0)
            items = _.slice(items, skip);
        items = _.take(items, take);
        let page = new pip_services_commons_node_2.DataPage(items, total);
        callback(null, page);
    }
    addFacet(correlationId, group, name, callback) {
        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item.count++;
        }
        else {
            item = new FacetV1_1.FacetV1(group, name, 1);
            this._items.push(item);
        }
        callback(null, item);
    }
    removeFacet(correlationId, group, name, callback) {
        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item = item > 0 ? item - 1 : 0;
        }
        else {
            item = new FacetV1_1.FacetV1(group, name, 0);
            this._items.push(item);
        }
        callback(null, item);
    }
    deleteFacetsByGroup(correlationId, group, callback) {
        this._items = _.filter(this._items, (item) => item.group != group);
        if (callback)
            callback(null);
    }
    clear(correlationId, callback) {
        this._items = [];
        if (callback)
            callback(null);
    }
}
exports.FacetsMemoryClientV1 = FacetsMemoryClientV1;
//# sourceMappingURL=FacetsMemoryClientV1.js.map