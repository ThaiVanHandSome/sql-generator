import { faker } from '@faker-js/faker';
export const MenuOption = [
    {
        name: 'Basic',
        options: ['Id', 'Boolean', 'Color', 'Int', 'Float', 'RowNumberAutoIncrement'],
    },
    {
        name: 'Personal',
        options: ['Avatar', 'FirstName', 'LastName', 'FullName', 'Gender', 'Job', 'Location'],
    },
    {
        name: 'Animal',
        options: ['Datetime', 'Boolean', 'Color', 'Int', 'Float', 'RowNumberAutoIncrement'],
    },
    {
        name: 'Commerce',
        options: ['Department', 'Price', 'Product'],
    },
    {
        name: 'Company',
        options: ['Datetime', 'Boolean', 'Color', 'Int', 'Float', 'RowNumberAutoIncrement'],
    },
];

export const generateFunc = {
    Id: faker.string.nanoid,
    Boolean: faker.datatype.boolean,
    Color: faker.color.human,
    Int: faker.number.int,
    Float: faker.datatype.float,
    RowNumberAutoIncrement: null,
    Avatar: faker.image.avatar,
    FirstName: faker.person.firstName,
    LastName: faker.person.lastName,
    FullName: faker.person.fullName,
    Gender: faker.person.gender,
    Job: faker.person.jobType,
    Location: faker.location.city,
    Department: faker.commerce.department,
    Price: faker.commerce.price,
    Product: faker.commerce.product,
};

export const DataType = {
    Id: 'varchar(50)',
    Boolean: 'varchar(50)',
    Color: 'varchar(50)',
    Int: 'int',
    Float: 'float',
    RowNumberAutoIncrement: 'int',
    Avatar: 'varchar(50)',
    FirstName: 'varchar(50)',
    LastName: 'varchar(50)',
    FullName: 'varchar(50)',
    Gender: 'varchar(50)',
    Job: 'varchar(50)',
    Location: 'varchar(50)',
    Department: 'varchar(50)',
    Price: 'float',
    Product: 'varchar(50)',
};
