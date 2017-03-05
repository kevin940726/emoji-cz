# emoji-cz
> A [commitizen](https://github.com/commitizen/cz-cli) emoji adapter.

[![NPM](https://nodei.co/npm/emoji-cz.png?downloads=true&stars=true)](https://nodei.co/npm/emoji-cz/)

```
? Select the type of change that you're committing: (Use arrow keys)
❯ ✨  Feat:      A new feature
  🐛  Fix:       A bug fix
  📚  Docs:      Documentation only changes
  🎨  Style:     Changes that do not affect the meaning of the code
  🔨  Refactor:  A code change that neither fixes a bug nor adds a feature
  🚀  Perf:      A code change that improves performance
  🚨  Test:      Adding missing tests or correcting existing tests
```

## Installation
```
yarn global add emoji-cz
# OR
# npm install --global emoji-cz

# set as default adapter globally
echo '{ "path": "emoji-cz" }' > ~/.czrc
```

## Usage
Simply use `git cz` instead of `git commit` when committing.

## Settings
You can overwrite the `types` data in 3 different ways, it will apply the config by this order:

1. `package.json`
2. `.cz.json`
3. `.czrc`

```js
// in package.json
"config": {
  "commitizen": {
    // ...
    "emoji-cz": {
      "types": {
        "Fix": {
          "emoji": "🐝", // overwrite "Fix" emoji to a bee
          "name": "Bug" // overwrite "Fix" name to "Bug"
        }
      }
    }
  }
}

// in .cz.json or .czrc
{
  "emoji-cz": {
    //...
  }
}
```

## Author
Kai Hao <kevin830726@gmail.com>

## License
[MIT](LICENSE)
