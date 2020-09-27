// include "fs"
const fs = require('fs');

// include required local .js files
const { writeFile, copyFile } = require('./utils/generate-readMe.js');
const generateReadMe = require('./src/readMe-template.js');

// include inquirer in the project
const inquirer = require('inquirer');


// get user info and information to fill out readme
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'userName',
            message: 'What is your GitHub user name?',
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub user name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'userGitHub',
            message: 'What is your GitHub URL?',
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub URL!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectTitle',
            message: 'What is the project title?',
            validate: verifyInput => {
                if (verifyInput) {
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
            message: 'Please write a description of your project.',
            validate: verifyInput => {
                if (verifyInput) {
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
            message: 'Is installation needed to use/work on this project?',
            default: true
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please provide written installation instructions.',
            when: ({ confirmInstallation }) => {
                if (confirmInstallation) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log('Please provide written installation instructions!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please provide instructions for how to use this project!',
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log('Please provide instructions for how to use this project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmContribute',
            message: 'Do you intend to have others help contribute to this project?',
            default: true
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Provide some instructions/guidelines for how you would like others to contribute to this project:',
            when: ({ confirmContribute }) => {
                if (confirmContribute) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log('Please provide instructions or guidelines on how you would like others to contribute to this project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmTests',
            message: 'Does your project include tests? If so, would you like to provide instructions and/or examples on how to run them?',
            default: true
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide some instructions and/or examples for how to run tests for this project.',
            when: ({ confirmTests }) => {
                if (confirmTests) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log('Please provide instructions and/or examples for how to run tests for this project.!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'What kind of license does your project use? (Check one that applies)',
            choices: ['MIT', 'GPL-2.0-or-later', 'GPL-3.0-or-later', 'Apache-2.0', 'none']
        },
        {
            type: 'confirm',
            name: 'confirmCollaborators',
            message: 'Did anyone collaborate on this project?',
            default: true
        }
    ]);
};


const promptCollaborators = collaboratorData => {
    // If there is no 'collaborators' array property, create one
    if (!collaboratorData.collaborators) {
        collaboratorData.collaborators = [];
    };

    // check if there should be any collaborators
    if (collaboratorData.confirmCollaborators === false) {
        return collaboratorData
    };

    console.log(`
  ======================
  Add a New Collaborator
  ======================
  `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of a collaborator',
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log('Please enter a collaborators name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Provide a url for the collaborator's GitHub profile.",
            validate: verifyInput => {
                if (verifyInput) {
                    return true;
                } else {
                    console.log("Please enter the url for the collaborator's GitHub Profile!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddCollaborator',
            message: 'Would you like to add another collaborator?',
            default: false,
        }

    ])
        .then(projectData => {
            collaboratorData.collaborators.push(projectData);
            if (projectData.confirmAddCollaborator) {
                return promptCollaborators(collaboratorData);
            } else {
                return collaboratorData;
            }
        });
};


// function to write README file
const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};


// function to initialize program
function init() {
    questions()
        .then(promptCollaborators)
        .then(collaboratorData => {
            return generateReadMe(collaboratorData);
        })
        .then(readMeContent => {
            return writeToFile(readMeContent);
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);
        })
        .catch(err => {
            console.log(err);
        });

};


// function call to initialize program
init();