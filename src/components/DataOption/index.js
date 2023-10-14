import { faker } from '@faker-js/faker';
import {
    generateVietnameseFullname,
    generateVietnameseMiddlename,
    generateVietnameseName,
    generateVietnameseSurname,
} from '../funcGenerate';
export const MenuOption = [
    {
        name: 'Basic',
        options: [
            'Id',
            'Boolean',
            'Color',
            'Int',
            'Float',
            'RowNumberAutoIncrement',
            'Vietnamese Surname',
            'Vietnamese MiddleName',
            'Vietnamese Name',
            'Vietnamese FullName',
        ],
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
    'Vietnamese Surname': generateVietnameseSurname,
    'Vietnamese MiddleName': generateVietnameseMiddlename,
    'Vietnamese Name': generateVietnameseName,
    'Vietnamese FullName': generateVietnameseFullname,
};

export const DataType = {
    Id: 'varchar(50)',
    Boolean: 'varchar(50)',
    Color: 'varchar(50)',
    Int: 'int',
    Float: 'float',
    RowNumberAutoIncrement: 'create',
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
    'Vietnamese Surname': 'nvarchar(100)',
    'Vietnamese MiddleName': 'nvarchar(100)',
    'Vietnamese Name': 'nvarchar(100)',
    'Vietnamese FullName': 'nvarchar(100)',
};
