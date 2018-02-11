"format cjs";

var wrap = require('word-wrap');
var map = require('lodash.map');
var longest = require('longest');
var rightPad = require('right-pad');

var filter = function(array) {
  return array.filter(function(x) {
    return x;
  });
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function (options) {

  var types = options.types;
  var format = options.format || '[name]: [subject] [emoji]';

  var length = longest(Object.keys(types)).length + 2;
  var choices = map(types, function (type, key) {
    var name = type.name || key;
    return {
      name: rightPad(name + ':', length) + ' ' + type.description + '  ' + type.emoji,
      value: {
        emoji: type.emoji,
        name: name,
      }
    };
  });

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function(cz, commit) {
      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Select the type of change that you\'re committing:',
          choices: choices
        }, {
          type: 'input',
          name: 'subject',
          message: 'Write a short, imperative tense description of the change:\n'
        }, {
          type: 'input',
          name: 'body',
          message: 'Provide a longer description of the change:\n'
        }, {
          type: 'input',
          name: 'issues',
          message: 'List any issues closed by this change:\n'
        }
      ]).then(function(answers) {

        var maxLineWidth = 100;

        var wrapOptions = {
          trim: true,
          newline: '\n',
          indent:'',
          width: maxLineWidth
        };

        // Hard limit this line
        var head = format.replace(/\[emoji\]/g, answers.type.emoji)
          .replace(/\[name\]/g, answers.type.name)
          .replace(/\[subject\]/g, answers.subject.trim())
          .slice(0, maxLineWidth);
        // var head = (answers.type + ': ' + answers.subject.trim()).slice(0, maxLineWidth);

        // Wrap these lines at 100 characters
        var body = wrap(answers.body, wrapOptions);

        var issues = wrap(answers.issues, wrapOptions);

        var footer = filter([ issues ]).join('\n\n');

        commit(head + '\n\n' + body + '\n\n' + footer);
      });
    }
  };
};
