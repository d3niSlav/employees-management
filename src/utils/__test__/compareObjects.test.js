import { compareObjects } from '../helpers';

const mockedCollection = [
  {
    id: 12,
    name: 'Eleven'
  },
  {
    id: 2,
    name: 'Two'
  },
  {
    id: 28,
    name: 'Twenty-eight'
  },
  {
    id: 1,
    name: 'One'
  }
];

const sortedCollectionByIdAsc = [
  {
    id: 1,
    name: 'One'
  },
  {
    id: 2,
    name: 'Two'
  },
  {
    id: 12,
    name: 'Eleven'
  },
  {
    id: 28,
    name: 'Twenty-eight'
  }
];

const sortedCollectionByIdDesc = [
  {
    id: 28,
    name: 'Twenty-eight'
  },
  {
    id: 12,
    name: 'Eleven'
  },
  {
    id: 2,
    name: 'Two'
  },
  {
    id: 1,
    name: 'One'
  }
];

const sortedCollectionByNameAsc = [
  {
    id: 12,
    name: 'Eleven'
  },
  {
    id: 1,
    name: 'One'
  },
  {
    id: 28,
    name: 'Twenty-eight'
  },
  {
    id: 2,
    name: 'Two'
  }
];

const sortedCollectionByNameDesc = [
  {
    id: 2,
    name: 'Two'
  },
  {
    id: 28,
    name: 'Twenty-eight'
  },
  {
    id: 1,
    name: 'One'
  },
  {
    id: 12,
    name: 'Eleven'
  }
];

describe('sort by number property', () => {
  test('sort in ascending order', () => {
    const collection = [...mockedCollection];
    expect(JSON.stringify(collection.sort(compareObjects('id')))).toBe(JSON.stringify(sortedCollectionByIdAsc));
  });

  test('sort in descending order', () => {
    const collection = [...mockedCollection];
    expect(JSON.stringify(collection.sort(compareObjects('id', 'desc')))).toBe(JSON.stringify(sortedCollectionByIdDesc));
  });
});

describe('sort by text property', () => {
  test('sort in ascending order', () => {
    const collection = [...mockedCollection];
    expect(JSON.stringify(collection.sort(compareObjects('name')))).toBe(JSON.stringify(sortedCollectionByNameAsc));
  });

  test('sort in descending order', () => {
    const collection = [...mockedCollection];
    expect(JSON.stringify(collection.sort(compareObjects('name', 'desc')))).toBe(JSON.stringify(sortedCollectionByNameDesc));
  });
});

describe('compare normal array', () => {
  test('sort in ascending order', () => {
    const collection = [2, 3, 1];
    expect(JSON.stringify([...collection].sort(compareObjects('')))).toBe(JSON.stringify([...collection]));
  });

  test('sort in descending order', () => {
    const collection = [...mockedCollection];
    expect(JSON.stringify(collection.sort(compareObjects('id', 'desc')))).toBe(JSON.stringify(sortedCollectionByIdDesc));
  });
});
