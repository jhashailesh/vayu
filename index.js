#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const program = require("commander");
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();
const {getUpdatedRoute} = require("./helper");
const CREATE_QUESTION = [
  // {
  //   name: 'project-choice',
  //   type: 'list',
  //   message: 'What project template would you like to generate?',
  //   choices: CHOICES
  // },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const CREATE_COMPONENT = [
  {
    name: 'component-name',
    type: 'input',
    message: 'Component name:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Component name may only include letters, numbers, underscores and hashes.';
    }
  }
];



program
  .version('1.0.0')
  .description('VAYU : A small express-typescript generator with some pre built feature. Make development easy.');

program
  .command(`new`)
  .alias('n')
  .description('create new express-typescript project')
  .action(()=>{
    inquirer.prompt(CREATE_QUESTION)
  .then(answers => {
    // const projectChoice = answers['project-choice'];
    const projectChoice = 'express-typescript';
    const projectName = answers['project-name'];

    const templatePath = `${__dirname}/templates/${projectChoice}`;
  
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
    console.log(`
     switch to code base
     cd ${projectName}

     install package ---> npm install

     start code ---> npm start

     make build ----> npm run build

    `);
  });
  })

//  Generate component ::
program
  .command(`generate <component>`)
  .alias('g')
  .description('create new express-typescript project')
  .action((component)=>{
    try {
    if(!fs.existsSync(`${CURR_DIR}/src`)){
      throw new Error(`
      you are not in the correct folder.
      please move to correct folder or create new
      `);
    }
    if (!fs.existsSync(`${CURR_DIR}/src/components`)) {
      fs.mkdirSync(`${CURR_DIR}/src/components`);
    }

    if(fs.existsSync(`${CURR_DIR}/src/components/${component}`)){
      throw new Error(`${component} component is already available`);
    }

    const templatePath = `${__dirname}/templates/component`;
    fs.mkdirSync(`${CURR_DIR}/src/components/${component}`, {recursive: true});
    const name = component.substring(component.lastIndexOf('/') + 1);
    createDirectoryContents(templatePath, `src/components/${component}`, 'component', name);
    newRoute("v1", name, component);
    } catch (e) {
      console.log(e.message);
    }
  })



program
  .parse(process.argv);



/**
 * Create clone of template to the specific location
 *
 * @param {*} templatePath
 * @param {*} newProjectPath
 */
function createDirectoryContents (templatePath, newProjectPath, group, name) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
  
    const origFilePath = `${templatePath}/${file}`;
    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');
     
      //rename it
      if (file === '.npmignore') file = '.gitignore';
      if(group === 'component'){
        if((file !== "index.ts") && (file !== "index.js")){
          file = `${name}.${file}`
        }
        contents = contents.replace(/CCOMPONENT/g, capitalize(name));
        contents = contents.replace(/SCOMPONENT/g, name.toLowerCase());
      }

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {

      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}

function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function newRoute(routePath = "v1", name, component ) {
  let writePath = `${CURR_DIR}/src/routes/${routePath}.ts`;
  let contents = fs.readFileSync(writePath, 'utf8');
  contents = getUpdatedRoute(contents, name, component);
  fs.writeFileSync(writePath, contents, 'utf8');
}



