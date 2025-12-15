'use client'
import { z } from "zod"
import { eventFormSchema } from "@/schema/events"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function EventForm({
    event, // Destructure the `event` object from the props
  }: {
    // Define the shape (TypeScript type) of the expected props
    event?: { // Optional `event` object (might be undefined if creating a new event)
      id: string // Unique identifier for the event
      name: string // Name of the event
      description?: string // Optional description of the event
      durationInMinutes: number // Duration of the event in minutes
      isActive: boolean // Indicates whether the event is currently active
    }
}) {

    
    // useTransition is a React hook that helps manage the state of transitions in async operations
    // It returns two values:
    // 1. `isDeletePending` - This is a boolean that tells us if the deletion is still in progress
    // 2. `startDeleteTransition` - This is a function we can use to start the async operation, like deleting an event

    const [isDeletePending, startDeleteTransition] = useTransition()
    const router = useRouter()


    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema), // Validate with Zod schema
        defaultValues: event
        ? {
            // If `event` is provided (edit mode), spread its existing properties as default values
            ...event,
          }
          : {
            // If `event` is not provided (create mode), use these fallback defaults
            isActive: true,             // New events are active by default
            durationInMinutes: 30,      // Default duration is 30 minutes
            description: '',            // Ensure controlled input: default to empty string
            name: '',                   // Ensure controlled input: default to empty string
          },

    })
 // Handle form submission
    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        const action =  event == null ? createEvent : updateEvent.bind(null, event.id)
        try {
            await action(values)
            router.push('/events')

        } catch (error: any) {
            // Handle any error that occurs during the action (e.g., network error)
          form.setError("root", {
            message: `There was an error saving your event ${error.message}`,
          })
        }
    }
