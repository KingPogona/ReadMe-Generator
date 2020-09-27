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
const generateTableOfContents = installation => {
    if (!installation) {
        return '';
    }
    
    return `
    ## Table of Contents 

    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    

    
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
    ${generateTableOfContents(installation)}
    ${generateInstallation(installation)}
    ## Usage 

    ${usage}



    ${generateContribute(contributing)}
    ${generateTests(tests)}
    ${generateCollaborators(collaborators)}
    ${generateLicense(license)}

    `;

};