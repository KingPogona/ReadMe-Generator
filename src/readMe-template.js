// very incomplete (need to figure out how I am going to go about this)
// perhaps have a list of links to each badge and select based on what the variable stores
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
// very incomplete
// figure out a way of checking which items need to be included
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
* [Collaborators](#collaborators)`};


    return `
## Table of Contents 

    ${tableOfContents}
    
    `;
};
// incomplete
const generateInstallation = installation => {
    if (!installation) {
        return '';
    }

    return `
## Installation

    ${installation}
    

    `;
};
// incomplete
const generateContribute = contributing => {
    if (!contributing) {
        return '';
    }

    return `
## Contributing

    ${contributing}
    

    `;
};
// incomplete
const generateTests = tests => {
    if (!tests) {
        return '';
    }

    return `
## Tests

    ${tests}

    
    `;
};
// incomplete
const generateLicense = license => {
    if (!license) {
        return '';
    }

    return `
## License
    
    ${license}
    

    `;
};
// seriously incomplete... This will need to generate a name 
// and github link for each Collaborators in the list.
const generateCollaborators = (userName, userGitHub, collaborators) => {
    if (collaborators[0].confirmCollaborators === false ) {
        return `
## Contributers

* ${userName} - [${userGitHub}](${userGitHub})


`
    };

    return `
## Contributers

* ${userName} - [${userGitHub}](${userGitHub})
    ${collaborators
        .map(({ name, github }) => {
            return `
* ${name} - [${github}](${github})
        `;
        })
        .join('')}
    `;
};















module.exports = templateData => {
    console.log(templateData);
    // destructure page data by section
    const { userName, userGitHub, projectTitle, description, installation, usage, contributing, tests, license, collaborators } = templateData;

    return `
# ${projectTitle}

${generateBadge(license)}

## Description 

    ${description}


${generateTableOfContents(templateData)}
${generateInstallation(installation)}
## Usage 

    ${usage}


${generateContribute(contributing)}
${generateTests(tests)}
${generateCollaborators(userName, userGitHub, collaborators)}
${generateLicense(license)}

    `;

};