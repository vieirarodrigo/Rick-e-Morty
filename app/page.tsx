import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

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
}

async function getCharacters(): Promise<Character[]> {
  const res = await fetch('https://rickandmortyapi.com/api/character')  
  const data = await res.json();

  return data.results 
}

export default async function Page() {
  const characters = await getCharacters()

  return (
    <main className="text-center">
      <h1 className="m-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900">Personagens de Rick e Morty</h1>
      <div className="grid w-110 grid-cols-2 gap-10 justify-items-center mx-auto">
        {characters.map(char => (
          <Card key={char.id} className="w-45">
          <CardHeader>
            <CardTitle>{char.name}</CardTitle>
            <CardDescription>{char.status}</CardDescription>
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