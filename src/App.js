import React, { useState, useEffect } from "react"

import api from "./services/api"

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("repositories")

      setRepositories(response.data)
    }

    loadRepositories()
  }, [])

  async function handleAddRepository() {
    const newRepo = {
      title: "Desafio 02",
      url: "https://github.com/Rocketseat",
      techs: ["NodeJS", "React JS"],
    }

    const response = await api.post("repositories", newRepo)
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter((repository) => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
