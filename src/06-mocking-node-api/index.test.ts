import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  const mockCallback = jest.fn();
  const timeDelay = 3000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockCallback, timeDelay);
    expect(setTimeoutSpy).toHaveBeenCalledWith(mockCallback, timeDelay);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockCallback, timeDelay);

    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeDelay);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const mockCallback = jest.fn();
  const timeDelay = 3000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, timeDelay);
    expect(setIntervalSpy).toHaveBeenCalledWith(mockCallback, timeDelay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.clearAllTimers();
    doStuffByInterval(mockCallback, timeDelay);

    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeDelay * 4);
    expect(mockCallback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join').mockImplementation(jest.fn());
    const pathToFile = './file.txt';
    await readFileAsynchronously(pathToFile);
    expect(pathSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const pathToFile = './file.txt';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('some text');
    const pathToFile = './file.txt';
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('some text');
  });
});
