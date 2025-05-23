'use client'

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Button } from "@/components/ui/button"
 
const formSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Digite no mínimo 1 caracter" })
    .max(50),
})

type SearchFormData = z.infer<typeof formSchema>

type Props = {
    updatePage: (endpoint: string) => void
}

export default function SearchButton({ updatePage }: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SearchFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: ''
        },
    })

    const onSubmit = ({ query }: SearchFormData) => {
        const term = query.trim()
        const endpoint = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(term)}`
        updatePage(endpoint);
    }

    return (
        <form className="search" onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4">
                <input 
                    {...register('query')}
                    type="search"
                    placeholder="Buscar personagem"
                    className="border p-2 rounded"
                />
                {errors.query && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.query.message}
                    </span>
                )}

                <Button 
                    variant="outline"
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
                        {isSubmitting ? 'Buscando...' : 'Search'}
                </Button>
            </div>
        </form>
    )
}