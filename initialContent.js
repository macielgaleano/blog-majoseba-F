const faker = require("faker");

function initialAuthors() {
  const authors = [];
  for (let i = 0; i < 10; i++) {
    let id = i + 1;
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let email = faker.internet.email();
    let password = "pedro";
    const author = { id, firstname, lastname, email, password };
    authors.push(author);
  }
  return authors;
}

function initialArticles() {
  const articles = [];
  for (let i = 0; i < 10; i++) {
    let id = i + 1;
    let title = faker.name.title();
    let content = faker.lorem.paragraphs();
    let image = faker.image.imageUrl();
    let creationDate = faker.time.recent();
    let authorId = i + 1;
    const article = { id, title, content, image, creationDate, authorId };
    articles.push(article);
  }
  return articles;
}

module.exports = { initialAuthors, initialArticles };
