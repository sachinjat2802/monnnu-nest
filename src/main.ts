import { App } from "./app";

process.stdout.write("\n*******************************************************************************************************************************\n");
process.stdout.write(
    `\n Starting Service:: Monnu micro services in nest js  at ${new Date()} \n` 
);
process.stdout.write("\n********************************************************************************************************************************\n");

process.stdout.write("\nserver in running on port :")
const index =3000
// for (let index = 3000; index <= 3050; index++) {
   process.stdout.write(""+index +"\n");
   new App(index)



// }


