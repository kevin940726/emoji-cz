import test from 'ava';
import getConfig from '../../getConfig';
import path from 'path';

test('it should find config when package.json exists', t => {
  const config = getConfig(path.join(__dirname, 'package'));
  t.is(config, 'package.json');
});

test('it should find config when .cz.json exists', t => {
  const config = getConfig(path.join(__dirname, 'czjson'));
  t.is(config, '.cz.json');
});

test('it should find config when .czrc exists locally', t => {
  const config = getConfig(path.join(__dirname, 'czrc'));
  t.is(config, '.czrc');
});
