// include required local .js files
const { writeFile, copyFile } = require('./utils/generate-readMe.js');
const generateReadMe = require('./src/readMe-template.js');

// include inquirer in the project
const inquirer = require('inquirer');


// get user info
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectTitle',
            message: 'What is the project title? (Required)',
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
            message: 'Please write a description of your project. (Required)',
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
            validate: verifyInput => {
                if (verifyInput) {
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
            type: 'confirm',
            name: 'confirmTests',
            message: 'Does your project include tests? If so, would you like to provide instructions and/or examples on how to run them?',
            default: true
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide some instructions and/or examples on how to run tests for this project.',
            when: ({ confirmTests }) => {
                if (confirmTests) {
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
        {
            type: 'input',
            name: 'contributing',
            message: 'Please provide instructions and/or examples on how to run tests for your project. (Required)',
            when: ({ confirmTests }) => {
                if (confirmTests) {
                    return true;
                } else {
                    return false;
                }
            }
            // validate: nameInput => {
            //     if (nameInput) {
            //         return true;
            //     } else {
            //         console.log('Please provide instructions and/or examples on how to run tests for your project.');
            //         return false;
            //     }
            // }
        },

        // Review this to make sure it is good enough
        {
            type: 'list',
            name: 'license',
            // redo message
            message: 'What kind of license does your project use? (Check one that applies)',
            choices: ['MIT', 'GPL-2.0-or-later', 'GPL-3.0-or-later', 'Apache-2.0', 'none']
        }
    ]);
};





// function to write README file
const writeToFile = fileContent => {
    const fs = require('fs');

    return new Promise((resolve, reject) => {
        fs.writeFile('./README.md', fileContent, err => {
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


const promptCollaborators = collaboratorData => {
    // console.log(collaboratorData);
    console.log(`
  ======================
  Add a New Collaborator
  ======================
  `);

    // If there's no 'collaborators' array property, create one
    // if (typeof collaboratorData === 'undefined') {
    //     var collaboratorData = { collaborators: [] };
    // }
    console.log(collaboratorData);
    // If there's no 'collaborators' array property, create one
    if (!collaboratorData.collaborators) {
        collaboratorData.collaborators = [];
    }
    console.log(collaboratorData);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of a collaborator (Required)',
            validate: nameInput => {
                if (nameInput) {
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
            message: "Provide a url for the collaborator's GitHub profile. (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the url for the collaborator's GitHub Profile!");
                    return false;
                }
            }
        },
        // {
        //     type: 'checkbox',
        //     name: 'languages',
        //     message: 'What did you this project with? (Check all that apply)',
        //     choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        // },
        {
            type: 'confirm',
            name: 'confirmAddCollaborator',
            message: 'Would you like to add another collaborator? (Y,N)',
            default: false
        }

    ])
        .then(projectData => {
            collaboratorData.collaborators.push(projectData);
            if (projectData.confirmAddCollaborator) {
                return promptCollaborators(collaboratorData);
            } else {
                console.log(collaboratorData);
                return collaboratorData;
            }
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
            console.log(readMeContent);
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