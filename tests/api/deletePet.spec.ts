import { test, expect } from '@playwright/test';

const baseURL = 'https://petstore.swagger.io/v2/pet';

test('Delete pet', async ({ request }) => {
    
    const APIresponse = await request.delete(baseURL + '/12345');

    expect(APIresponse.status()).toBe(200);
    expect(APIresponse.statusText()).toBe('OK');
    expect(APIresponse.headers()['content-type']).toBe('application/json');
});