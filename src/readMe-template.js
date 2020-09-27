// very incomplete (need to figure out how I am going to go about this)
// perhaps have a list of links to each badge and select based on what the variable stores
const generateBadge = license => {
    if (!license) {
        return '';
    }

    return `
    ----badge here----
    

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
    if (templateData.collaborators !== '') {
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
const generateCollaborators = collaborators => {
    if (!collaborators) {
        return '';
    }

    return `
    ## Contributers
    ${collaborators
        .map(({ name, github }) => {
            return `
        * ${name}
        [${github}](${github})

        `;
        })
        .join('')}
    `;
};















module.exports = templateData => {
    console.log(templateData);
    // destructure page data by section
    const { projectTitle, description, installation, usage, contributing, tests, license, collaborators } = templateData;

    return `
    # ${projectTitle}

    ## Description 

    ${description}


    ${generateBadge(license)}
    ${generateTableOfContents(templateData)}
    ${generateInstallation(installation)}
    ## Usage 

    ${usage}


    ${generateContribute(contributing)}
    ${generateTests(tests)}
    ${generateCollaborators(collaborators)}
    ${generateLicense(license)}

    `;

};