const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const likes = 0
  const item = {id: uuid(),title, url, techs, likes} 
  repositories.push(item)
  response.json(item)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const { title, url, techs } = request.body
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0){
    return response.status(400).json({ error: 'Repositório não existe'})
  }

  repositories[repoIndex].title = title
  repositories[repoIndex].url = url
  repositories[repoIndex].techs = techs
  return response.json(repositories[repoIndex])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo=> repo.id === id)

  if(repoIndex < 0){
    return response.status(400).json({ error: 'Repositorio não existe'})
  }

  repositories.splice(repoIndex, 1)

  return response.status(204).json({ msg: 'Deletado com sucesso!'})
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0){
    return response.status(400).json({ 'Error' : 'Repositório não encontrato para dar like'})
  }

  repositories[repoIndex].likes += 1

  return response.json(repositories[repoIndex])
});

module.exports = app;
