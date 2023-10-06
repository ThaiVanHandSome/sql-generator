import { faker } from '@faker-js/faker';

const funcGenerate = {
    id: faker.string.nanoid,
    firstName: faker.person.firstName,
    lastName: faker.person.lastName,
    fullName: faker.person.fullName,
    sex: faker.person.sex,
    product: faker.commerce.product,
    phone: faker.phone.imei,
    int: faker.number.int,
    float: faker.datatype.float,
};

export default funcGenerate;
