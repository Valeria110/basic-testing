import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(consoleSpy).not.toHaveBeenCalledWith('foo');
    expect(consoleSpy).not.toHaveBeenCalledWith('bar');
    expect(consoleSpy).not.toHaveBeenCalledWith('baz');
  });

  test('unmockedFunction should log into console', () => {
    const unmockedFuncSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(unmockedFuncSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
