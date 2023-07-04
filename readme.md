 npm run dev to run the localhost 
PRISMA:
initalling prisma :npm install prisma --save-dev //just save in dev dependency
just what database i want npx prisma init --datasource-provider sqlite
//here it is sql lite i can give postgres or anything
 * FIRST SCHEMA DEFINE PANNUM 
 * THEN MIGRATION
    npx prisma migrate dev --name "init"
 * visitlize the database
    npx prisma studio

npm and npx are both command-line tools used in the JavaScript ecosystem, but they have different functions.

npm is a package manager for Node.js. It is used to install, manage, and share packages (i.e., libraries, frameworks, and other tools) that are required for building Node.js applications. When you use npm to install a package, it downloads the package and all of its dependencies from the npm registry and installs them in a node_modules directory in your project.

npx, on the other hand, is a tool for running Node.js packages without installing them globally. It allows you to run a package directly from the npm registry without first installing it locally. When you use npx to run a command, it downloads the package and its dependencies, runs the command, and then deletes the package.

In summary, npm is used for installing and managing packages, while npx is used for running commands from packages without installing them globally.


//then install web prisma client the way to connect to prisma
npm install @prisma/client 

to see the database :
npm prisma studio

then to install jwt which is used to encode and decode 
npm install jsonwebtoken

i face this error 
npm i --save-dev @types/jsonwebtoken

study about auth