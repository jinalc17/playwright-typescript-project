
export async function postPetDynamicRequestBody
    (id: number, name: string, photoUrls: string[], tags: tags[], status: string) {
    const requestBody = {
        "id": id,
        "category": {
            "id": id,
            "name": name
        },
        "name": name,
        "photoUrls": photoUrls,
        "tags": tags,
        "status": status
    }
    return requestBody;
}