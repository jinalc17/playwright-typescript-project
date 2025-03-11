import { test, expect } from '@playwright/test';
import { postPetDynamicRequestBody } from '../../utils/apiHelper'
import { faker } from '@faker-js/faker'

const baseURL = 'https://petstore.swagger.io/v2/pet';

test('create pet using dynamic data', async ({ request }) => {

    const id = faker.number.int({ min: 1000, max: 10000 });
    const name = faker.person.firstName();
    const photoUrls = [faker.image.avatar()];
    const tags = [
        {
            id: faker.number.int({ min: 1000, max: 10000 }),
            name: faker.person.firstName()
        }
    ];
    const status = 'available';
    const postData = await postPetDynamicRequestBody(id, name, photoUrls, tags, status);

    const APIresponse = await request.post(baseURL, { data: postData });

    const jsonPOSTAPIResponse = await APIresponse.json();
    console.log('POST API Response : ' + JSON.stringify(jsonPOSTAPIResponse, null, 2));

    expect(APIresponse.status()).toBe(200);
    expect(APIresponse.statusText()).toBe('OK');
    expect(APIresponse.headers()['content-type']).toBe('application/json');

    expect(jsonPOSTAPIResponse.id).toBeGreaterThan(0);
    expect(jsonPOSTAPIResponse.id).toBe(id);
    expect(jsonPOSTAPIResponse.name).toBe(name);
    expect(jsonPOSTAPIResponse.photoUrls).toEqual(photoUrls);
    expect(jsonPOSTAPIResponse.tags).toEqual(tags);
    expect(jsonPOSTAPIResponse.status).toBe(status);
    
});