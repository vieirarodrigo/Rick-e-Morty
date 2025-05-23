'use client'

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import SearchButton from "./search-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Character = {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
}

export default function Page() {

  const [endpoint, setEndpoint] = useState(
  'https://rickandmortyapi.com/api/character'
  )

  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(false)
      try {
        const res = await fetch(endpoint)
        const data = await res.json()
        setCharacters (data.results || [])
      } catch (err) {
        console.log(err)
      }
    }
    load()
  }, [endpoint]) 

  return (
    <main className="text-center">
      
      <h1 className="m-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900">Personagens de Rick e Morty</h1>

      <SearchButton updatePage={setEndpoint}/>

      {loading && <p>Carregando...</p>}

      <div className="grid w-110 grid-cols-2 gap-10 justify-items-center mx-auto">
        {characters.map(char => (
          <Card key={char.id} className="w-45">
          
          <CardHeader>
            <CardTitle>{char.name}</CardTitle>
            <CardDescription>{char.status} - {char.species}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Avatar className="h-30 w-30">
              <AvatarImage src={char.image}></AvatarImage>
              <AvatarFallback>{char.name}</AvatarFallback>
            </Avatar>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button variant="outline">Detalhes</Button>
          </CardFooter> 
        </Card>
        ))}
      </div>
    </main>
  )
}