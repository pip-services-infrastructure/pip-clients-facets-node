import { YamlConfigReader } from 'pip-services-commons-node';
import { FacetsClientFixtureV1 } from './FacetsClientFixtureV1';
import { FacetsLambdaClientV1 } from '../../src/version1/FacetsLambdaClientV1';

suite('FacetsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: FacetsLambdaClientV1;
    let fixture: FacetsClientFixtureV1;

    setup((done) => {
        client = new FacetsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new FacetsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });

});