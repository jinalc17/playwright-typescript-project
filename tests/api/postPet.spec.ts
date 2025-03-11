import { test, expect } from '@playwright/test';
import postData from '../../test-data/POST_Request.json';

const baseURL = 'https://petstore.swagger.io/v2/pet';

test('create pet', async ({ request }) => {

    const APIresponse = await request.post(baseURL, { data: postData });

    const jsonPOSTAPIResponse = await APIresponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    expect(APIresponse.status()).toBe(200);
    expect(APIresponse.statusText()).toBe('OK');
    expect(APIresponse.headers()['content-type']).toBe('application/json');
});