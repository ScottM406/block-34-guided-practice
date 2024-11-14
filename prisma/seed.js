const prisma = require("../prisma");
const seed = async () => {

  const books = [
    {title: "War and Peace"},
    {title: "East of Eden"},
    {title: "Crime and Punishment"},
    {title: "Slaughterhouse 5"},
    {title: "Dracula"},
    {title: "The Portriat of Dorian Gray"},
    {title: "The Brothers Karamazov"},
    {title: "Sense and Sensibility"},
    {title: "Brave New World"},
    {title: "The Great Gatsby"}
  ]
  // Add an additonal 10 books 
  // for (let i=0; i < 10; i ++) {
  //   books.push({ title: `Book ${i}` });
  // }
  await prisma.book.createMany({ data: books });
  };

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});