const surName = ['Nguyễn', 'Phạm', 'Võ', 'Lê', 'Trần', 'Dương', 'Trịnh', 'Cao'];
const middleName = ['Thái', 'Minh', 'Tiến', 'Chí', 'Nhật', 'Trọng', 'Đức', 'Công'];
const name = ['Văn', 'Thuận', 'Nam', 'Thương', 'Thanh', 'Toàn', 'Khánh', 'Phúc'];

export const generateVietnameseSurname = () => {
    const idx = Math.floor(Math.random() * surName.length);
    return surName[idx];
};

export const generateVietnameseMiddlename = () => {
    const idx = Math.floor(Math.random() * middleName.length);
    return middleName[idx];
};

export const generateVietnameseName = () => {
    const idx = Math.floor(Math.random() * name.length);
    return name[idx];
};

export const generateVietnameseFullname = () => {
    const idx_surname = Math.floor(Math.random() * surName.length);
    const idx_middlename = Math.floor(Math.random() * middleName.length);
    const idx_name = Math.floor(Math.random() * name.length);
    return surName[idx_surname] + ' ' + middleName[idx_middlename] + ' ' + name[idx_name];
};
