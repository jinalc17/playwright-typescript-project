import {test, expect} from '@playwright/test';
import patchdata from '../../test-data/PATCH_Request.json';

const baseURL = 'https://petstore.swagger.io/v2/pet';

test('Update pet', async ({request}) => {

    const APIresponse = await request.patch(baseURL+ '/12345', {data: patchdata});

    // const jsonPOSTAPIResponse = await APIresponse.json();
    // console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    expect(APIresponse.status()).toBe(405);
    expect(APIresponse.statusText()).toBe('Method Not Allowed');
    expect(APIresponse.headers()['content-type']).toBe('application/xml');
});