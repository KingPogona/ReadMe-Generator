// include required local .js files
const { writeFile, copyFile } = require('./utils/generate-readMe.js');
const generatePage = require('./src/readMe-template.js');

// include inquirer in the project
const inquirer = require('inquirer');


// get user info
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectTitle',
            message: 'What is the project title? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the project title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please write a description of your project. (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please write a description of your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmInstallation',
            message: 'Is installation needed to use/work on this project? (Y,N)',
            default: true
        },
        // combine validation with the when if possible
        {
            type: 'input',
            name: 'installation',
            message: 'Please provide written installation instructions. (Required)',
            when: ({ confirmInstallation }) => {
                if (confirmInstallation) {
                    return true;
                } else {
                    return false;
                }
            }
            // validate: nameInput => {
            //     if (nameInput) {
            //         return true;
            //     } else {
            //         console.log('Please provide written installation instructions!');
            //         return false;
            //     }
            // }
        },
        // usage instructions
        {
            type: 'input',
            name: 'usage',
            message: 'Please provide instructions for use. (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide instructions for use!');
                    return false;
                }
            }
        },
        // how to contribute
        // add an if to the effect of: "Would you like to provide guidelines for how others can help contribute to this project?"
        {
            type: 'confirm',
            name: 'confirmContribute',
            message: 'Do you intend to have others help contribute to this project? (Y,N)',
            default: true
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Provide some instructions/guidelines for how you would like others to contribute to this project:',
            // possible alt text: What instructions/guidelines would you like to provide for others on how to contribute to this project? (Required)
            when: ({ confirmContribute }) => {
                if (confirmContribute) {
                    return true;
                } else {
                    return false;
                }
            }
            // validate: nameInput => {
            //     if (nameInput) {
            //         return true;
            //     } else {
            //         console.log('Please provide instructions or guidelines on how you would like others to contribute to this project!');
            //         return false;
            //     }
            // }
        },
        // how to Test
        // I have no idea for this one I think i would also like this to be optional.
        // try: "Does your project include tests? If so, would you like to provide instructions and/or examples on how to run them?"
        {
            type: 'input',
            name: 'tests',
            message: 'Please provide instructions and/or examples on how to run tests for your project. (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide instructions and/or examples on how to run tests for your project.');
                    return false;
                }
            }
        },

        // this is not done. fix message and add more license types.
        {
            type: 'list',
            // is there a type that only allows 1 checked option?
            name: 'license',
            // redo message
            message: 'What kind of license does your project use? (Check one that applies)',
            // provide better list of license types
            choices: ['MIT', 'none']
        }
    ]);
};





// function to write README file
function writeToFile(fileName, data) {
}


// function to initialize program
function init() {
    questions()
        .then(answers => {
            console.log(answers)
        })
        // .then(promptCollaborators)
        // .then(collaboratorData => {
        //     console.log(collaboratorData)
        // });
};


// function call to initialize program
init();