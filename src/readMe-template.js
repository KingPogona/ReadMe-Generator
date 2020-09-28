// Generates a badge for the license used by this project
const generateBadge = license => {
    let badge = '';
    
    if (license === 'none') {
        return '';
    } else if (license === 'GPL-2.0-or-later') {
        badge = '![badmath](https://img.shields.io/badge/License-GPL--2.0--or--later-green)'
    } else if (license === 'GPL-3.0-or-later') {
        badge = '![badmath](https://img.shields.io/badge/License-GPL--3.0--or--later-green)'
    } else {
        badge = '![badmath](https://img.shields.io/badge/License-'+ license +'-green)'
    }

    return `
${badge}
    `;
};
// Generates the Table of Contents based on the included sections
const generateTableOfContents = (templateData) => {

    let tableOfContents = '';

    if (templateData.description !== '') {
        tableOfContents += `
* [Description](#description)`};
    if (templateData.installation !== '') {
        tableOfContents += `
* [Installation](#installation)`};
    if (templateData.usage !== '') {
        tableOfContents += `
* [Usage](#usage)`};
    if (templateData.contributing !== '') {
        tableOfContents += `
* [Contributing](#contributing)`};
    if (templateData.tests !== '') {
        tableOfContents += `
* [Tests](#tests)`};
    if (templateData.license !== '') {
        tableOfContents += `
* [License](#license)`};
    if (templateData.userName !== '') {
        tableOfContents += `
* [Credits](#credits)`};


    return `
## Table of Contents 

${tableOfContents}
    
    `;
};
// Generates installation instructions based on user input.
const generateInstallation = installation => {
    if (!installation) {
        return '';
    }

    return `
## Installation

${installation}
    

    `;
};
// Generates instructions on how to contribute based on user input.
const generateContribute = contributing => {
    if (!contributing) {
        return '';
    }

    return `
## Contributing

${contributing}
    
    `;
};
// Generates test instructions based on user input.
const generateTests = tests => {
    if (!tests) {
        return '';
    }

    return `
## Tests

${tests}

    `;
};
// Generates license info based on user input.
const generateLicense = license => {
    if (!license) {
        return '';
    }

    return `
## License
    
${license}
    
    `;
};
// Generates Credits including all provided collaborators on the project based on user input.
const generateCredits = (userName, userGitHub, collaborators) => {
    if (collaborators === []) {
        return `
## Credits

* ${userName} - [${userGitHub}](${userGitHub})

`
    };

    return `
## Credits

* ${userName} - [${userGitHub}](${userGitHub})
    ${collaborators
        .map(({ name, github }) => {
            return `
* ${name} - [${github}](${github})
        `;
        })
        .join('')}`;
};


// generates the layout of the ReadMe and exports it for use.
module.exports = templateData => {
    // destructure page data by section
    const { userName, userGitHub, userEMail, projectTitle, description, installation, usage, contributing, tests, license, collaborators } = templateData;

    return `
# ${projectTitle}

${generateBadge(license)}
${generateTableOfContents(templateData)}

## Description 

${description}


${generateInstallation(installation)}
## Usage 

${usage}


${generateContribute(contributing)}
${generateTests(tests)}
${generateLicense(license)}
${generateCredits(userName, userGitHub, collaborators)}


## Questions

If you have any questions please feel free to contact me at ${userEMail}.
    `;
};